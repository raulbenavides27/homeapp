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
        },
       
         {
          path: 'ayuda',
          loadChildren: () => import('../ayuda/ayuda.module').then( m => m.AyudaPageModule)
        }
        ,
        {
          path: 'ajuste',
          loadChildren: () => import('../ajuste/ajuste.module').then(m => m.AjustePageModule)
        },
        {
          path: 'cuentas',
          loadChildren: () => import('../cuentas/cuentas.module').then(m => m.CuentasPageModule)
        },
        {
          path: 'SoporteComponent',
          loadChildren: () => import('./backend/soporte/soporte.component').then(m => m.SoportePageModule)
        }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
