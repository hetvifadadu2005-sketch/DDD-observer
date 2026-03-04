	import { v4 as uuidv4 } from "uuid"

	/*
	**
	** avoid any "weird" number as input
	*/

	/* 1.  factory function  */
	/*  a factory function creates a new object  */
	type Price = number & { readonly __brand: "EUR" }
	type Quantity = number & { readonly __brand: "Quantity" }

	type Order = {
		id: string;
		name: string;
		price: Price;
		quantity: Quantity;
		total: Price;
	};

	/* 2.  constructor function  */
	// OOP
	// a constructor function creates a new object and sets its properties
	function createPrice(cost: number): Price {
		if (cost < 0) throw new Error("Price cannot be negative!");
		return cost as Price;
	}

	function createQuantity(qty: number): Quantity {
    if (qty <= 0) throw new Error("Quantity must be positive!");
    if (qty > 1000) throw new Error("You cannot order this many!");
    if (!Number.isInteger(qty)) throw new Error("Quantity must be a whole number!");
    return qty as Quantity;
}

	// create a primitive obsessed type
function createOrder(name: string, price: Price, quantity: Quantity): Order {
    const calculatedTotal = price * quantity;
    return {
        id: uuidv4(),
        name,
        price,
        quantity: quantity,
        total: createPrice(calculatedTotal)
    };
}
	// modify this code for testing !!
	// this replicates user input
	//const orderOne = createOrder("broken", createPrice(-100), createQuantity(200000000));

	const orderTwo = createOrder("order one", createPrice(100), createQuantity(5))

	console.log(orderTwo)
