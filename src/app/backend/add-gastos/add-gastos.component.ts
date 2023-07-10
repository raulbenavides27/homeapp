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
  nomEmpresa!: string;
  tipoCuenta!: string;
  Propiedades: Propiedad[] = [] //propiedades 
  cuentas: Cuentas[] = [];// cuentas 
  gastos: Gastos[] = []; // facturas 
  Empresas: Entidad[] = []; // Empresas
  tiporazon!: string;
  private path = 'Gastos/';
  loading: any;
  P!: Propiedad;
  newGastos!: Gastos;
  rutEmp: any;
  giroEmp: any;
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
    this.btnLimpiar()  
  }
  
  async guardarGasto() 
  { 
  this.presentLoading();
  const path = 'Gastos/';
  this.FirestoService.creatDoc(this.newGastos,this.path,this.newGastos.id_documento).then(res =>{
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
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  btnLimpiar(){
    this.newGastos = {
    Estado: '',
    Nombre_emisor: '',
    Num_documento: 0,
    Numero_cliente: '',
    fecha_emision: new Date(),
    fecha_vencimiento:new Date(),
    rut_emisor: '',
    id_documento: this.FirestoService.getId(),
    neto: 0,
    iva: 0,
    Total: 0,
    giro: ''
    };
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
  getGasto() {
    const path = 'Gastos/';
    this.FirestoService.getColletion<Gastos>(path).subscribe(res => {
        this.gastos = res;
    });
  }
  getEmpresa() {
    const path = 'Entidad/';
    this.FirestoService.getColletion<Entidad>(path).subscribe(res => {
        this.Empresas = res;
    });
  }
  filtroPropiedad(id_P: string) {
    return this.Propiedades.filter(Propiedades => Propiedades.id == id_P)
  }
  handleChange(value: any) {
    return this.tipoCuenta = value;
  }
  
  filtroEmpresa() {
    return this.Empresas.filter(Empresas => Empresas.tipoEntidad === 'empresa' )
  }
  filtroEmpresatipo() {
    return this.Empresas.filter(Empresas => Empresas.tipoServicio === this.tipoCuenta)
  }

  capturaNombre(nombre: string) {
    console.log('nombre es igual ', nombre)
    return this.nomEmpresa = nombre;
   
  }
  filtroRut(){
    return this.Empresas.filter(Empresas => Empresas.nombre === this.nomEmpresa  )

  }
   
  capturaNeto(neto: number){
    return neto;
  }

}
