import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
 private path = 'Propiedades/'

  constructor(public menucontroler: MenuController,
    public firestoreService: FirestoreService,
              private router:Router) { 

                this.loadProductos();
              }

  ngOnInit() {}

  openMenu(){

    console.log('open menu');
    this.menucontroler.toggle('principal');
  }
  loadProductos(){
    this.firestoreService.getColletion(this.path).subscribe( res => {
    console.log(res);
    });
  }

/*

  gocuentas (){ 
    this.router.navigate(['cuentas']);
  }
  goestado (){ 
    this.router.navigate(['estado']);
  }  
  
  gopropiedades (){ 
    this.router.navigate(['set-propiedad']);
  }
*/  

}
