import { ItemName, Money, OrderId, Quantity } from "./types.js"

export type OrderStatus = "open" | "placed" | "cancelled"

export type OrderLineItem = {
	readonly name:     ItemName
	readonly price:    Money
	readonly quantity: Quantity
}

export type Order = {
	readonly id:     OrderId
	readonly name:   string
	readonly status: OrderStatus
	readonly items:  OrderLineItem[]
}
