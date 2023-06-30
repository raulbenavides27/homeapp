import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Propiedad } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss'],
})
export class TareasComponent  implements OnInit {
  private path = 'Propiedad/';
  propiedad: Propiedad[] = [];
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
    this.firestoreService.getColletion<Propiedad>(this.path).subscribe( res => {
    console.log(res);
    this.propiedad = res;
    });
}
}