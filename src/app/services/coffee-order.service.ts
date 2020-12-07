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

  public getDemoAdditions(): Observable<CoffeeAddition[]> {
    const demoAdditions: CoffeeAddition[] = [
      {
        name: 'Nonfat Milk',
        id: 59898981,
        quantity: 1,
        price: .50
      },
            {
        name: '2% Milk',
        id: 59898982,
        quantity: 1,
        price: .50
      },
            {
        name: 'Whole Milk',
        id: 59898984,
        quantity: 1,
        price: .50
      }
    ];
    return of(demoAdditions);
  }

  public saveAddition(coffee: CoffeeOrder, addition: CoffeeAddition): Observable<any> {
    return of(coffee);
  }

}