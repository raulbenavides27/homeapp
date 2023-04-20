import { Component, Directive, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Propiedad } from 'src/app/models';
@Component({
  selector: 'app-set-propiedad',
  templateUrl: './set-propiedad.component.html',
  styleUrls: ['./set-propiedad.component.scss'],
})
export class SetPropiedadComponent  implements OnInit {
  Propiedades: Propiedad[] = []
  newPropiedad!: Propiedad;
  enableNewPropiedad = false;

private path = 'Propiedad/';
loading: any;

  constructor(public menucontroler: MenuController,
              public FirestoService: FirestoreService,
              public loadingController:LoadingController,
              public toastController:ToastController,
              public alertController: AlertController) { }
              
  ngOnInit(){
    this.getPropiedad();
  }

  openMenu(){

  console.log('open menu');
  this.menucontroler.toggle('principal');
}

guardarPropiedad() 
{ 
//const id = this.FirestoService.getId();
this.presentLoading();
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
    message: 'Seguro desea <strong>eliminar</strong> esta propiedad',
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
  this.newPropiedad = {
    nombre: '',
    direccion: '',
    numero: 0,
    comuna: '',
    contacto: '',
    telefono: 0,
    id:this.FirestoService.getId(),
    fecha: new Date(),
    tipo: '',
    //foto: ''
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
