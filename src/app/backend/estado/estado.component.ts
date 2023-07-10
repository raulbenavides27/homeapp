import { Component, Directive, OnInit, importProvidersFrom } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Estado } from 'src/app/models';
import {FirestorageService} from 'src/app/services/firestorage.service'

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss'],
})
export class EstadoComponent  implements OnInit {
  Estado: Estado[] = []
  newEstado!: Estado;
  enableNewEstado = false;
  enablelista = true;
  private path = 'Estado/';
  newfile = '';
  loading: any;

  constructor(public menucontroler: MenuController,
              public FirestoService: FirestoreService,
              public loadingController:LoadingController,
              public toastController:ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService) { }
              
  ngOnInit(){
    this.getEstado();
  }
  //getEstado() {
    //throw new Error('Method not implemented.');
  //}

  openMenu(){

  console.log('open menu');
  this.menucontroler.toggle('principal');
}

async guardarEstado() 
{ 
this.presentLoading();
const path = 'Estado';
const name = this.newEstado.idEstado;
this.FirestoService.creatDoc(this.newEstado,this.path,this.newEstado.idEstado).then(res =>{
this.loading.dismiss();
this.presentToast('Guardado con exito');
}).catch(error => {
this.presentToast('Error intente mas tarde');
});
}
getEstado(){
  this.FirestoService.getColletion<Estado>(this.path).subscribe( res =>{
    this.Estado = res;
    console.log(res);
  }, (error) => { 
    console.log(error);
    });
}
async deleteEstado(P: Estado){
  const alert = await this.alertController.create({
    cssClass: '',
    header: 'Advertencia',
    message: '¿Seguro desea <strong>eliminar</strong> esta Estado?',
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
        this.FirestoService.deletDoc(this.path,P.idEstado).then(res =>{
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
  this.enableNewEstado = true;
  this.enablelista = false;
  this.newEstado = {
    id: this.FirestoService.getId(),
    idEstado:'',
    ventanas: '',
    paredes: '',
    suelo: '',
    muebles: '',
    wc: '',
    cocina: ''
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


