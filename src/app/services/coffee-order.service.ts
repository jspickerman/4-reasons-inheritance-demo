import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CoffeeAddition, CoffeeAdditionOption,  CoffeeProducts, DairyAddition, DairyFoam, dairyFoams } from '../models/coffee-addition';
import { CoffeeOrder } from '../models/coffee-order';

@Injectable()
export class CoffeeOrderService {
  private defaultOrder: CoffeeOrder = {
    size: 'Large',
    roast: 'medium',
    product: {
      name: 'Latte',
      price: 3.90
    },
    additions: [],
    total: 3.90
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
          id: 98765131,
          name: 'White Sugar',
          price: .25
        },
        {
          id: 98765315,
          name: 'Raw Sugar',
          price: .50
        },
        {
          id: 9874561,
          name: 'Brown Sugar',
          price: .50
        }
      ]
    }];
    return of(demoAdditions);
  }

  public getDemoDairyAdditions(): Observable<DairyAddition[]> {
    const demoAdditions: DairyAddition[] = [{
        name: 'Dairy',
        id: 59898982,
        steamed: false,
        temperature: 155,
        selectedOption: null,
        foam: null,
        foamOptions: dairyFoams,
        options: [{
          id: 7878979845,
          name: 'Nonfat',
          price: .25
        },
        {
          id: 654841212,
          name: '2%',
          price: .50
        },
        {
          id: 9876513524,
          name: 'Whole',
          price: .50
        }
      ]
    }];
    return of(demoAdditions);
  }

  private deduplicateAdditions(additions: CoffeeAddition[], addition: CoffeeAddition): CoffeeAddition[] {
    const additionInstance = additions.find(currentAddition => currentAddition.id === addition.id);
    if (!additionInstance) {
      return additions;
    } else {
      return additions.filter((currentAddition) => {
        if (currentAddition.id !== additionInstance.id) {
          return true;
        } else {
          if (currentAddition.selectedOption.id !== additionInstance.selectedOption.id) {
            return true;
          }
        }
      });
    }
  }

  public addAddition(order: CoffeeOrder, addition: CoffeeAddition, option: CoffeeAdditionOption): void {
    const filteredAdditions = this.deduplicateAdditions(order.additions, addition);
    const additions = [...filteredAdditions, {...addition, selectedOption: option}];
    const additionTotal = additions.reduce((total, addition) => {
      total += addition.selectedOption.price;
      return total;
    }, 0)
    const total = order.product.price + additionTotal;

    this.order.next({...order, additions, total});
  }

  public removeAddition(order: CoffeeOrder, addition: CoffeeAddition): void {
    const additionInstance = order.additions.find(currentAddition => currentAddition.id === addition.id);
    const additions = order.additions.filter((currentAddition) => {
      if (currentAddition.id !== additionInstance.id) {
        return true;
      } else {
        if (currentAddition.selectedOption.id !== additionInstance.selectedOption.id) {
          return true;
        }
      }
    });
    const additionTotal = additions.reduce((total, addition) => {
      total += addition.selectedOption.price;
      return total;
    }, 0)
    const total = order.product.price + additionTotal;

    this.order.next({...order, additions, total});
  }

  public addFoam(order: CoffeeOrder, addition: DairyAddition, foam: DairyFoam): void {
    const updatedAddition = {...addition, foam};
    const filteredAdditions = this.deduplicateAdditions(order.additions, addition);
    const additions = [...filteredAdditions, {...updatedAddition}];
    this.order.next({...order, additions});
  }

  public removeFoam(order: CoffeeOrder, addition: DairyAddition): void {
    const updatedAddition = {...addition, foam: null};
    const filteredAdditions = this.deduplicateAdditions(order.additions, addition);
    const additions = [...filteredAdditions, {...updatedAddition}];
    this.order.next({...order, additions});
  }
}