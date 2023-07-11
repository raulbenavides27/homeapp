import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cliente, Cuentas, Entidad, Gastos, Propiedad } from 'src/app/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-set-propiedad',
  templateUrl: './set-propiedad.component.html',
  styleUrls: ['./set-propiedad.component.scss'],
})
export class SetPropiedadComponent implements OnInit {
  Propiedades: Propiedad[] = [] //propiedades 
  contacto: Entidad[] = []; // contactos 
  cuentas: Cuentas[] = []; // cuentas 
  gastos: Gastos[] = []; // facturas 
  newPropiedad!: Propiedad;
  newContacto!: Propiedad;
  enableNewPropiedad = false;
  enableNewContacto = false;
  enablelista = true;
  btnClose = false;
  newfile = '';
  loading: any;
  id_seleccion: any;
  propiedad!: Propiedad;
  uid: any;
  id_P: any;
  cliente!: Cliente;
  laFechaHoy!: Date;
  ZonaPropiedad = true;

  
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
    this.getContacto();
    this.getCuenta();
    this.getGasto();
 
  }
  async guardarPropiedad() {
    this.presentLoading();
    const path = 'Propiedad';
    const name = this.newPropiedad.id_propiedad;
    if (this.newfile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newfile, path, name);
    }
    this.FirestoService.creatDoc(this.newPropiedad, path, this.newPropiedad.id).then(res => {
      this.loading.dismiss();
      this.presentToast('Guardado con exito');
    }).catch(error => {
      this.presentToast('Error intente mas tarde');
    });
  }
  getPropiedad() {
    const path = 'Propiedad/';
    this.FirestoService.getColletion<Propiedad>(path).subscribe(res => { this.Propiedades = res; });
    console.log('se esta obteniendo propiedad', this.Propiedades)
  }
  getContacto() {
    const path = 'Entidad/';
    this.FirestoService.getColletion<Entidad>(path).subscribe(res => {
      if (res.length) {
        this.contacto = res;
      }
    });

  }
  // filtrando cuenta por propiedad 
  filtroContacto(id_P: string) {
    return this.contacto.filter(contacto => contacto.id_propiedad == id_P)
  }
  // detalles para cuenta 
  getCuenta() {
    const path = 'Cuentas/';
    this.FirestoService.getColletion<Cuentas>(path).subscribe(res => {
      if (res.length) {
        this.cuentas = res;
      }
    });
  }
  filtroCuentaAgua(id_P: string) {
    return this.cuentas.filter(cuentas => cuentas.id_propiedad == id_P && cuentas.tipoCuenta == 'Agua')
  }
  filtroCuentaLuz(id_P: string) {
    return this.cuentas.filter(cuentas => cuentas.id_propiedad == id_P && cuentas.tipoCuenta == 'Luz')
  }
  filtroCuentaGas(id_P: string) {
    return this.cuentas.filter(cuentas => cuentas.id_propiedad == id_P && cuentas.tipoCuenta == 'Gas')
  }
  filtroCuentaInternet(id_P: string) {
    return this.cuentas.filter(cuentas => cuentas.id_propiedad == id_P && cuentas.tipoCuenta == 'Internet-cable')
  }
  filtroCuentaArriendo(id_P: string) {
    return this.cuentas.filter(cuentas => cuentas.id_propiedad == id_P && cuentas.tipoCuenta == 'Arriendo')
  }
  filtroCuentaGGCC(id_P: string) {
    return this.cuentas.filter(cuentas => cuentas.id_propiedad == id_P && cuentas.tipoCuenta == 'Gastos Comunes')
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
    return this.gastos.filter(gastos => gastos.Numero_cliente == N_Cliente && gastos.Estado !=='Pagada' && gastos.Nombre_emisor == nomEmpCuentas  )
  }
  cambiarEstado(id_P: string, estado: string) {
    
    console.log('estado selecion:', 'cambiarEstado()')
    const path = 'Propiedad/'
    const updateDoc = { estado }
    const id = id_P;
    this.FirestoService.updateDoc(updateDoc, path, id).then(() => {
      console.log('estado cambiado')
    })
 
  
  }

  // eliminar propiedad 
  async deletePropiedad(P: Propiedad) {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Advertencia',
      message: '¿Seguro desea <strong>eliminar</strong> esta propiedad?',
      inputs: [
      {
        name: 'cambio',
        type: 'radio',
        label: 'cambio de arrendatario',
        value: 'cambio de arrendatario'
      },
      {
        name: 'impago',
        type: 'radio',
        label: 'Cuentas impagas',
        value: 'Cuentas impagas'
      },
      {
        name: 'fin',
        type: 'radio',
        label: 'Finalizacion de contrato',
        value: 'Finalizacion de contrato'
      },
      {
        name: 'dano',
        type: 'radio',
        label: 'Daño a la propiedad',
        value: 'Daño a la propiedad'
      },
    ],
    buttons: [{
        text: 'Cancelar',
        role: 'Cancel',
        cssClass: '',
        handler: (blah) => { console.log('confirm Cancel: blah'); }
      },
      {
      text:'ok',
      handler:() =>{
        console.log('Confirm Okay');
        const path = 'Propiedad/';
        this.FirestoService.deletDoc(path,P.id).then(res =>{
          this.presentToast('Eliminado con exito');
          this.alertController.dismiss(); 
          }).catch(error => {
            this.presentToast('Error intente mas tarde');
          });
        }
      }
      ]
    });
    await alert.present();

  }
  // btn para aggregar nueva propiedad 
  bntNuevo() {
    this.enableNewPropiedad = true;
    this.enablelista = false;
    this.btnClose = true;
    this.newPropiedad = {

      id: this.FirestoService.getId(),
      id_propiedad: '',
      direccion: '',
      numero: 0,
      comuna: '',
      referencia: '',
      contacto: '',
      telefono: 0,
      fecha: new Date(),
      tipo: '',
      estado: 'Activa',
      condicion: '',
      ubicacion: '',

    };



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
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newfile = event.target.files[0];
    }
  }
  go() {
    this.router.navigate(['cuentas']);
  }

  goPerfil() {
    this.router.navigate(['perfil']);
  }

  addContacto(P: Propiedad) {
    console.log('Propiedad selecionada: ', P)
    this.FirestoService.setDoc(P)


  }

}

