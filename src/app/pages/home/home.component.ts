import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor(public menucontroler: MenuController,
              private router:Router) { }

  ngOnInit() {}

  openMenu(){

    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

  gocuentas (){ 
    this.router.navigate(['cuentas']);
  }
  goestado (){ 
    this.router.navigate(['estado']);
  }  
  
  gopropiedades (){ 
    this.router.navigate(['set-propiedad']);
  }
  

}
