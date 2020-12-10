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

  selectedFoam: DairyFoam;
  showCappuccinoMessage: boolean;

  constructor(orderService: CoffeeOrderService) {
    super(orderService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  saveFoam(): void {
    if (this.selectedFoam) {
      this.orderService.addFoam(this.coffeeOrder, this.addition, this.selectedFoam);
      this.showCappuccinoMessage = this.suggestCappuccino();
    } else {
      this.orderService.removeFoam(this.coffeeOrder, this.addition);
    }
  }
  
  suggestCappuccino(): boolean {
    return (
        this.selectedFoam === DairyFoam.EXTRA && 
        this.coffeeOrder.product.name !== CoffeeProducts.CAPPUCCINO
    );
  }
}