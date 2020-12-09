export interface CoffeeAddition {
    name: string;
    id: number;
    selectedOption: CoffeeAdditionOption;
    options: CoffeeAdditionOption[];
}

export interface CoffeeAdditionOption {
  id: number;
  name: string;
  price: number;
}

export interface DairyAddition extends CoffeeAddition {
  steamed: boolean;
  temperature: number;
  selectedFoam: DairyFoam;
  foamOptions: DairyFoam[];
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