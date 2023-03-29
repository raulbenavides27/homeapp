import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [{
        path: 'bienvenida',
        loadChildren: () => import('../bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
        },
        {
          path: 'addpropiedad',
          loadChildren: () => import('../addpropiedad/addpropiedad.module').then( m => m.AddpropiedadPageModule),
        }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
