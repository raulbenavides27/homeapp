import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cliente } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.page.html',
  styleUrls: ['./bienvenido.page.scss'],
})
export class BienvenidoPage implements OnInit {
  
  
  constructor(private route: Router,
    public firebaseauthService: FirebaseauthService,) { }

  ngOnInit() {
  }
  goToLogin() {

    this.firebaseauthService.stateAuth().subscribe( res =>{
      console.log(res);
      if (res !== null){
        this.route.navigate(['/home']);
      } else {
        this.route.navigate(['/perfil']);
      }
     })
    
}
 
}
