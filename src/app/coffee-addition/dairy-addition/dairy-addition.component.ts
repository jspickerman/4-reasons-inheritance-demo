import { Component, Input, OnInit } from '@angular/core';
import { AdditionTypes, CoffeeAddition, CoffeeProducts, DairyFoam } from '../../models/coffee-addition';
import { CoffeeOrderService } from '../../services/coffee-order.service';
import { CoffeeAdditionComponent } from '../coffee-addition.component';

@Component({
  selector: 'app-dairy-addition',
  templateUrl: './dairy-addition.component.html',
  styleUrls: ['./dairy-addition.component.css']
})
export class DairyAdditionComponent extends CoffeeAdditionComponent implements OnInit {

  @Input()
  addition: CoffeeAddition;

  constructor(orderService: CoffeeOrderService) {
    super(orderService);
   }

  ngOnInit(): void {
    super.ngOnInit();
  }
}