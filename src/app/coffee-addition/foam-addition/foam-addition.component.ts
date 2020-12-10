import { Component, OnInit } from '@angular/core';
import { CoffeeProducts, DairyFoam } from '../../models/coffee-addition';
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

  ngOnInit() {
    super.ngOnInit();
  }

  public saveSelection(): void {
    if (this.selectedOptions.length > 0) {
      this.orderService.addAddition(this.coffeeOrder, this.addition, this.selectedOptions);
      this.showCappuccinoMessage = this.suggestCappuccino();
    } else {
      this.orderService.removeAddition(this.coffeeOrder, this.addition);
      this.showCappuccinoMessage = false;
    }
  }
  
  public suggestCappuccino(): boolean {
    const extraFoamOption = this.selectedOptions.find(option => option.name === DairyFoam.EXTRA);
    return (
        extraFoamOption && 
        this.coffeeOrder.product.name !== CoffeeProducts.CAPPUCCINO
    );
  }
}