import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Propiedad } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  seletPropiedad!: Propiedad;

  constructor(public database: AngularFirestore) { }
  creatDoc(data:any, path:string, id:string){
   const collection= this.database.collection(path);
   return collection.doc(id).set(data);

  }// llama a uno especifico
  getDoc<tipo>(path: string, id: string){
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();

  }
  deletDoc(path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
}
  updateDoc(data: any, path: string, id: string){
  const collection = this.database.collection(path);
  return collection.doc(id).update(data);
}
getId(){
  return this.database.createId();
}
//llama a todos
getColletion<tipo>(path:string){
 const collection = this.database.collection<tipo>(path);
 return collection.valueChanges();
}

//estos 2 servicios son para capturar caundo seleciono una propiedad
setDoc(propiedad: Propiedad){
this.seletPropiedad = propiedad;
}
getProp()
{
  return this.seletPropiedad
}
 }