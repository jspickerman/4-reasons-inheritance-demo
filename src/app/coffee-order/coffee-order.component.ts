import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdditionTypes, CoffeeAddition } from '../models/coffee-products';
import { CoffeeOrder } from '../models/coffee-order';
import { CoffeeOrderService } from '../services/coffee-order.service';

@Component({
  selector: 'app-coffee-order',
  templateUrl: './coffee-order.component.html',
  styleUrls: ['./coffee-order.component.css']
})
export class CoffeeOrderComponent implements OnInit {

  @Input()
  coffeeOrder: CoffeeOrder;

  allAdditions$: Observable<CoffeeAddition[]>

  standardAdditions$: Observable<CoffeeAddition[]>
  syrupAdditions$: Observable<CoffeeAddition[]>
  dairyAdditions$: Observable<CoffeeAddition[]>
  foamAdditions$: Observable<CoffeeAddition[]>

  constructor(private orderService: CoffeeOrderService) { }

  ngOnInit() {
    this.allAdditions$ = this.orderService.getDemoAdditions();
    this.standardAdditions$ = this.allAdditions$.pipe(
      map(additions => additions.filter(addition => addition.name !== AdditionTypes.SYRUP 
        && addition.name !== AdditionTypes.DAIRY
        && addition.name !== AdditionTypes.FOAM))
    );
    this.syrupAdditions$ = this.allAdditions$.pipe(
      map(additions => additions.filter(addition => addition.name === AdditionTypes.SYRUP))
    );
    this.dairyAdditions$ = this.allAdditions$.pipe(
      map(additions => additions.filter(addition => addition.name === AdditionTypes.DAIRY))
    );
    this.foamAdditions$ = this.allAdditions$.pipe(
      map(additions => additions.filter(addition => addition.name === AdditionTypes.FOAM))
    );
  }
}