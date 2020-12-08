import { Component, Input, OnInit } from '@angular/core';
import { CoffeeProducts, DairyAddition, DairyFoam } from '../../models/coffee-addition';
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

  showCappuccinoMessage: boolean;
  selectedFoam: DairyFoam;

  constructor(orderService: CoffeeOrderService) {
    super(orderService);
   }

  ngOnInit() {
    super.ngOnInit();
  }

  saveFoam(): void {
    if (this.selectedFoam) {
      this.orderService.addFoam(this.coffeeOrder, this.addition, this.selectedFoam);
    } else {
      
    }
  }

  //   setFoam(foam: DairyFoam): void {
  //   this.addition.foam = foam;
  // }
  
  // suggestCappuccino(): boolean {
  //   // return (this.addition.foam === DairyFoam.EXTRA && this.coffeeOrder.product !== CoffeeProducts.CAPPUCCINO);
  // }
}