import { Component, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { CoffeeOrder } from './models/coffee-order';
import { CoffeeOrderService } from './services/coffee-order.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
    name = 'Angular ' + VERSION.major;

    demoOrder$: Observable<CoffeeOrder>;

    constructor(private orderService: CoffeeOrderService) { }

    ngOnInit(): void {
      this.demoOrder$ = this.orderService.getDemoCoffeeOrder();
    }

}
