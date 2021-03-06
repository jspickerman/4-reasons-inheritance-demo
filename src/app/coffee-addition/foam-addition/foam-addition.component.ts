import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AdditionTypes, CoffeeProducts, DairyFoam } from '../../models/coffee-products';
import { CoffeeOrderService } from '../../services/coffee-order.service';
import { CoffeeAdditionComponent } from '../coffee-addition.component';

@Component({
  selector: 'app-foam-addition',
  templateUrl: './foam-addition.component.html',
  styleUrls: ['./foam-addition.component.css']
})
export class FoamAdditionComponent extends CoffeeAdditionComponent implements OnInit {

  showCappuccinoMessage: boolean;

  constructor(orderService: CoffeeOrderService) {
    super(orderService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.showCappuccinoMessage = this.suggestCappuccino();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.coffeeOrder) {
      this.showCappuccinoMessage = this.suggestCappuccino();
    }
  }

  public saveSelection(): void {
    if (this.selectedOptions) {
      this.orderService.addAddition(this.coffeeOrder, {...this.addition, selectedOptions: this.selectedOptions});
    } else {
      this.orderService.removeAddition(this.coffeeOrder, this.addition);
    }
  }
  
  public suggestCappuccino(): boolean {
    const foamAddition = this.coffeeOrder.additions.find(addition => addition.name === AdditionTypes.FOAM);
    const extraFoamOption = foamAddition && foamAddition.selectedOptions.find(option => option.name === DairyFoam.EXTRA);
    return (
        extraFoamOption && 
        this.coffeeOrder.product.name !== CoffeeProducts.CAPPUCCINO
    );
  }

  public makeCappuccino(): void {
    this.orderService.convertToCappuccinoOrder(this.coffeeOrder);
  }
}