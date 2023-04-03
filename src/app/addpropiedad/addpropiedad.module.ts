import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddpropiedadPageRoutingModule } from './addpropiedad-routing.module';
import { AddpropiedadPage } from './addpropiedad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddpropiedadPageRoutingModule
  ],
  declarations: [AddpropiedadPage]
})
export class AddpropiedadPageModule {}
