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

export enum DairyFoam {
    REGULAR = 'Regular',
    EXTRA = 'Extra'
}

export const dairyFoams: DairyFoam[] = [
  DairyFoam.EXTRA,
  DairyFoam.REGULAR
]

export interface DairyAddition extends CoffeeAddition {
    steamed: boolean;
    temperature: number;
    foam?: DairyFoam;
    foamOptions: DairyFoam[];
}

export interface CoffeeProduct {
  name: string;
  price: number;
}

export const CoffeeProducts: CoffeeProduct[] = [
  {
    name: 'Latte',
    price: 3.90
  },
  {
    name: 'Cappuccino',
    price: 4.00
  }
]