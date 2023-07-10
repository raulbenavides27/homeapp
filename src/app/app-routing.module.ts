import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SetPropiedadComponent } from './backend/set-propiedad/set-propiedad.component';
import { CuentasComponent } from './backend/cuentas/cuentas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { TareasComponent } from './pages/tareas/tareas.component';
import { ContactoComponent } from './backend/contacto/contacto.component';
import { SoporteComponent } from './backend/soporte/soporte.component';
import { AddGastosComponent } from './backend/add-gastos/add-gastos.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/bienvenido/bienvenido.module').then(m => m.BienvenidoPageModule) },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Aplicar canActivate en la ruta 'home'
  { path: 'set-propiedad', component: SetPropiedadComponent, canActivate: [AuthGuard] }, // Aplicar canActivate en la ruta 'set-propiedad'
  { path: 'SoporteComponent', component: SoporteComponent, canActivate: [AuthGuard] },
  { path: 'contacto', component: ContactoComponent, canActivate: [AuthGuard] }, // Aplicar canActivate en la ruta 'contacto'
  { path: 'gastos', component: AddGastosComponent, canActivate: [AuthGuard] }, // Aplicar canActivate en la ruta 'gastos'
  { path: 'tareas', component: TareasComponent, canActivate: [AuthGuard] }, // Aplicar canActivate en la ruta 'tareas'
  { path: 'cuentas', component: CuentasComponent, canActivate: [AuthGuard] }, // Aplicar canActivate en la ruta 'cuentas'
  { path: 'perfil', component: PerfilComponent}, // Aplicar canActivate en la ruta 'perfil'
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
