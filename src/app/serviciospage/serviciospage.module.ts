import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciospagePageRoutingModule } from './serviciospage-routing.module';

import { ServiciospagePage } from './serviciospage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciospagePageRoutingModule
  ],
  declarations: [ServiciospagePage]
})
export class ServiciospagePageModule {}
