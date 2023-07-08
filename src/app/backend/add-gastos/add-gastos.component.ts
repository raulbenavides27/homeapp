import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Cuentas, Entidad, Gastos, Propiedad } from 'src/app/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-add-gastos',
  templateUrl: './add-gastos.component.html',
  styleUrls: ['./add-gastos.component.scss'],
})
export class AddGastosComponent implements OnInit {
  tipoCuenta!: string;
  Propiedades: Propiedad[] = [] //propiedades 
  cuentas: Cuentas[] = [];// cuentas 
  gastos: Gastos[] = []; // facturas 
  Empresas: Entidad[] = []; // Empresas
  tiporazon!: string;
  newGastos!: Entidad;
  private path = 'Entidad/';
  loading: any;
  P!: Propiedad;
  siEmpresa = false;
  constructor(public menucontroler: MenuController,
    public FirestoService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public activatedRoute: ActivatedRoute,
    public firestorageService: FirestorageService,
    private router: Router) {

  }

  ngOnInit() {
    this.getCuentas();
    this.getPropiedad();
    this.getGasto();
    this.getEmpresa()
  }

  getCuentas() {
    const path = 'Cuentas/';
    this.FirestoService.getColletion<Cuentas>(path).subscribe(res => { this.cuentas = res; });
    console.log('se esta obteniendo propiedad', this.cuentas)
  }
  getPropiedad() {
    const path = 'Propiedad/';
    this.FirestoService.getColletion<Propiedad>(path).subscribe(res => { this.Propiedades = res; });
    console.log('se esta obteniendo propiedad', this.Propiedades)
  }
  filtroPropiedad(id_P: string) {
    return this.Propiedades.filter(Propiedades => Propiedades.id == id_P)
  }
  getCuenta() {
    const path = 'Cuentas/';
    this.FirestoService.getColletion<Cuentas>(path).subscribe(res => {
      if (res.length) {
        this.cuentas = res;
      }
    });
  }
  getGasto() {
    const path = 'Gastos/';
    this.FirestoService.getColletion<Gastos>(path).subscribe(res => {
      if (res.length) {
        this.gastos = res;
      }
    });
  }
  handleChange(value: any) {
    return this.tiporazon = value;

  }
  getEmpresa() {
    const path = 'Entidad/';
    this.FirestoService.getColletion<Entidad>(path).subscribe(res => {
      if (res.length) {
        this.Empresas = res;
      }
    });
  }
  filtroEmpresa() {
    return this.Empresas.filter(Empresas => Empresas.tipoEntidad == 'empresa')
  }
  filtroEmpresatipo() {
    return this.Empresas.filter(Empresas => Empresas.tipoServicio == this.tipoCuenta)
    
  }
  async guardarContacto() {

    this.presentLoading();
    const path = 'Entidad/';
    const name = this.newGastos.nombre;
    this.FirestoService.creatDoc(this.newGastos, this.path, this.newGastos.id_entidad).then(res => {
      this.loading.dismiss();
      this.presentToast('Guardado con exito');
    }).catch(error => {
      this.presentToast('Error intente mas tarde');
    });
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: '',
      message: 'Guardando...',
    });
    await this.loading.present();
    this.router.navigate(['set-propiedad']);
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
