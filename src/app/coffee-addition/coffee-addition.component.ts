import { Component, Input, OnInit } from '@angular/core';
import { CoffeeAddition, CoffeeAdditionOption } from '../models/coffee-addition';
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

  public selectedOption: CoffeeAdditionOption;

  constructor(private orderService: CoffeeOrderService) { }

  ngOnInit() {
    this.preselectCurrentOption();
  }

  public additionSelected(): boolean {
    return this.coffeeOrder.additions.some((addition) => addition.id === this.addition.id);
  }

  public preselectCurrentOption(): void {
    const currentAdditionSelection = this.coffeeOrder.additions.find((addition) => addition.id === this.addition.id);
    if (currentAdditionSelection) {
      this.selectedOption = currentAdditionSelection.selectedOption;
    }
  }

  public setSelection(option: CoffeeAdditionOption): void {
    this.selectedOption = option;
    this.orderService.addAddition(this.coffeeOrder, this.addition, option);
  }

  public clearSelection(): void {
    this.orderService.removeAddition(this.coffeeOrder, this.addition, this.selectedOption);
  }
}