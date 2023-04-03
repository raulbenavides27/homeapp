import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addpropiedad',
  templateUrl: './addpropiedad.page.html',
  styleUrls: ['./addpropiedad.page.scss'],
})
export class AddpropiedadPage implements OnInit {

  formularioHogar: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrol: NavController) {

    this.formularioHogar = this.fb.group({
      'nombre_hogar': new FormControl("", Validators.required),
      'direccion_hogar': new FormControl("", Validators.required),
      'num_hogar': new FormControl("", Validators.required),
      'comuna_hogar': new FormControl("", Validators.required),
      'contacto_hogar': new FormControl("", Validators.required),
      'telefono_hogar': new FormControl("", Validators.required)
      
    });
  }

  ngOnInit() {
  }

  async guardar() {
    var f = this.formularioHogar.value;

    if (this.formularioHogar.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    var Propiedad = {
      nombre_hogar: f.nombre_hogar,
      direccion_hogar: f.direccion_hogar,
      num_hogar: f.num_hogar,
      comuna_hogar: f.comuna_hogar,
      contacto_hogar: f.contacto_hogar,
      telefono_hogar: f.telefono_hogar
     
    }



    const alert = await this.alertController.create({
      header: 'Propiedad agregada',
      message: 'Registro exitoso',
      buttons: ['Aceptar']
    });
    localStorage.setItem('Propiedad', JSON.stringify(Propiedad));
    this.navCtrol.navigateRoot('menu/bienvenida');
    this.navCtrol.navigateRoot('login');
    await alert.present();
    return;
  }
}
