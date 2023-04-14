import { Component, Directive, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Propiedad } from 'src/app/models';
@Component({
  selector: 'app-set-propiedad',
  templateUrl: './set-propiedad.component.html',
  styleUrls: ['./set-propiedad.component.scss'],
})
export class SetPropiedadComponent  implements OnInit {
  Propiedades: Propiedad [] = []
  newPropiedad: Propiedad = {
    nombre: '',
    direccion: '',
    numero: 0,
    comuna: '',
    contacto: '',
    telefono: 0,
    id:this.FirestoService.getId(),
    fecha: new Date()
  };

private path = 'Propiedad/';

  constructor(public menucontroler: MenuController,
              public FirestoService: FirestoreService) { }
              
  ngOnInit(){
    this.getPropiedad();
  }

  openMenu(){

  console.log('open menu');
  this.menucontroler.toggle('principal');
}

guardarPropiedad() 
{ 
const id = this.FirestoService.getId();
this.FirestoService.creatDoc(this.newPropiedad,this.path,this.newPropiedad.id);
}
getPropiedad(){
  this.FirestoService.getColletion(this.path).subscribe( res =>{
    this.Propiedades = res;
  });
}
}
