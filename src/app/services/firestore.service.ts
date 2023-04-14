import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore) { }
  creatDoc(data:any, path:string, id:string){
   const collection= this.database.collection(path);
   return collection.doc(id).set(data);

  }
  getDoc(path: string, id: string){
    const collection = this.database.collection(path);
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
getColletion<tipo>(path:string){
 const collection = this.database.collection<tipo>(path);
 return collection.valueChanges();
}
}
