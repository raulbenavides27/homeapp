import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpropiedadPage } from './addpropiedad.page';

const routes: Routes = [
  {
    path: '',
    component: AddpropiedadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpropiedadPageRoutingModule {}
