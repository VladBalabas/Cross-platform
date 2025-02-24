import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonMenu,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonMenuToggle, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonItem, 
    IonList,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonMenuToggle,
  ],
  standalone: true,
})
export class AppComponent {
  constructor() {}
}
