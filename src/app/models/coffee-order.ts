import { CoffeeAddition } from "./coffee-addition";
import { CoffeeProducts } from "./coffee-addition";

export interface CoffeeOrder {
    size: string;
    roast: string;
    product: CoffeeProducts;
    additions: CoffeeAddition[];
}

