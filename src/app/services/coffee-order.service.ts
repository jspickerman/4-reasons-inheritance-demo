import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CoffeeAddition, CoffeeAdditionOption, DairyFoam } from '../models/coffee-addition';
import { CoffeeOrder } from '../models/coffee-order';
import { demoAdditions, demoOrder } from '../models/demo-data';

/* Dear Reader: Don't worry about this code too much! We're faking a "coffee products" API here, just know that the public functions
return Observables of coffee data, and can be used to add additions to an order*/

@Injectable()
export class CoffeeOrderService {
  private order: BehaviorSubject<CoffeeOrder>;
  public order$: Observable<CoffeeOrder>

  constructor() { 
    this.order = new BehaviorSubject(demoOrder);
    this.order$ = this.order.asObservable() as Observable<CoffeeOrder>;
  }

  public getDemoAdditions(): Observable<CoffeeAddition[]> {
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
          return additionInstance.selectedOptions.map((option) => {
            return (currentAddition.selectedOptions.find(currentOption => option.id === currentOption.id));
          });
        }
      });
    }
  }

  public addAddition(order: CoffeeOrder, addition: CoffeeAddition, options: CoffeeAdditionOption[]): void {
    const filteredAdditions = this.deduplicateAdditions(order.additions, addition);
    const additions = [...filteredAdditions, {...addition, selectedOptions: options}];
    const additionTotal = additions.reduce((total, addition) => {
      total = addition.selectedOptions.reduce((total, option) => {
        total += option.price * option.quantity;
        return total;
      }, 0)
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
        return additionInstance.selectedOptions.map((option) => {
          return (currentAddition.selectedOptions.find(currentOption => currentOption.id === option.id));
        });
      }
    });
    const additionTotal = additions.reduce((total, addition) => {
      total = addition.selectedOptions.reduce((total, option) => {
        total += option.price * option.quantity;
        return total;
      }, 0)
      return total;
    }, 0)
    const total = order.product.price + additionTotal;

    this.order.next({...order, additions, total});
  }

  public addFoam(order: CoffeeOrder, addition: CoffeeAddition, selectedFoam: DairyFoam): void {
    const updatedAddition = {...addition, selectedFoam};
    const additions = [...order.additions, {...updatedAddition}];
    this.order.next({...order, additions});
  }

  public removeFoam(order: CoffeeOrder, addition: CoffeeAddition): void {
    const updatedAddition = {...addition, selectedFoam: null};
    const additions = [...order.additions, {...updatedAddition}];
    this.order.next({...order, additions});
  }
}