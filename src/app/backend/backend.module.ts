import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetPropiedadComponent } from './set-propiedad/set-propiedad.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, } from '@angular/forms';
import { CuentasComponent } from './cuentas/cuentas.component';

@NgModule({
  declarations: [
    SetPropiedadComponent,
    CuentasComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
   
    
  ]
})
export class BackendModule { }
