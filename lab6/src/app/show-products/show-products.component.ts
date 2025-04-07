import { Component, Input, OnInit } from '@angular/core';
import { Toy } from '../lab6/abstract/toy';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true,
})
export class ShowProductsComponent  implements OnInit {
  @Input() products: Toy[] = [];

  constructor() {}

  ngOnInit() {
  }

}
