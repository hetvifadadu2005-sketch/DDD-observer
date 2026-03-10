import { v4 as uuidv4 } from "uuid"
import { ProductId, ProductName, PriceNumber, StockLevel, Quantity } from "./types"
import { Product } from "./product"

const VALID_NAMES = ["Shoes", "Shirt", "Pants"] as const

export function createPrice(value: number): PriceNumber {
  if (value <= 0) throw new Error("Price must be greater than 0")
  return value as PriceNumber
}

export function createStockLevel(value: number): StockLevel {
  if (value < 0) throw new Error("Stock cannot be negative")
  return value as StockLevel
}

export function createQuantity(value: number): Quantity {
  if (value <= 0) throw new Error("Quantity must be greater than 0")
  return value as Quantity
}

export function createProduct(
  name: string,
  price: PriceNumber,
  stock: StockLevel
): Product {
  if (!VALID_NAMES.includes(name as any)) {
    throw new Error("Name must be one of: Shoes, Shirt, Pants")
  }
  return {
    id: uuidv4() as ProductId,
    name: name as ProductName,
    price,
    stock,
  }
}

export function reduceStock(product: Product, qty: Quantity): StockLevel {
  const newLevel = product.stock - qty
  if (newLevel < 0) throw new Error("Not enough stock available")
  return newLevel as StockLevel
}

export function updatePrice(product: Product, newPrice: PriceNumber): Product {
  return { ...product, price: newPrice }
}
