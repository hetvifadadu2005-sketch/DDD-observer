import { OrderId } from "../products/types.js"

export type OrderPlacedEvent = {
	type:        "OrderPlaced"
	orderId:     OrderId
	emitterName: string
}

export type OrderCancelledEvent = {
	type:        "OrderCancelled"
	orderId:     OrderId
	emitterName: string
}

export type ItemAddedEvent = {
	type:        "ItemAdded"
	orderId:     OrderId
	emitterName: string
	itemName:    string
}

export type DomainEvent = OrderPlacedEvent | OrderCancelledEvent | ItemAddedEvent
