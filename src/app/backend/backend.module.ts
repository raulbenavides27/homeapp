import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetPropiedadComponent } from './set-propiedad/set-propiedad.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, } from '@angular/forms';


@NgModule({
  declarations: [
    SetPropiedadComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
   
    
  ]
})
export class BackendModule { }
