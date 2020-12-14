import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CoffeeAdditionOption } from '../../models/coffee-addition';
import { CoffeeOrderService } from '../../services/coffee-order.service';
import { CoffeeAdditionComponent } from '../coffee-addition.component';

@Component({
  selector: 'app-syrup-addition',
  templateUrl: './syrup-addition.component.html',
  styleUrls: ['./syrup-addition.component.css']
})
export class SyrupAdditionComponent extends CoffeeAdditionComponent implements OnInit {

  quantity: number = 1;

  constructor(orderService: CoffeeOrderService, public cdRef: ChangeDetectorRef) {
    super(orderService, cdRef);
   }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public updateOption(updatedOption: CoffeeAdditionOption): void {
    if (updatedOption.quantity !== 0) {
      if (this.selectedOptions.length > 0) {
        this.selectedOptions = [...this.selectedOptions.filter(currentOption => currentOption.id !== updatedOption.id), updatedOption];
      } else {
        this.selectedOptions = [...this.selectedOptions, updatedOption];
      }
    } else {
      this.selectedOptions = this.selectedOptions.filter(currentOption => currentOption.id !== updatedOption.id);
    }
    this.saveSelection();
  }
}