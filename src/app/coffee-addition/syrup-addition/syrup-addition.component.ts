import { Component, OnInit } from '@angular/core';
import { CoffeeOrderService } from '../../services/coffee-order.service';
import { CoffeeAdditionComponent } from '../coffee-addition.component';

@Component({
  selector: 'app-syrup-addition',
  templateUrl: './syrup-addition.component.html',
  styleUrls: ['./syrup-addition.component.css']
})
export class SyrupAdditionComponent extends CoffeeAdditionComponent implements OnInit {

  quantity: number = 1;

  constructor(orderService: CoffeeOrderService) {
    super(orderService);
  }

  ngOnInit() {
  }

  increase(): void {
    this.quantity++;
    this.selectedOption.quantity = this.quantity;
    this.saveSelection();
  }

  decrease(): void {
    this.quantity = this.quantity-- > 1 ? this.quantity-- : 1;
    this.selectedOption.quantity = this.quantity;
    this.saveSelection();
  }
}