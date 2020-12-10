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

  ngOnInit(): void {
    super.ngOnInit();
  }

  public increase(): void {
    this.quantity++;
    this.selectedOption.quantity = this.quantity;
    this.saveSelection();
  }

  public decrease(): void {
    this.quantity = this.quantity-- > 1 ? this.quantity-- : 1;
    this.selectedOption.quantity = this.quantity;
    this.saveSelection();
  }

  public saveSelection(): void {
    if (this.selectedOption) {
      this.selectedOption.quantity = this.quantity;
      this.orderService.addAddition(this.coffeeOrder, this.addition, this.selectedOption);
    } else {
      this.orderService.removeAddition(this.coffeeOrder, this.addition);
      this.quantity = 1;
    }
  }
}