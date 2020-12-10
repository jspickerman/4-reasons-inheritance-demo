import { Component, Input, OnInit } from '@angular/core';
import { CoffeeAdditionOption } from '../../../models/coffee-addition';

@Component({
  selector: 'app-syrup-option',
  templateUrl: './syrup-option.component.html',
  styleUrls: ['./syrup-option.component.css']
})
export class SyrupOptionComponent implements OnInit {

  @Input()
  syrupOption: CoffeeAdditionOption

  constructor() { }

  ngOnInit() {
  }

}