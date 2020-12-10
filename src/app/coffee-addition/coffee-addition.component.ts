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

  public selectedOptions: CoffeeAdditionOption[];

  constructor(public orderService: CoffeeOrderService) { }

  ngOnInit() {
    this.preselectCurrentOption();
  }

  public additionSelected(): boolean {
    return this.coffeeOrder.additions.some((addition) => addition.id === this.addition.id);
  }

  public showPrice(additionOption: CoffeeAdditionOption): boolean {
    return (additionOption.price > 0);
  }

  public preselectCurrentOption(): void {
    const currentAdditionSelection = this.coffeeOrder.additions.find(currentAddition => currentAddition.id === this.addition.id);
    if (currentAdditionSelection) {
      this.selectedOptions = currentAdditionSelection.selectedOptions;
    }
  }

  public saveSelection(): void {
    if (this.selectedOptions) {
      this.orderService.addAddition(this.coffeeOrder, this.addition, this.selectedOptions);
    } else {
      this.orderService.removeAddition(this.coffeeOrder, this.addition);
    }
  }

  public clearSelection(): void {
    this.orderService.removeAddition(this.coffeeOrder, this.addition);
  }
}