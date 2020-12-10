import { Component, OnInit } from '@angular/core';
import { CoffeeAdditionOption } from '../../models/coffee-addition';
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

  public updateOption(updatedOption: CoffeeAdditionOption): void {
    if (this.addition.selectedOptions.length > 0) {
      this.addition.selectedOptions.map(currentOption => currentOption.id === updatedOption.id ? updatedOption : currentOption);
    } else {
      this.addition.selectedOptions.push(updatedOption);
    }
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