import { Injectable } from '@angular/core';
import { Cliente, Propiedad, Tarea } from '../models';
import { FirestoreService } from './firestore.service';
import { FirebaseauthService } from './firebaseauth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private tarea!: Tarea;
  path = 'tarea/';
  uid = '';
  cliente: Cliente | undefined;
  Propiedad: Propiedad | undefined;
  constructor(public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              public router: Router,) { 
     this.firebaseauthService.stateAuth().subscribe( res =>{
      console.log(res);
      if (res !== null){
        this.uid = res.uid;
        this.loadCliente();
        this.loadTarea();
      } 
     });
 }
  loadTarea(){
    const path = 'cliente/' + this.uid + '/' + this.path + this.uid;
      this.firestoreService.getDoc<Tarea>(this.path,this.uid).subscribe(res =>{
        console.groupCollapsed(res);
        if(res){
            this.tarea = res;
        }else{
          this.initTarea();
        }
      });
    }
  initTarea(){
    this.tarea ={
      id_tarea: this.uid,
      tipo_tarea: '',
      fecha: new Date(),
      responsable: this.cliente as any,
      propiedad: this.Propiedad as any ,
    }}
//buscar datos cliene usuario registrado
loadCliente() {
      const path = 'Cliente';
      this.firestoreService.getDoc<Cliente>(path, this.uid).subscribe(res =>{
      this.cliente = res;
      this.loadTarea();
      });
    }
//buscar propiedad para recapturar sus datos 
loadPropiedad() {
      const path = 'Propiedad/';
      this.firestoreService.getDoc<Propiedad>(path, this.uid).subscribe(res =>{
      this.Propiedad = res;
      this.loadTarea();
      });
    }    
  getTarea(){
   
  }

  addPropiedad(propiedad: Propiedad){
  if (this.uid.length){

  } else{
     this.router.navigate(['/perfil']);
  }
  }
  removePropiedad(propiedad: Propiedad){
    
  }
  guardarTarea(){

  }
  clearTarea(){

  }
}
function loadCliente() {
  throw new Error('Function not implemented.');
}

