import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoffeeAdditionComponent } from './coffee-addition/coffee-addition.component';
import { CoffeeOrderService } from './services/coffee-order.service';
import { CoffeeOrderComponent } from './coffee-order/coffee-order.component';
import { DairyAdditionComponent } from './coffee-addition/dairy-addition/dairy-addition.component';
import { SyrupAdditionComponent } from './coffee-addition/syrup-addition/syrup-addition.component';
import { FoamAdditionComponent } from './coffee-addition/foam-addition/foam-addition.component';
import { SyrupOptionComponent } from './coffee-addition/syrup-addition/syrup-option/syrup-option.component';

/**
 * https://www.npmjs.com/package/angular-font-awesome
 */


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, CoffeeAdditionComponent, CoffeeOrderComponent, DairyAdditionComponent, SyrupAdditionComponent, FoamAdditionComponent, SyrupOptionComponent ],
  bootstrap:    [ AppComponent ],
  providers: [CoffeeOrderService]
})
export class AppModule { }
