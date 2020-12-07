import { Component, Input, OnInit } from '@angular/core';
import { CoffeeOrder } from '../models/coffee-order';

@Component({
  selector: 'app-coffee-order',
  templateUrl: './coffee-order.component.html',
  styleUrls: ['./coffee-order.component.css']
})
export class CoffeeOrderComponent implements OnInit {

  @Input()
  coffeeOrder: CoffeeOrder;


  constructor() { }

  ngOnInit() {
  }

}