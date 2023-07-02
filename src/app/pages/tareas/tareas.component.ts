import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
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
  id: any;
  private path = 'Propiedad/';
  propiedad: Propiedad[] = [];
  constructor(public menucontroler: MenuController,
    public activatedRoute: ActivatedRoute,
    public firestoreService: FirestoreService,
    public routerLink: RouterLink,
    private router:Router) { 
                this.loadProductos();
              }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")
  }
  openMenu(){
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }
  loadProductos(){
    this.firestoreService.getColletion<Propiedad>(this.path).subscribe( res => {
    console.log(res);
    this.propiedad = res;
    });
}
}