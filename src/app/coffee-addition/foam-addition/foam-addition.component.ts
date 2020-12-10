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
    if (this.selectedOption) {
      this.orderService.addAddition(this.coffeeOrder, this.addition, this.selectedOption);
      this.showCappuccinoMessage = this.suggestCappuccino();
    } else {
      this.orderService.removeAddition(this.coffeeOrder, this.addition);
    }
  }
  
  public suggestCappuccino(): boolean {
    return (
        this.selectedOption.name === DairyFoam.EXTRA && 
        this.coffeeOrder.product.name !== CoffeeProducts.CAPPUCCINO
    );
  }
}