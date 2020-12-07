import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoffeeAdditionComponent } from './coffee-addition/coffee-addition.component';
import { CoffeeOrderService } from './services/coffee-order.service';
import { CoffeeOrderComponent } from './coffee-order/coffee-order.component';

/**
 * https://www.npmjs.com/package/angular-font-awesome
 */


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, CoffeeAdditionComponent, CoffeeOrderComponent ],
  bootstrap:    [ AppComponent ],
  providers: [CoffeeOrderService]
})
export class AppModule { }
