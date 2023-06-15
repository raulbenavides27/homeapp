import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Cliente } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { Subscriber } from 'rxjs';
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
  uid = '';
    
    constructor(public menucontroler: MenuController, public fb: FormBuilder,
    public firebaseauthService: FirebaseauthService,
    public alertController: AlertController,
    public firestoreService: FirestoreService,
    public firestorageService: FirestorageService){

       this.firebaseauthService.stateAuth().subscribe( res =>{
        if (res !== null){
          this.uid = res.uid;
          this.getUserInfo(this.uid);
        }else {
          this.initCliente();
        }
       })
    }

  async ngOnInit() {

   const uid = await this.firebaseauthService.getUid();
   console.log(uid);

  }
  initCliente(){
      this.uid ='';
      this.cliente = {
      uid: '',
      email: '',
      nombre: '',
      password:'',
      foto: '',
      confirmacion: '',
      ubicacion: null,
    };
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
 this.firebaseauthService.logout(); 
}
getUserInfo(uid: string){
  const path = 'Clientes';
  this.firestoreService.getDoc<Cliente>(path, uid).subscribe(res =>{
    this.cliente = res as Cliente;
  });
}
ingresar(){
  const credenciales = {
    email: this.cliente.email,
    password: this.cliente.password
  };
  this.firebaseauthService.login(credenciales.email, credenciales.password).then(res => {
    console.log('ingresado')
  });

}


}