import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AdditionTypes, CoffeeAddition, CoffeeAdditionOption, DairyFoam } from '../models/coffee-products';
import { CoffeeOrder } from '../models/coffee-order';
import { demoAdditions, demoCappuccino, demoOrderCappuccino, demoOrderLatte } from '../models/demo-data';

/* Dear Reader: Don't worry about this code too much! We're faking a "coffee products" API here, just know that the public functions
return Observables of coffee data, and can be used to add additions to an order*/

@Injectable()
export class CoffeeOrderService {
  private order: BehaviorSubject<CoffeeOrder>;
  public order$: Observable<CoffeeOrder>

  constructor() { 
    this.order = new BehaviorSubject(demoOrderLatte);
    this.order$ = this.order.asObservable() as Observable<CoffeeOrder>;
    console.log(demoOrderCappuccino);
  }

  public getDemoAdditions(): Observable<CoffeeAddition[]> {
    return of(demoAdditions);
  }

  private getOptionsTotal(options: CoffeeAdditionOption[]): number {
    return options.reduce((total, option)  => {
      total += option.price * option.quantity;
      return total;
    }, 0);
  }

  private getAdditionsTotal(additions: CoffeeAddition[]): number {
    return additions.reduce((total, addition) => {
      total += this.getOptionsTotal(addition.selectedOptions);
      return total;
    }, 0);
  }

  public convertToCappuccinoOrder(order: CoffeeOrder): void {
    const additionsToMap = order.additions.filter(addition => addition.name !== AdditionTypes.FOAM);
    let newOrder = demoOrderCappuccino;
    const updatedDefaultAdditions = newOrder.additions.map((addition) => {
      const existingAddition = additionsToMap.find(currentAddition => currentAddition.id === addition.id);
      return (existingAddition ? existingAddition : addition);
    });
    newOrder.additions = [...updatedDefaultAdditions, ...additionsToMap];
    this.order.next(newOrder);
  }

  public addAddition(order: CoffeeOrder, addition: CoffeeAddition): void {
    const filteredAdditions = order.additions.filter(currentAddition => currentAddition.id !== addition.id);
    const additions = [...filteredAdditions, addition];
    const total = order.product.price + this.getAdditionsTotal(additions);
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