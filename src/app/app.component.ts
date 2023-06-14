import { Component, inject } from '@angular/core';
import { FirebaseauthService } from './services/firebaseauth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private firebaseauthservice: FirebaseauthService
  ) {}
}
