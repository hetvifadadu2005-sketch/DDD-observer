import { v4 as uuidv4 } from "uuid";

/*
 **
 ** avoid any "weird" number as input
 */

/* 1.  factory function  */
/*  a factory function creates a new object  */

/* 2.  constructor function  */
// OOP
// a constructor function creates a new object and sets its properties

// create a primitive obsessed type

// modify this code for testing !!
// this replicates user input

try {
  const orderOne = {
    id: uuidv4(), // generate a unique id for the order
    name: "order one",
    price: createPrice(-100),
    quantity: createQuantity(200000000),
    total: createTotal(
      () => createPrice(-100),
      () => createQuantity(200000000),
      456465465465465400,
    ), // example 1
    //total: createTotal(price, quantity, 456465465465465400),  // example 2 - this will throw an error because price and quantity are not defined yet
  };
  console.log(orderOne);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Unknown error");
  }
}
// Creating the Brand Type
type Price = number & { readonly __brand: "Price" };
type Quantity = number & { __brand: "Quantity_Number" };
type Total = number & { __brand: "Total_Number" };

// Factory functions to create branded types

// Factory function for Price
function createPrice(amount: number): Price {
  if (amount < 0) {
    throw new Error("Price being postive value can't be negative 😔");
  }
  if (amount > 10000) {
    throw new Error(
      "Price is positve but don't be Greedy. Price exceed the maximum limit we offer 😔",
    );
  }
  return amount as Price;
}

// Factory function for Quantity
function createQuantity(value: number): Quantity {
  if (!Number.isInteger(value)) {
    throw new Error(
      "Quantity can not be a fraction or decimal must be a whole number 😔",
    );
  }
  if (value < 0) {
    throw new Error("Quantity being postive value can't be negative 😔");
  }
  if (value > 100) {
    throw new Error(
      "Quantity is positve but don't be Greedy. Quantity exceed the maximum limit we have in stock 😔",
    );
  }
  return value as Quantity;
}

// Factory function for Total
function createTotal(
  priceFactory: () => Price,
  quantityFactory: () => Quantity,
  total: number,
): Total {
  const price = priceFactory();
  const quantity = quantityFactory();

  const newtotal = price * quantity;
  if (total !== newtotal) {
    throw new Error(
      `Total is not correct. Expected ${newtotal} but got ${total} 😔`,
    );
  }
  if (newtotal > 100000) {
    throw new Error(
      "Total is too high. Please reduce the quantity or price 😔",
    );
  }
  return newtotal as Total;
}
