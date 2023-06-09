import { Component, Directive, OnInit, importProvidersFrom } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cuentas, Entidad, Propiedad } from 'src/app/models';
import {FirestorageService} from 'src/app/services/firestorage.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss'],
})
export class CuentasComponent implements OnInit {
  tipoCuenta!: string;
  Cuentas: Cuentas[] = []
  newCuentas!: Cuentas;
  enableNewCuentas = false;
  enablelista = true;
  private path = 'Cuentas/';
  newfile = '';
  loading: any;
  newContacto!: Cuentas;
  P!: Propiedad;
  Empresas: Entidad[] = []; // Empresas

  constructor(public menucontroler: MenuController,
              public FirestoService: FirestoreService,
              public loadingController:LoadingController,
              public toastController:ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService,
              private router:Router) { }
              
  ngOnInit(){
     this.tipoCuenta
     this.handleChange(this.tipoCuenta)
     this.getEmpresa()
     this.filtroEmpresa();
    const propiedad = this.FirestoService.getProp()
    console.log('la propiedad es la:', propiedad)
    if (propiedad !== undefined){
      this.P = propiedad
    }else{
      this.router.navigate(['set-propiedad']);
    }
    this.newCuentas = {
  
      idCuentas:this.FirestoService.getId(),
      id_propiedad: propiedad.id, 
      tipoCuenta: '',
      empresa: '',
      numCliente: ''
    };
  }


async guardarCuentas() 
{ 
this.presentLoading();
const path = 'Cuentas';
const name = this.newCuentas.tipoCuenta;
this.FirestoService.creatDoc(this.newCuentas,this.path,this.newCuentas.idCuentas).then(res =>{
this.loading.dismiss();
this.presentToast('Guardado con exito');
}).catch(error => {
this.presentToast('Error intente mas tarde');
});
}
getCuentas(){
  this.FirestoService.getColletion<Cuentas>(this.path).subscribe( res =>{
    this.Cuentas = res;
    console.log(res);
  }, (error) => { 
    console.log(error);
    });
}
handleChange(value: any) {
  return this.tipoCuenta = value;
}
getEmpresa() {
  const path = 'Entidad/';
  this.FirestoService.getColletion<Entidad>(path).subscribe(res => {
    if (res.length) {
      this.Empresas = res;
      console.log('entidades llamadas', this.Empresas)
    }
  });
}
filtroEmpresa() {
  return this.Empresas.filter(Empresas => Empresas.tipoEntidad == 'empresa' )
  
}
filtroEmpresatipo() {
  return this.Empresas.filter(Empresas => Empresas.tipoServicio == this.tipoCuenta)
  
}

async deleteCuentas(P: Cuentas){
  const alert = await this.alertController.create({
    cssClass: '',
    header: 'Advertencia',
    message: '¿Seguro desea <strong>eliminar</strong> esta Cuentas?',
    buttons:[{
      text: 'Cancelar',
      role: 'Cancel',
      cssClass: '',
      handler:(blah) =>{
        console.log('confirm Cancel: blah');
      }
    },{
      text:'ok',
      handler:() =>{
        console.log('Confirm Okay');
        this.FirestoService.deletDoc(this.path,P.idCuentas).then(res =>{
          this.presentToast('Eliminado con exito');
          this.alertController.dismiss(); 
          }).catch(error => {
          this.presentToast('Error intente mas tarde');
          });
      }
    }
  ]
  });
await alert.present();
}
async presentLoading(){
    this.loading = await this.loadingController.create({
    cssClass: '',
    message: 'Guardando...',
  });
  await this.loading.present();
  this.router.navigate(['set-propiedad']);
}
async presentToast(msg: string){
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}

}