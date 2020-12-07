export interface CoffeeAddition {
    name: string;
    id: number;
    quantity: number;
    price: number;
}

export interface DairyAddition extends CoffeeAddition {
    steamed: boolean;
    temperature: number;
    foam: DairyFoam;
}

export enum CoffeeProducts {
    CAPPUCCINO = 'cappuccino',
    LATTE = 'latte'
}

export enum DairyFoam {
    REGULAR = 'regular',
    EXTRA = 'extra'
}