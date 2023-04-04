import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router'

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  public hogar = 
  [
    {
      id: '1',
      Nombre:'casa1',
      Direccion:'lejos',
      numero:'123',
      contacto: 'raul',
      telefono:'4235235425'
    },
    {
      id: '2',
      Nombre:'casa2',
      Direccion:'serca',
      numero:'321',
      contacto: 'raul',
      telefono:'4235235425'
    },
    {
      id: '3',
      Nombre:'casa1',
      Direccion:'lejos',
      numero:'123',
      contacto: 'raul',
      telefono:'4235235425'
    }
  ]
  constructor(){
}

ngOnInit(){
  }
}