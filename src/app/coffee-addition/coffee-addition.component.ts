import { Component, Input, OnInit } from '@angular/core';
import { CoffeeAddition } from '../models/coffee-addition';
import { CoffeeOrder } from '../models/coffee-order';
import { CoffeeOrderService } from '../services/coffee-order.service';

@Component({
  selector: 'app-coffee-addition',
  templateUrl: './coffee-addition.component.html',
  styleUrls: ['./coffee-addition.component.css']
})
export class CoffeeAdditionComponent implements OnInit {

  @Input()
  coffeeOrder: CoffeeOrder;

  @Input()
  addition: CoffeeAddition;

  public selected: boolean;

  constructor(private orderService: CoffeeOrderService) { }

  ngOnInit() {
    console.log(this.coffeeOrder);
  }

}