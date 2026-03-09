import { v4 as uuidv4 } from "uuid"
import { createPrice, createQuantity, createItemName, createMoney, addMoney } from "./src/domain/products/types.js"
import { createOrder, addItem, placeOrder, cancelOrder, getTotal } from "./src/domain/products/factories.js"
import { Observer, notify } from "./src/infrastructure/observers/observer.js"
import { sendEmailMock } from "./src/infrastructure/observers/email.js"
import { saveToDatabaseMock } from "./src/infrastructure/observers/database.js"

// before smart constructors: a plain object with no rules, bad values go unnoticed
const orderOne = {
	id: uuidv4(),
	name: "order one",
	price: -100,
	quantity: 200000000,
	total: 999999,
}

console.log("dumb object:", orderOne)
console.log("")

// register who gets notified when something happens
const observers: Observer[] = []
observers.push(sendEmailMock)
observers.push(saveToDatabaseMock)

// place a valid order for Table 3 and watch the observers react
let myOrder = createOrder("Table 3")

myOrder = addItem(myOrder, "Burger", 12.50, "USD", 2)
notify(observers, { type: "ItemAdded", orderId: myOrder.id, emitterName: myOrder.name, itemName: "Burger" })

myOrder = addItem(myOrder, "Fries", 3.00, "USD", 3)
notify(observers, { type: "ItemAdded", orderId: myOrder.id, emitterName: myOrder.name, itemName: "Fries" })

myOrder = placeOrder(myOrder)
notify(observers, { type: "OrderPlaced", orderId: myOrder.id, emitterName: myOrder.name })

console.log("total:", getTotal(myOrder))
console.log("")

myOrder = cancelOrder(myOrder)
notify(observers, { type: "OrderCancelled", orderId: myOrder.id, emitterName: myOrder.name })

console.log("")

// a second independent order from a different emitter
let barOrder = createOrder("Bar Tab 7")

barOrder = addItem(barOrder, "Beer", 6.00, "USD", 4)
notify(observers, { type: "ItemAdded", orderId: barOrder.id, emitterName: barOrder.name, itemName: "Beer" })

barOrder = placeOrder(barOrder)
notify(observers, { type: "OrderPlaced", orderId: barOrder.id, emitterName: barOrder.name })

console.log("bar total:", getTotal(barOrder))
console.log("")

// try feeding bad data — every case is caught, nothing crashes
console.log("-- Testing invalid inputs --")

try {
	createPrice(-5)
} catch (error) {
	if (error instanceof Error) console.error(error.message)
}

try {
	createPrice(0)
} catch (error) {
	if (error instanceof Error) console.error(error.message)
}

try {
	createQuantity(1.5)
} catch (error) {
	if (error instanceof Error) console.error(error.message)
}

try {
	createItemName("   ")
} catch (error) {
	if (error instanceof Error) console.error(error.message)
}

try {
	createMoney(10, "US")
} catch (error) {
	if (error instanceof Error) console.error(error.message)
}

try {
	addMoney(createMoney(10, "USD"), createMoney(5, "EUR"))
} catch (error) {
	if (error instanceof Error) console.error(error.message)
}

try {
	addItem(myOrder, "Soda", 2.00, "USD", 1)
} catch (error) {
	if (error instanceof Error) console.error(error.message)
}

try {
	cancelOrder(myOrder)
} catch (error) {
	if (error instanceof Error) console.error(error.message)
}

try {
	createOrder("")
} catch (error) {
	if (error instanceof Error) console.error(error.message)
}
