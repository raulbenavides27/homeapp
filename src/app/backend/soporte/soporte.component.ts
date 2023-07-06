import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { Soporte } from 'src/app/models';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';

@Component({
  selector: 'soporte',
  templateUrl: '.soporte/soporte.component.html',
  styleUrls: ['./soporte.component.scss'],
})
export class SoporteComponent implements OnInit {
  Soporte: Soporte[] = []
  newSoporte!: Soporte;
  enableNewCuentas = false;
  enablelista = true;
  private path = 'Cuentas/';
  newfile = '';
  loading: any;  

  constructor(public menucontroler: MenuController,
) { }

  ngOnInit() {}

}
  openMenu(){
  console.log('open menu');
  this.menucontroler.toggle('principal');
 }

function openMenu() {
  throw new Error('Function not implemented.');
}
