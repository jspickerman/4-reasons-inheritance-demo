import { CoffeeAddition, CoffeeProduct } from "./coffee-products";

export interface CoffeeOrder {
  size: string;
  roast: string;
  product: CoffeeProduct;
  additions: CoffeeAddition[];
  total: number;
}
