import { Component, Input, OnInit } from '@angular/core';
import { AdditionTypes, CoffeeProducts, DairyAddition, DairyFoam } from '../../models/coffee-addition';
import { CoffeeOrderService } from '../../services/coffee-order.service';
import { CoffeeAdditionComponent } from '../coffee-addition.component';

@Component({
  selector: 'app-dairy-addition',
  templateUrl: './dairy-addition.component.html',
  styleUrls: ['./dairy-addition.component.css']
})
export class DairyAdditionComponent extends CoffeeAdditionComponent implements OnInit {

  @Input()
  addition: DairyAddition;

  selectedFoam: DairyFoam;
  showCappuccinoMessage: boolean;

  constructor(orderService: CoffeeOrderService) {
    super(orderService);
   }

  ngOnInit(): void {
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