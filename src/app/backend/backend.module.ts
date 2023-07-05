import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetPropiedadComponent } from './set-propiedad/set-propiedad.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, } from '@angular/forms';
import { CuentasComponent } from './cuentas/cuentas.component';
import {ContactoComponent} from './contacto/contacto.component';
import { EstadoComponent } from './estado/estado.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SetPropiedadComponent,
    CuentasComponent,
    EstadoComponent,
    ContactoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
    
  ]
})
export class BackendModule { }
