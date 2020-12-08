import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CoffeeAddition, CoffeeAdditionOption,  CoffeeProducts, DairyAddition } from '../models/coffee-addition';
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
    const demoAdditions: CoffeeAddition[] = [{
        name: 'Sugar',
        id: 59898981,
        selectedOption: null,
        options: [{
          name: 'White Sugar',
          price: .25
        },
        {
          name: 'Raw Sugar',
          price: .50
        },
        {
          name: 'Brown Sugar',
          price: .50
        }
      ]
    }];
    return of(demoAdditions);
  }

  public getDemoDairyAdditions(): Observable<DairyAddition[]> {
    const demoAdditions: DairyAddition[] = [{
        name: 'Sugar',
        id: 59898981,
        steamed: false,
        temperature: 155,
        selectedOption: null,
        options: [{
          name: 'Nonfat',
          price: .25
        },
        {
          name: '2%',
          price: .50
        },
        {
          name: 'Whole',
          price: .50
        }
      ]
    }];
    return of(demoAdditions);
  }

  public addAddition(order: CoffeeOrder, addition: CoffeeAddition, option: CoffeeAdditionOption): void {
    console.log('add!');
    const additions = [...order.additions, addition];
    const total = order.total + option.price;
    this.order.next({...order, additions, total});
  }

  public removeAddition(order: CoffeeOrder, addition: CoffeeAddition, option: CoffeeAdditionOption): void {
    const additions = order.additions.filter(currentAddition => currentAddition.id !== addition.id);
    const total = order.total - option.price;
    this.order.next({...order, additions, total});
  }
}