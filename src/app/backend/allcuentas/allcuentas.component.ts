import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cliente, Cuentas, Entidad, Gastos, Propiedad } from 'src/app/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-allcuentas',
  templateUrl: './allcuentas.component.html',
  styleUrls: ['./allcuentas.component.scss'],
})
export class AllcuentasComponent  implements OnInit {
  Propiedades: Propiedad[] = [] //propiedades 
  cuentas: Cuentas[] = []; // cuentas 
  gastos: Gastos[] = []; // facturas 
  newPropiedad!: Propiedad;
  newContacto!: Propiedad;
  empresa: Entidad[] = [];
  newfile = '';
  loading: any;
  id_seleccion: any;
  propiedad!: Propiedad;
  uid: any;
  id_P: any;
  cliente!: Cliente;
  laFechaHoy!: Date;
  enableTodas = true
  enablePagadas = false
  enableVencidas = false
  enableVigentes = false
  
  constructor(
    public menucontroler: MenuController,
    public FirestoService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public firestorageService: FirestorageService,
    public firebaseauthService: FirebaseauthService,
    private router: Router) { }

  async ngOnInit() {
    this.getPropiedad();
    this.getCuenta();
    this.getGasto();
 
  }

  getPropiedad() {
    const path = 'Propiedad/';
    this.FirestoService.getColletion<Propiedad>(path).subscribe(res => { this.Propiedades = res; });
    console.log('se esta obteniendo propiedad', this.Propiedades)
  }

  // filtrando cuenta por propiedad 

  // detalles para cuenta 
  getCuenta() {
    const path = 'Cuentas/';
    this.FirestoService.getColletion<Cuentas>(path).subscribe(res => {
      if (res.length) {
        this.cuentas = res;
        console.log('las cuentas son:', this.cuentas )
      }
    });
  }
  // obtener boletas para consultar cuenta en relacion con gasto  
  getGasto() {
    const path = 'Gastos/';
    this.FirestoService.getColletion<Gastos>(path).subscribe(res => {
      if (res.length) {
        this.gastos = res;
        console.log('gasto es: ', this.gastos)
      }
    });
  }
  getEmpresa() {
    const path = 'Entidad/';
    this.FirestoService.getColletion<Entidad>(path).subscribe(res => {
      if (res.length) {
        this.empresa = res;
        console.log('gasto es: ', this.gastos)
      }
    });
  }
  filtroGastos2() {
    return this.gastos.filter(gastos =>  gastos.Estado == 'Vencida' )
  }
  filtroGasto() {
    return this.gastos.filter(gastos =>  gastos.Estado == 'Vigente' )
  }
  filtroGasto1() {
    return this.gastos.filter(gastos =>  gastos.Estado == 'Pagada' )
  }

  goPerfil() {
    this.router.navigate(['perfil']);
  }
  handleChange(estado: any) {
    if(estado == 'Todas'){
      this.enableTodas = true
      this.enablePagadas = false
      this.enableVencidas = false
      this.enableVigentes = false 
    }if(estado == 'Pagadas'){
      this.enableTodas = false
      this.enablePagadas = true
      this.enableVencidas = false
      this.enableVigentes = false 
  }if(estado == 'Vencidas'){
    this.enableTodas = false
    this.enablePagadas = false
    this.enableVencidas = true
    this.enableVigentes = false 
  }if(estado == 'Vigentes'){
    this.enableTodas = false
    this.enablePagadas = false
    this.enableVencidas = false
    this.enableVigentes = true 
  }

}
}
