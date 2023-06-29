import { Injectable } from '@angular/core';
import { Propiedad, Tarea } from '../models';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private tarea!: Tarea;
  path = 'tarea/';
  uid = '';
  constructor(
              public firestoreService: FirestoreService
               ) { 
    this.loadTarea();
  }
  loadTarea(){
      const path = 'Propiedad/' + this.uid + '/' + this.path + this.uid;
      this.firestoreService.getDoc(this.path,this.uid).subscribe(res =>{
        console.groupCollapsed(res);
        if(res){
            this.tarea = res as any;
        }
      })
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
