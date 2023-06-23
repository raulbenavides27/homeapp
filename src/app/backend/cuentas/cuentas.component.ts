import { Component, Directive, OnInit, importProvidersFrom } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cuentas } from 'src/app/models';
import {FirestorageService} from 'src/app/services/firestorage.service'

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss'],
})
export class CuentasComponent implements OnInit {
  Cuentas: Cuentas[] = []
  newCuentas!: Cuentas;
  enableNewCuentas = false;
  enablelista = true;
  private path = 'Cuentas/';
  newfile = '';
  loading: any;

  constructor(public menucontroler: MenuController,
              public FirestoService: FirestoreService,
              public loadingController:LoadingController,
              public toastController:ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService) { }
              
  ngOnInit(){
    this.getCuentas();
  }
  //getCuentas() {
    //throw new Error('Method not implemented.');
  //}

  openMenu(){

  console.log('open menu');
  this.menucontroler.toggle('principal');
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

bntNuevo(){
  this.enableNewCuentas = true;
  this.enablelista = false;
  this.newCuentas = {
    tipoCuenta: '',
    valor: '',
    idCuentas:this.FirestoService.getId(),
    estado: '',
    idPropiedad: ''
  };

}
async presentLoading(){
    this.loading = await this.loadingController.create({
    cssClass: '',
    message: 'Guardando...',
  });
  await this.loading.present();
}
async presentToast(msg: string){
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}

}


