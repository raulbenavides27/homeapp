import { Component, Directive, OnInit, importProvidersFrom } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Propiedad } from 'src/app/models';
import {FirestorageService} from 'src/app/services/firestorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-propiedad',
  templateUrl:'./set-propiedad.component.html',
  styleUrls: ['./set-propiedad.component.scss'],
})
export class SetPropiedadComponent  implements OnInit {
  Propiedades: Propiedad[] = []
  newPropiedad!: Propiedad;
  enableNewPropiedad = false;
  enablelista = true;
  btnClose = false;
  private path = 'Propiedad/';
  newImage = '';
  newfile = '';
  loading: any;

  constructor(public menucontroler: MenuController,
              public FirestoService: FirestoreService,
              public loadingController:LoadingController,
              public toastController:ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService,
              private router:Router) { }
              
  ngOnInit(){
    this.getPropiedad();
  }
  
  openMenu(){

  console.log('open menu');
  this.menucontroler.toggle('principal');
}

async guardarPropiedad() 
{ 
this.presentLoading();
const path = 'Propiedad';
const name = this.newPropiedad.referencia;
if (this.newfile !== undefined){
const res = await this.firestorageService.uploadImage(this.newfile,path,name);

}
this.FirestoService.creatDoc(this.newPropiedad,this.path,this.newPropiedad.id).then(res =>{
this.loading.dismiss();
this.presentToast('Guardado con exito');
}).catch(error => {
this.presentToast('Error intente mas tarde');
});
}
getPropiedad(){
  this.FirestoService.getColletion<Propiedad>(this.path).subscribe( res =>{
    this.Propiedades = res;
  });
}
async deletePropiedad(P: Propiedad){
  const alert = await this.alertController.create({
    cssClass: '',
    header: 'Advertencia',
    message: '¿Seguro desea <strong>eliminar</strong> esta propiedad?',
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
        this.FirestoService.deletDoc(this.path,P.id).then(res =>{
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
  this.enableNewPropiedad = true;
  this.enablelista = false;
  this.btnClose = true;
  this.newPropiedad = {
    
    direccion: '',
    numero: 0,
    comuna: '',
    referencia: '',
    contacto: '',
    telefono: 0,
    id:this.FirestoService.getId(),
    fecha: new Date(),
    tipo: '',
    estado:'',
    condicion:'',
    ubicacion:'',

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
async newImageUpload(event:any){ 
   if (event.target.files && event.target.files[0]){ 
      this.newfile = event.target.files[0]; 
  }

}

go (){ 
  this.router.navigate(['cuentas']);
}

goto (){ 
  this.router.navigate(['estado']);
}  
  
}
