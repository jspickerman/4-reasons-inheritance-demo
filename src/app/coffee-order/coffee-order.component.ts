import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoffeeAddition, DairyAddition } from '../models/coffee-addition';
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

  availableAdditions$: Observable<CoffeeAddition[]>

  dairyAdditions$: Observable<DairyAddition[]>

  constructor(private orderService: CoffeeOrderService) { }

  ngOnInit() {
    this.availableAdditions$ = this.orderService.getDemoAdditions();
    this.dairyAdditions$ = this.orderService.getDemoDairyAdditions();
  }
}