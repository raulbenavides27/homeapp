import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-set-propiedad',
  templateUrl: './set-propiedad.component.html',
  styleUrls: ['./set-propiedad.component.scss'],
})
export class SetPropiedadComponent  implements OnInit {

  constructor(public menucontroler: MenuController) { }

  ngOnInit() {}
openMenu(){
  console.log('open menu');
  this.menucontroler.toggle('principal');
}
}
