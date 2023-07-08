import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SetPropiedadComponent } from './backend/set-propiedad/set-propiedad.component';
import { CuentasComponent } from './backend/cuentas/cuentas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { TareasComponent } from './pages/tareas/tareas.component';
import { ContactoComponent } from './backend/contacto/contacto.component';
<<<<<<< HEAD
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
=======
import { AddGastosComponent } from './backend/add-gastos/add-gastos.component';

const routes: Routes = [
 
  { path: '',loadChildren: () => import('./pages/bienvenido/bienvenido.module').then( m => m.BienvenidoPageModule)},
  { path: 'home',component: HomeComponent},
  { path: 'set-propiedad',component: SetPropiedadComponent},
  { path: 'contacto',component: ContactoComponent},
  { path: 'gastos',component: AddGastosComponent},
  { path: 'tareas',component: TareasComponent},
  { path: 'cuentas',component: CuentasComponent},
  { path: 'perfil',component: PerfilComponent},
  { path: '',component: HomeComponent},
  { path: '**',redirectTo: 'home', pathMatch: 'full'}, 

>>>>>>> fase_3
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
