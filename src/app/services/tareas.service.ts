import { Injectable } from '@angular/core';
import { Cliente, Propiedad, Tarea } from '../models';
import { FirestoreService } from './firestore.service';
import { FirebaseauthService } from './firebaseauth.service';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private tarea!: Tarea;
  path = 'tarea/';
  uid = '';
  cliente: Cliente | undefined;
  constructor(public firebaseauthService: FirebaseauthService) { 
     this.firebaseauthService.stateAuth().subscribe( res =>{
      console.log(res);
      if (res !== null){
        this.uid = res.uid;
        this.loadTarea();
      } 
     });
 }
  loadTarea(){
    /*const path = 'Propiedad/' + this.uid + '/' + this.path + this.uid;
      this.firestoreService.getDoc(this.path,this.uid).subscribe(res =>{
        console.groupCollapsed(res);
        if(res){
            this.tarea = res as any;
        */}
      })
  }
  init(){
    this.tarea ={
      id_tarea: this.uid,
      tipo_tarea: ,
      fecha: Date,
      responsable: string,
      
    }

loadCliente() {
      const path = 'Clientes';
      this.firestoreService.getDoc<Cliente>(path, this.uid).subscribe(res =>{
      this.cliente = res;
      });
    }
  }
  getTarea(){
   
  }

  addTarea(propiedad: Propiedad){

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

