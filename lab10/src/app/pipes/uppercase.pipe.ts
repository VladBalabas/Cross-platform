import { Pipe, PipeTransform } from '@angular/core';
import { Toy } from '../lab6/abstract/toy';

@Pipe({
  name: 'uppercaseAndPrice'
})
export class UppercaseAndPricePipe implements PipeTransform {
  transform(value: Toy): string {
    return `${value.getName().toUpperCase()} - $${value.getPrice()}`;
  }
}
