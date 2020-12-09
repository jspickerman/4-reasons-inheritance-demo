import { CoffeeAddition, CoffeeProduct, DairyAddition } from "./coffee-addition";

export interface CoffeeOrder {
  size: string;
  roast: string;
  product: CoffeeProduct;
  additions: Array<CoffeeAddition | DairyAddition>;
  total: number;
}

