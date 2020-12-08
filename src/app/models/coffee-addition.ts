export interface CoffeeAddition {
    name: string;
    id: number;
    selectedOption: CoffeeAdditionOption;
    options: CoffeeAdditionOption[];
}

export interface CoffeeAdditionOption {
  name: string;
  price: number;
}

export interface DairyAddition extends CoffeeAddition {
    steamed: boolean;
    temperature: number;
    foam?: DairyFoam;
}

export enum CoffeeProducts {
    CAPPUCCINO = 'Cappuccino',
    LATTE = 'Latte'
}

export enum DairyFoam {
    REGULAR = 'Regular',
    EXTRA = 'Extra'
}