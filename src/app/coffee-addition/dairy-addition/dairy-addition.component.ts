import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CoffeeOrderService } from '../../services/coffee-order.service';
import { CoffeeAdditionComponent } from '../coffee-addition.component';

@Component({
  selector: 'app-dairy-addition',
  templateUrl: './dairy-addition.component.html',
  styleUrls: ['./dairy-addition.component.css']
})
export class DairyAdditionComponent extends CoffeeAdditionComponent implements OnInit {

  constructor(orderService: CoffeeOrderService, public cdRef: ChangeDetectorRef) {
    super(orderService, cdRef);
   }

  ngOnInit(): void {
    super.ngOnInit();
  }
}