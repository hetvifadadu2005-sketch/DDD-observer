import { v4 as uuidv4 } from "uuid"
import { addMoney, createItemName, createMoney, createQuantity, Money, OrderId } from "./types.js"
import { Order, OrderLineItem, OrderStatus } from "./order.js"

export function createOrder(name: string): Order {
	if (name.trim() === "") throw new Error("Order name cannot be blank.")
	return { id: uuidv4() as OrderId, name: name.trim(), status: "open", items: [] }
}

export function addItem(order: Order, itemName: string, amount: number, currency: string, qty: number): Order {
	if (order.status !== "open") throw new Error(`Cannot add items to a "${order.status}" order.`)
	const lineItem: OrderLineItem = {
		name:     createItemName(itemName),
		price:    createMoney(amount, currency),
		quantity: createQuantity(qty),
	}
	return { ...order, items: [...order.items, lineItem] }
}

export function placeOrder(order: Order): Order {
	if (order.status !== "open") throw new Error(`Cannot place a "${order.status}" order.`)
	if (order.items.length === 0) throw new Error("Cannot place an empty order.")
	return { ...order, status: "placed" as OrderStatus }
}

export function cancelOrder(order: Order): Order {
	if (order.status === "cancelled") throw new Error("Order is already cancelled.")
	return { ...order, status: "cancelled" as OrderStatus }
}

export function getTotal(order: Order): Money {
	if (order.items.length === 0) throw new Error("Order has no items.")
	let total = createMoney(order.items[0].price.amount * order.items[0].quantity, order.items[0].price.currency)
	for (let i = 1; i < order.items.length; i++) {
		const item = order.items[i]
		total = addMoney(total, createMoney(item.price.amount * item.quantity, item.price.currency))
	}
	return total
}
