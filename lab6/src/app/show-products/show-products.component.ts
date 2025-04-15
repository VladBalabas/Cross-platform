import { Component, Input, OnInit } from '@angular/core';
import { Toy } from '../lab6/abstract/toy';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class ShowProductsComponent implements OnInit {
  @Input() products: Toy[] = [];
  
  categories = [
    { name: 'Board Games', type: 'boardGame', selected: false },
    { name: 'Stuffed Toys', type: 'stuffedToy', selected: false },
    { name: 'Creative Kits', type: 'creativeKit', selected: false },
    { name: 'Universal Toys', type: 'universal', selected: false },
  ];

  minPrice = 0;
  maxPrice = 1000;
  priceRange = { lower: 0, upper: 1000 };

  selectedCategories$ = new BehaviorSubject<string[]>([]);
  priceFilter$ = new BehaviorSubject<{min: number, max: number}>({ min: 0, max: 1000 });

  filteredProducts: Toy[] = [];

  constructor() {}

  ngOnInit() {
    if (this.products.length > 0) {
      this.minPrice = Math.min(...this.products.map(product => this.getProductPrice(product)));
      this.maxPrice = Math.max(...this.products.map(product => this.getProductPrice(product)));
      this.priceRange = { lower: this.minPrice, upper: this.maxPrice };
      this.priceFilter$.next({ min: this.minPrice, max: this.maxPrice });
    }

    combineLatest([this.selectedCategories$, this.priceFilter$]).subscribe(
      ([selectedCategories, priceFilter]) => {
        this.filteredProducts = this.products.filter(product => {
          const matchesCategory = selectedCategories.length === 0 || 
                                selectedCategories.includes((product as any).type);
          const price = this.getProductPrice(product);
          const matchesPrice = price >= priceFilter.min && price <= priceFilter.max;
          
          return matchesCategory && matchesPrice;
        });
      }
    );
  }

  onCategoryChange() {
    const selectedCategories = this.categories
      .filter(category => category.selected)
      .map(category => category.type);

    this.selectedCategories$.next(selectedCategories);
  }

  onPriceChange(event: any) {
    this.priceFilter$.next({
      min: event.detail.value.lower,
      max: event.detail.value.upper
    });
  }
  private getProductPrice(product: Toy): number {
    return (product as any).price || 0;
  }
}