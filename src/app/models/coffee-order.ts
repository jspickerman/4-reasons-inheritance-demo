import { CoffeeAddition, CoffeeProduct } from "./coffee-addition";

export interface CoffeeOrder {
    size: string;
    roast: string;
    product: CoffeeProduct;
    additions: CoffeeAddition[];
    total: number;
}

