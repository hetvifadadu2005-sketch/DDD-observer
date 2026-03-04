import { v4 as uuidv4 } from "uuid"

/*
 **
 ** avoid any "weird" number as input
 */

/* 1.  factory function  */
/*  a factory function creates a new object  */
type Price = number & { readonly __brand: "EUR" }
type quantity = number & { readonly __brand: quantity }

type Order = {
    id: string;
    name: string;
	price: Price;
	quantity: quantity;
	total: Price;
};

/* 2.  constructor function  */
// OOP
// a constructor function creates a new object and sets its properties
function createPrice(cost: number): Price {
	if (cost < 0) throw new Error("Price cannot be negative!");
	return cost as Price;
}

function createQuantity(quantity: number): quantity {
	if (quantity > 1000) throw new Error("You cannot order this many!");
	return quantity as quantity;
}

// create a primitive obsessed type

// modify this code for testing !!
// this replicates user input
const orderOne: Order = {
	id: uuidv4(), // generate a unique id for the order
	name: "order one",
	price: createPrice(-100),
	quantity: createQuantity(200000000),
	total: createPrice(456465465465465400),
}

const orderTwo: Order = {
	id: uuidv4(),
	name: "order two",
	price: createPrice(100),
	quantity: createQuantity(5),
	total: createPrice(500)
}

console.log(orderOne, orderTwo)
