import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoffeeAdditionOption } from '../../../models/coffee-products';

@Component({
  selector: 'app-syrup-option',
  templateUrl: './syrup-option.component.html',
  styleUrls: ['./syrup-option.component.css']
})
export class SyrupOptionComponent implements OnInit {

  @Input()
  option: CoffeeAdditionOption;

  @Output()
  updatedOption: EventEmitter<CoffeeAdditionOption> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public increase(): void {
    this.option.quantity++;
    this.emitUpdatedOption();
  }

  public decrease(): void {
    this.option.quantity = this.option.quantity-- > 0 ? this.option.quantity-- : 0;
    this.emitUpdatedOption();
  }

  public emitUpdatedOption(): void {
    this.updatedOption.emit(this.option);
  }
}