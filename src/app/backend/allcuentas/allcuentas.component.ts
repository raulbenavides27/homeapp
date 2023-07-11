import { Component, OnInit } from '@angular/core';
import { Cuentas } from 'src/app/models';

@Component({
  selector: 'app-allcuentas',
  templateUrl: './allcuentas.component.html',
  styleUrls: ['./allcuentas.component.scss'],
})
export class AllcuentasComponent  implements OnInit {
cuentas!: Cuentas;
  constructor() { }

  ngOnInit() {}

}
