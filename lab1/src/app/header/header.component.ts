import { Component, OnInit, Input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
} from '@ionic/angular/standalone';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle],
  standalone: true,
})
export class HeaderComponent  implements OnInit {

  @Input() name: string = 'Лабораторні роботи';
  constructor() { }

  ngOnInit() {}

}
