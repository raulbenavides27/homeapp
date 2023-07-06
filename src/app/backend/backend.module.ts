import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetPropiedadComponent } from './set-propiedad/set-propiedad.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CuentasComponent } from './cuentas/cuentas.component';
import { EstadoComponent } from './estado/estado.component';
import { SoporteComponent } from './soporte/soporte.component';
@NgModule({
  declarations: [
    SetPropiedadComponent,
    CuentasComponent,
    EstadoComponent,
    SoporteComponent,
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
   
    
  ]
})
export class BackendModule { }
