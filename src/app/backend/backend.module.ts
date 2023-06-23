import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetPropiedadComponent } from './set-propiedad/set-propiedad.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, } from '@angular/forms';
<<<<<<< HEAD
=======
import { CuentasComponent } from './cuentas/cuentas.component';
import { EstadoComponent } from './estado/estado.component';
>>>>>>> origin/aye

@NgModule({
  declarations: [
    SetPropiedadComponent,
    CuentasComponent,
    EstadoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
   
    
  ]
})
export class BackendModule { }
