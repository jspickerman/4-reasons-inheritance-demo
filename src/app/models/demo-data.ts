import { CoffeeAddition } from "./coffee-addition";
import { CoffeeOrder } from "./coffee-order";

const demoSugar: CoffeeAddition = {
  name: "Sugar",
  id: 59898981,
  selectedOptions: [],
  options: [
    {
      id: 98765131,
      name: "White Sugar",
      price: 0.25,
      quantity: 1
    },
    {
      id: 98765315,
      name: "Raw Sugar",
      price: 0.5,
      quantity: 1
    },
    {
      id: 9874561,
      name: "Brown Sugar",
      price: 0.5,
      quantity: 1
    }
  ]
};

const demoSyrup: CoffeeAddition = {
  name: "Syrup",
  id: 59898978,
  selectedOptions: [],
  options: [
    {
      id: 9876517831,
      name: "Vanilla",
      price: 0.25,
      quantity: 0
    },
    {
      id: 9877894315,
      name: "Caramel",
      price: 0.5,
      quantity: 0
    },
    {
      id: 9874578161,
      name: "Hazelnut",
      price: 0.5,
      quantity: 0
    }
  ]
};

const demoDairy: CoffeeAddition = {
  name: "Dairy",
  id: 59898982,
  selectedOptions: [],
  options: [
    {
      id: 7878979845,
      name: "Nonfat",
      price: 0.0,
      quantity: 1
    },
    {
      id: 654841212,
      name: "2%",
      price: 0.0,
      quantity: 1
    },
    {
      id: 9876513524,
      name: "Whole",
      price: 0.0,
      quantity: 1
    }
  ]
};

const demoFoam: CoffeeAddition = {
  name: "Foam",
  id: 59898985,
  selectedOptions: [],
  options: [
    {
      id: 654841778,
      name: "Light",
      price: 0.0,
      quantity: 1
    },
    {
      id: 654841712,
      name: "Regular",
      price: 0.0,
      quantity: 1
    },
    {
      id: 654847212,
      name: "Extra",
      price: 0.0,
      quantity: 1
    }
  ]
};

export const demoOrder: CoffeeOrder = {
  size: "Large",
  roast: "medium",
  product: {
    name: "Latte",
    price: 3.9
  },
  additions: [
    {
      name: "Dairy",
      id: 59898982,
      selectedOptions: [
        {
          id: 654841212,
          name: "2%",
          price: 0.0,
          quantity: 1
        }
      ],
      options: []
    },
    {
      name: "Foam",
      id: 59898985,
      selectedOptions: [
        {
          id: 654841712,
          name: "Regular",
          price: 0.0,
          quantity: 1
        }
      ],
      options: []
    }
  ],
  total: 3.9
};

export const demoAdditions: CoffeeAddition[] = [
  demoSugar,
  demoSyrup,
  demoDairy,
  demoFoam
];
