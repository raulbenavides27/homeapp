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
  cliente!: Cliente;
  Propiedad!: Propiedad ;
  propiedad!: Propiedad;
  constructor(public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              public router: Router,) {
 }


//buscar propiedad para recapturar sus datos   
  addPropiedad(propiedad: Propiedad){
  console.log('propiedad selecionada:',this.propiedad)
  }
 
 
}


