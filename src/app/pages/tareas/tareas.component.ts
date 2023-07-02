import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { publicDecrypt } from 'crypto';
import { Propiedad } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss'],
})
export class TareasComponent  implements OnInit {
 
  P!: Propiedad;
  private path = 'Propiedad/';
  propiedades: Propiedad[] = [];
  id: any;
  constructor(public menucontroler: MenuController,
    public activatedRoute: ActivatedRoute,
    public firestoreService: FirestoreService,) { 
                this.loadProductos();
              }

  ngOnInit() {
   this.id = this.activatedRoute.snapshot.paramMap.get("id")
   console.log('la id recibida es:',this.id)
   this.loadProductos()
  }
  loadProductos(){
    this.firestoreService.getColletion<Propiedad>(this.path).subscribe( res => {   
    this.propiedades = res;
    this.P = {
   
      id: this.propiedades[this.id].id,
      id_propiedad:this.propiedades[this.id].id_propiedad,
      direccion:this.propiedades[this.id].direccion,
      numero:this.propiedades[this.id].numero,
      comuna: this.propiedades[this.id].comuna,
      referencia:this.propiedades[this.id].referencia,
      contacto:this.propiedades[this.id].contacto,
      telefono: this.propiedades[this.id].telefono,
      fecha: this.propiedades[this.id].fecha,
      tipo: this.propiedades[this.id].tipo,
      estado:this.propiedades[this.id].estado,
      condicion:this.propiedades[this.id].condicion,
      ubicacion:this.propiedades[this.id].ubicacion
  
    };
    });
  
}
}