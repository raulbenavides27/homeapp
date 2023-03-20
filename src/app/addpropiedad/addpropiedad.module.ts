import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpropiedadPageRoutingModule } from './addpropiedad-routing.module';

import { AddpropiedadPage } from './addpropiedad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddpropiedadPageRoutingModule
  ],
  declarations: [AddpropiedadPage]
})
export class AddpropiedadPageModule {}
