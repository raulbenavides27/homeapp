import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cliente, Cuentas, Entidad, Estado, Gastos, Propiedad } from 'src/app/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss'],
})
export class EstadoComponent  implements OnInit {
  Propiedades: Propiedad[] = [] //propiedades 
  contacto: Entidad[] = []; // contactos 
  cuentas: Cuentas[] = []; // cuentas 
  estados: Estado[] = []; // facturas 
  newEstado!: Estado;
  newContacto!: Propiedad;
  enableNewEstado = false;
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
    this.getEstado();
 
  }
  async guardarEstado() {
    this.presentLoading();
    const path = 'Estado';
    const name = this.newEstado.id;
    if (this.newfile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newfile, path, name);
    }
    this.FirestoService.creatDoc(this.newEstado, path, this.newEstado.id).then(res => {
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
  getEstado() {
    const path = 'Estado/';
    this.FirestoService.getColletion<Estado>(path).subscribe(res => { this.estados = res; });
    console.log('estados', this.estados)
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


  cambiarEstado(id_P: string, estado: string) {
    
    console.log('estado selecion:', 'cambiarEstado()')
    const path = 'Propiedad/'
    const updateDoc = { estado }
    const id = id_P;
    this.FirestoService.updateDoc(updateDoc, path, id).then(() => {
      console.log('estado cambiado')
    })
 
  
  }

  // eliminar  
  async deleteEstado(P: Estado) {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Advertencia',
      message: '¿Seguro desea <strong>eliminar</strong> este registro?',
 
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
    this.enableNewEstado = true;
    this.enablelista = false;
    this.btnClose = true;
    this.newEstado = {

      id: this.FirestoService.getId(),
      id_propiedad: '',
      fecha: new Date(),
      puertas:'',
      piso: '',
      paredes: '',
      ventanas: '',
      muebles: '',
      cocina: '',
      foto: '',
      bano: '',
      dormitorios:'',
      sala: '',
      cielo: '',
      enchufes:'',
      grifos:'',
      observacion: '',

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


