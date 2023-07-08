import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SetPropiedadComponent } from './backend/set-propiedad/set-propiedad.component';
import { CuentasComponent } from './backend/cuentas/cuentas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { TareasComponent } from './pages/tareas/tareas.component';
import { ContactoComponent } from './backend/contacto/contacto.component';
import { SoporteComponent} from './backend/soporte/soporte.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/bienvenido/bienvenido.module').then(m => m.BienvenidoPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'home', component: HomeComponent },
  { path: 'set-propiedad', component: SetPropiedadComponent, canActivate: [AuthGuard] },
  { path: 'contacto', component: ContactoComponent, canActivate: [AuthGuard] },
  { path: 'tareas', component: TareasComponent, canActivate: [AuthGuard] },
  { path: 'cuentas', component: CuentasComponent, canActivate: [AuthGuard] },
  { path: 'soporte', component: SoporteComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
