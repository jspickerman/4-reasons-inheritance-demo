import { Component, Input, OnInit } from '@angular/core';
import { CoffeeAddition, CoffeeAdditionOption } from '../models/coffee-products';
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
  public selectedOptions: CoffeeAdditionOption[] = [];

  constructor(public orderService: CoffeeOrderService) { }

  ngOnInit(): void {
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
      this.selectedOption = this.selectedOptions[0];
    }
  }

  public optionsMatch(firstOption: CoffeeAdditionOption, secondOption: CoffeeAdditionOption): boolean {
    if (firstOption && secondOption) {
      return (firstOption.id === secondOption.id);
    } else if (!firstOption && !secondOption) {
      return true;
    } else {
      return false;
    }
  }

  public addSelection(): void {
    if (this.selectedOption) {
      if (this.addition.allowMultiple) {
        this.selectedOptions.push(this.selectedOption);
      } else {
        this.selectedOptions = [this.selectedOption];
      }
    } else {
      if (!this.addition.allowMultiple) {
        this.selectedOptions = [];
      }
    }
    this.saveSelection();
  }

  public saveSelection(): void {
    if (this.selectedOptions) {
      this.orderService.addAddition(this.coffeeOrder, {...this.addition, selectedOptions: this.selectedOptions});
    } else {
      this.orderService.removeAddition(this.coffeeOrder, this.addition);
    }
  }

  public clearSelection(): void {
    this.orderService.removeAddition(this.coffeeOrder, this.addition);
  }
}