import { Component, OnInit } from '@angular/core';
import { AdditionTypes, CoffeeProducts, DairyFoam } from '../../models/coffee-addition';
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
    this.showCappuccinoMessage = this.suggestCappuccino();
  }

  public saveSelection(): void {
    console.log('selectd options' , this.selectedOptions);
    console.log('selected opition ',this.selectedOption);
    if (this.selectedOptions) {
      this.orderService.addAddition(this.coffeeOrder, {...this.addition, selectedOptions: this.selectedOptions});
      // this.showCappuccinoMessage = this.suggestCappuccino();
      // console.log(this.showCappuccinoMessage);
    } else {
      this.orderService.removeAddition(this.coffeeOrder, this.addition);
      this.showCappuccinoMessage = false;
    }
  }
  
  public suggestCappuccino(): boolean {
    const foamAddition = this.coffeeOrder.additions.find(addition => addition.name === AdditionTypes.FOAM);
    console.log(foamAddition);
    const extraFoamOption = foamAddition && foamAddition.selectedOptions.find(option => option.name === DairyFoam.EXTRA);
    console.log(extraFoamOption);
    return (
        extraFoamOption && 
        this.coffeeOrder.product.name !== CoffeeProducts.CAPPUCCINO
    );
  }
}