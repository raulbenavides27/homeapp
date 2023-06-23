import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciospagePage } from './serviciospage.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciospagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciospagePageRoutingModule {}
