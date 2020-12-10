export interface CoffeeAddition {
    name: string;
    id: number;
    selectedOptions: CoffeeAdditionOption[];
    options: CoffeeAdditionOption[];
    allowMultiple: boolean;
}

export interface CoffeeAdditionOption {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CoffeeProduct {
  name: string;
  price: number;
}

export enum AdditionTypes {
  DAIRY = 'Dairy',
  SUGAR = 'Sugar',
  FOAM = 'Foam',
  SYRUP = 'Syrup'
}

export enum DairyFoam {
  REGULAR = 'Regular',
  EXTRA = 'Extra'
}

export enum CoffeeProducts {
  CAPPUCCINO = 'cappucino',
  LATTE = 'latte'
}