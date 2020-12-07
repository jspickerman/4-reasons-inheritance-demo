import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CoffeeAddition, CoffeeProducts, DairyAddition } from '../models/coffee-addition';
import { CoffeeOrder } from '../models/coffee-order';

@Injectable()
export class CoffeeOrderService {
  private defaultOrder: CoffeeOrder = {
    size: 'Large',
    roast: 'medium',
    product: CoffeeProducts.LATTE,
    additions: [],
    total: 3.40
  }; 
  private order: BehaviorSubject<CoffeeOrder>;
  public order$: Observable<CoffeeOrder>

  constructor() { 
    this.order = new BehaviorSubject(this.defaultOrder);
    this.order$ = this.order.asObservable() as Observable<CoffeeOrder>;
  }

  public getDemoAdditions(): Observable<CoffeeAddition[]> {
    const demoAdditions: CoffeeAddition[] = [
      {
        name: 'Sugar',
        id: 59898981,
        quantity: 0,
        price: .25
      },
            {
        name: 'Raw Sugar',
        id: 59898982,
        quantity: 1,
        price: .50
      },
            {
        name: 'Vanilla Powder',
        id: 59898984,
        quantity: 1,
        price: .50
      }
    ];
    return of(demoAdditions);
  }

  public getDemoDairyAdditions(): Observable<DairyAddition[]> {
    const demoAdditions: DairyAddition[] = [
      {
        name: 'Nonfat Milk',
        id: 59898981,
        quantity: 1,
        price: .50,
        steamed: false,
        temperature: 155
      },
            {
        name: '2% Milk',
        id: 59898982,
        quantity: 1,
        price: .50,
        steamed: false,
        temperature: 155
      },
            {
        name: 'Whole Milk',
        id: 59898984,
        quantity: 1,
        price: .50,
        steamed: false,
        temperature: 155
      }
    ];
    return of(demoAdditions);
  }

  public addAddition(order: CoffeeOrder, addition: CoffeeAddition): void {
    const additions = [...order.additions, addition];
    const total = order.total + addition.price;
    this.order.next({...order, additions, total});
  }

  public removeAddition(order: CoffeeOrder, addition: CoffeeAddition): void {
    const additions = order.additions.filter(currentAddition => currentAddition.id !== addition.id);
    const total = order.total - addition.price;
    this.order.next({...order, additions, total});
  }
}