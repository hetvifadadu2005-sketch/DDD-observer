import { ProductId, ProductName, PriceNumber, StockLevel, Quantity } from "../product/types"

export type ProductCreatedEvent = {
  type: "ProductCreated"
  productId: ProductId
  name: ProductName
  price: PriceNumber
}

export type StockReducedEvent = {
  type: "StockReduced"
  productId: ProductId
  newLevel: StockLevel
  quantity: Quantity
}

export type PriceUpdatedEvent = {
  type: "PriceUpdated"
  productId: ProductId
  newPrice: PriceNumber
}

export type DomainEvent =
  | ProductCreatedEvent
  | StockReducedEvent
  | PriceUpdatedEvent
