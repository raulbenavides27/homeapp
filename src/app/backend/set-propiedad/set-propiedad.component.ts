import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-propiedad',
  templateUrl: './set-propiedad.component.html',
  styleUrls: ['./set-propiedad.component.scss'],
})
export class SetPropiedadComponent  implements OnInit {

  constructor(public menucontroler: MenuController,
              public FirestoService: FirestoreService) { }

  ngOnInit() {}
openMenu(){
  console.log('open menu');
  this.menucontroler.toggle('principal');
}
guardarPropiedad() 
{ 
  const data = {
    nombre: 'prueba',
    direccion: 'cruz'
  };
const path ='Propiedad/';
const id = '00001';
this.FirestoService.creatDoc(data,path,id)
}
}
