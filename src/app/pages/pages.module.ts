import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent 
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    
  ]
})
export class PagesModule { }
