import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';
import { HomeComponent } from './pages/home/home.component';
import { SetPropiedadComponent } from './backend/set-propiedad/set-propiedad.component';
import { CuentasComponent } from './backend/cuentas/cuentas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent},
  { path: 'set-propiedad',component: SetPropiedadComponent},
  { path: 'cuentas',component: CuentasComponent},
  { path: 'perfil',component: PerfilComponent},
  { path: '',component: HomeComponent},
  { path: '**',redirectTo: 'home', pathMatch: 'full'},  
   //{
    //path: 'cuentas',
    //loadChildren: () => import('./backend/cuentas/cuentas.module').then( m => m.CuentasPageModule)
  //},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
