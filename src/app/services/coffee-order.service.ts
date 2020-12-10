import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CoffeeAddition, CoffeeAdditionOption,  CoffeeProducts, DairyFoam } from '../models/coffee-addition';
import { CoffeeOrder } from '../models/coffee-order';

/* Dear Reader: Don't worry about this code too much! We're faking a "coffee products" API here, just know that the public functions
return Observables of coffee data and can be used to add additions to an order*/

@Injectable()
export class CoffeeOrderService {
  private defaultOrder: CoffeeOrder = {
    size: 'Large',
    roast: 'medium',
    product: {
      name: 'Latte',
      price: 3.90
    },
    additions: [{        
      name: 'Dairy',
      id: 59898982,
      selectedOption: {
        id: 654841212,
        name: '2%',
        price: 0.00,
        quantity: 1
      },
      options: []
    }],
    total: 3.90
  }; 
  private order: BehaviorSubject<CoffeeOrder>;
  public order$: Observable<CoffeeOrder>

  constructor() { 
    this.order = new BehaviorSubject(this.defaultOrder);
    this.order$ = this.order.asObservable() as Observable<CoffeeOrder>;
  }

  public getDemoAdditions(): Observable<CoffeeAddition[]> {
    const demoAdditions = [{
        name: 'Sugar',
        id: 59898981,
        selectedOption: null,
        options: [{
            id: 98765131,
            name: 'White Sugar',
            price: .25,
            quantity: 1
          },
          {
            id: 98765315,
            name: 'Raw Sugar',
            price: .50,
            quantity: 1
          },
          {
            id: 9874561,
            name: 'Brown Sugar',
            price: .50,
            quantity: 1
        }]
      },
      {
        name: 'Syrup',
        id: 59898978,
        selectedOption: null,
        options: [{
          id: 9876517831,
          name: 'Vanilla',
          price: .25,
          quantity: 1
        },
        {
          id: 9877894315,
          name: 'Caramel',
          price: .50,
          quantity: 1
        },
        {
          id: 9874578161,
          name: 'Hazelnut',
          price: .50,
          quantity: 1
        }]
      },
      {
        name: 'Dairy',
        id: 59898982,
        selectedOption: {
          id: 654841212,
          name: '2%',
          price: 0.00,
          quantity: 1
        },
        options: [{
          id: 7878979845,
          name: 'Nonfat',
          price: 0.00,
          quantity: 1
        },
        {
          id: 654841212,
          name: '2%',
          price: 0.00,
          quantity: 1
        },
        {
          id: 9876513524,
          name: 'Whole',
          price: 0.00,
          quantity: 1
        }]
      },
      {
        name: 'Foam',
        id: 59898985,
        selectedOption: {
          id: 654841712,
          name: 'Regular',
          price: 0.00,
          quantity: 1
        },
        options: [{
          id: 654841778,
          name: 'Light',
          price: 0.00,
          quantity: 1
        },
        {
          id: 654841712,
          name: 'Regular',
          price: 0.00,
          quantity: 1
        },
        {
          id: 654847212,
          name: 'Extra',
          price: 0.00,
          quantity: 1
        }]
      }
    ];
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
    console.log(addition);
    console.log(option);
    const filteredAdditions = this.deduplicateAdditions(order.additions, addition);
    const additions = [...filteredAdditions, {...addition, selectedOption: option}];
    const additionTotal = additions.reduce((total, addition) => {
      total += addition.selectedOption.price * addition.selectedOption.quantity;
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