import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Cliente } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {
  cliente: Cliente = {
    
    uid: '',
    email: '',
    nombre: '',
    password:'',
    foto: '',
    confirmacion: '',
    ubicacion: null,

  };
  newfile: any; 

    
    constructor(public menucontroler: MenuController, public fb: FormBuilder,
    public firebaseauthService: FirebaseauthService,
    public alertController: AlertController,
    public firestoreService: FirestoreService,
    public firestorageService: FirestorageService){

    }

  async ngOnInit() {

   const uid = await this.firebaseauthService.getUid();
   console.log(uid);

  }
  openMenu(){

    console.log('open menu');
    this.menucontroler.toggle('principal');
  }
  
async newImageUpload(event:any){ 
  if (event.target.files && event.target.files[0]){ 
     this.newfile = event.target.files[0]; 
     const reader = new FileReader();
     reader.onload = ((image:any)=>{    
        this.cliente.foto = image.target.result as string;   
       
       });
   reader.readAsDataURL(event.target.files[0]);
 }

}
async registrarse() {
const credenciales = {
  email: this.cliente.email,
  password: this.cliente.password

};
const res = await this.firebaseauthService.registrar(credenciales.email,credenciales.password).catch(
  err => {
    console.log('error ->', err)
  });
  const uid = await this.firebaseauthService.getUid();
  this.cliente.uid = uid; 
  this.guardarUser();
  console.log(uid);
}

async guardarUser(){
const path = 'Clientes';
const name = this.cliente.nombre;
if (this.newfile !== undefined){
const res = await this.firestorageService.uploadImage(this.newfile,path,name);
this.cliente.foto = res;
}
this.firestoreService.creatDoc(this.cliente, path,this.cliente.uid).then(res =>{
console.log('guardado con exito')
}).catch(error => {
});
}
async salir() {
  // const uid = await this.firebaseauthService.getUid();
  // console.log(uid);
 this.firebaseauthService.logout(); 
}

}


