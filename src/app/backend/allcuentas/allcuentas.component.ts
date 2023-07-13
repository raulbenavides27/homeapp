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
  newfile = '';
  loading: any;
  id_seleccion: any;
  propiedad!: Propiedad;
  uid: any;
  id_P: any;
  cliente!: Cliente;
  laFechaHoy!: Date;
  ZonaPropiedad = true;

  filteredcuentas: Cuentas[] = [];
  searchTerm: string = '';
  selectedSegment: string = 'Cuentas';

  
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
  filtroGasto(N_Cliente: string, nomEmpCuentas:string) {
    return this.gastos.filter(gastos => gastos.Numero_cliente == N_Cliente && gastos.Nombre_emisor == nomEmpCuentas  )
  }
  goPerfil() {
    this.router.navigate(['perfil']);
  }

  filterProperties() {
    if (this.searchTerm.trim() !== '') {
      this.filteredcuentas = this.cuentas.filter((prop) => {
        const propValues = Object.values(prop).join(' ').toLowerCase();
        return propValues.includes(this.searchTerm.toLowerCase());
      });
    } else {
      this.filteredcuentas = this.cuentas;
    }
  }

}
