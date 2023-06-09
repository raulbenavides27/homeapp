import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetPropiedadComponent } from './set-propiedad/set-propiedad.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CuentasComponent } from './cuentas/cuentas.component';
import {ContactoComponent} from './contacto/contacto.component';
import { EstadoComponent } from './estado/estado.component';
import { SoporteComponent } from './soporte/soporte.component';
import { RouterModule } from '@angular/router';
import { AddGastosComponent } from './add-gastos/add-gastos.component';
import { AllcuentasComponent } from './allcuentas/allcuentas.component';

@NgModule({
  declarations: [
    SetPropiedadComponent,
    CuentasComponent,
    EstadoComponent,
    SoporteComponent,
    ContactoComponent,
    AddGastosComponent,
    AllcuentasComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
    
  ]
})
export class BackendModule { }
