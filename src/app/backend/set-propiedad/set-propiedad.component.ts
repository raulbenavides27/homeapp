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
})
}
getPropiedad(){
  this.FirestoService.getColletion<Propiedad>(this.path).subscribe( res =>{
    this.Propiedades = res;
  });
}
async deletePropiedad(P: Propiedad){
  this.FirestoService.deletDoc(this.path,P.id)
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
    fecha: new Date()
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
