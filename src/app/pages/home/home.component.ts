import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cuentas, Propiedad } from 'src/app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
 
  propiedades: Propiedad[] = [];
  cuentas :Cuentas[]= [];

  filteredProperties: Propiedad[] = [];
  searchTerm: string = '';
  selectedSegment: string = 'Propiedad';

  constructor(
    public menucontroler: MenuController,
    public firestoreService: FirestoreService,
    private router: Router
  ) {
    this.loadProductos();
  }

  ngOnInit() {}

  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

  loadProductos() {
    const path = 'Propiedad/';
    this.firestoreService.getColletion<Propiedad>(path).subscribe((res) => {
      console.log(res);
      this.propiedades = res;
      this.filteredProperties = res; // Initialize the filtered properties array
    });
  }
  loadCuentas() {
    const path = 'Cuentas/'
    this.firestoreService.getColletion<Cuentas>(path).subscribe((res) => {
      console.log(res);
      this.cuentas = res;
    });
  }
  path<T>(path: any) {
    throw new Error('Method not implemented.');
  }

  filterProperties() {
    if (this.searchTerm.trim() !== '') {
      this.filteredProperties = this.propiedades.filter((prop) => {
        const propValues = Object.values(prop).join(' ').toLowerCase();
        return propValues.includes(this.searchTerm.toLowerCase());
      });
    } else {
      this.filteredProperties = this.propiedades;
    }
  }
}
