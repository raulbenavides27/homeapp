import { Component, Directive, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-set-propiedad',
  templateUrl: './set-propiedad.component.html',
  styleUrls: ['./set-propiedad.component.scss'],
})
export class SetPropiedadComponent  implements OnInit {
  nombre!: string;
  direccion!: string;

  constructor(public menucontroler: MenuController,
              public FirestoService: FirestoreService) {
               }
              
  ngOnInit(){}
  openMenu(){
  console.log('open menu');
  this.menucontroler.toggle('principal');
}
guardarPropiedad() 
{ 
const data=
 {
  nombre: this.nombre,
  direccion:  this.direccion
};
const path ='Propiedad/';
const id = '00002';
this.FirestoService.creatDoc(data,path,id);
}
}
