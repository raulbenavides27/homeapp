import { Component, OnInit} from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cliente, Entidad, Propiedad } from 'src/app/models';
import {FirestorageService} from 'src/app/services/firestorage.service';
import { Router } from '@angular/router';
import { TareasService } from 'src/app/services/tareas.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-set-propiedad',
  templateUrl:'./set-propiedad.component.html',
  styleUrls: ['./set-propiedad.component.scss'],
})
export class SetPropiedadComponent  implements OnInit {
  Propiedades: Propiedad[] = []
  newPropiedad!: Propiedad;
  newContacto!: Propiedad;
  enableNewPropiedad = false;
  enableNewContacto = false;
  enablelista = true;
  btnClose = false;
 
  newImage = '';
  newfile = '';
  loading: any;
  id_seleccion: any;
  propiedad!: Propiedad;
  uid: any;
  id_P: any;
  cliente!: Cliente;
  contacto: Entidad[] = [];
  verContacto: any;
  constructor(
              public tareasService: TareasService,
              public menucontroler: MenuController,
              public FirestoService: FirestoreService,
              public loadingController:LoadingController,
              public toastController:ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService,
              public firebaseauthService: FirebaseauthService,
              private router:Router){}   
                      
     async ngOnInit()
              {

               this.getPropiedad();
               this.getContacto();
               }
   async guardarPropiedad() 
  { 
     this.presentLoading();
     const path = 'Propiedad';
     const name = this.newPropiedad.id_propiedad;
     if (this.newfile !== undefined)
      {
      const res = await this.firestorageService.uploadImage(this.newfile,path,name);
      }
    
      this.FirestoService.creatDoc(this.newPropiedad,path,this.newPropiedad.id).then(res =>{
      this.loading.dismiss();
      this.presentToast('Guardado con exito');
      }).catch(error => {
      this.presentToast('Error intente mas tarde');
      });
  }
getPropiedad()
    {
     const path = 'Propiedad/';
     this.FirestoService.getColletion<Propiedad>(path).subscribe( res =>{this.Propiedades = res;});
      console.log('se esta obteniendo propiedad', this.Propiedades)
     }

getContacto()
    {
      const path = 'Entidad/';
      this.verContacto = this.FirestoService.getColletion<Entidad>(path).subscribe( res =>{
        if(res.length){
          this.contacto = res;
        }});
     console.log('contantos obtenidos:',this.contacto ) 
      }
filtroContacto(id_P: string){
return this.contacto.filter(contacto => contacto.id_propiedad == id_P)
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
      handler:(blah) =>{ console.log('confirm Cancel: blah');}
            },
      {
      text:'ok',
      handler:() =>{
        console.log('Confirm Okay');
        const path = 'Propiedad/';
        this.FirestoService.deletDoc(path,P.id).then(res =>{
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
   
    id:this.FirestoService.getId(),
    id_propiedad: '',
    direccion: '',
    numero: 0,
    comuna: '',
    referencia: '',
    contacto: '',
    telefono: 0,
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
  
goPerfil(){ 
  this.router.navigate(['perfil']);
} 

addContacto(P: Propiedad) 
{ 
    console.log('Propiedad selecionada: ', P)
    this.FirestoService.setDoc(P)
    
 
}

}

