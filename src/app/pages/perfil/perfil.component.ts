import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Cliente } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
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
    referencia: '',
    ubicacion: null,

  };
  newfile: any; 
  formularioRegistro: FormGroup;
    
    constructor(public menucontroler: MenuController, public fb: FormBuilder,
    public firebaseauthService: FirebaseauthService,
    public alertController: AlertController,
    public navCtrol:NavController) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'mail': new FormControl("", Validators.required),  
      'pass': new FormControl("", Validators.required),
      'confirmacion': new FormControl("", Validators.required),
      'telefono': new FormControl("")
    });
  }

  ngOnInit() {}
  openMenu(){

    console.log('open menu');
    this.menucontroler.toggle('principal');
  }
  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }
}
async newImageUpload(event:any){ 
  if (event.target.files && event.target.files[0]){ 
     this.newfile = event.target.files[0]; 
     const reader = new FileReader();
     reader.onload = ((image: any)=>{    
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
const res = await this.firebaseauthService.registrar(credenciales.email,credenciales.password);
console.log(res);

}
salir(){
  this.firebaseauthService.logout(); 
}
}


