import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CoffeeAddition, CoffeeProducts } from '../models/coffee-addition';
import { CoffeeOrder } from '../models/coffee-order';

@Injectable()
export class CoffeeOrderService {

  constructor() { }

  public getDemoCoffeeOrder(): Observable<CoffeeOrder> {
    const demoOrder: CoffeeOrder = {
      size: 'Large',
      roast: 'medium',
      product: CoffeeProducts.LATTE,
      additions: [],
      total: 3.40
    }
    return of(demoOrder);
  }

  public saveAddition(coffee: CoffeeOrder, addition: CoffeeAddition): Observable<any> {
    return of(coffee);
  }

}