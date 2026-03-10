import { createProduct, createPrice, createStockLevel, createQuantity, reduceStock, updatePrice } from "./domain/product/factories"
import { emit } from "./infrastructure/observers/observer"

console.log("=== TEST 1: Valid product creation ===")
try {
  const shirt = createProduct("Shirt", createPrice(49.99), createStockLevel(100))
  console.log("Created:", shirt)
  emit({ type: "ProductCreated", productId: shirt.id, name: shirt.name, price: shirt.price })
} catch (error) {
  console.error("ERROR:", error instanceof Error ? error.message : "Unknown error")
}

console.log("=== TEST 2: Reduce stock ===")
try {
  const shoes = createProduct("Shoes", createPrice(89.99), createStockLevel(50))
  const qty = createQuantity(5)
  const newStock = reduceStock(shoes, qty)
  console.log("New stock level:", newStock)
  emit({ type: "StockReduced", productId: shoes.id, newLevel: newStock, quantity: qty })
} catch (error) {
  console.error("ERROR:", error instanceof Error ? error.message : "Unknown error")
}

console.log("=== TEST 3: Update price ===")
try {
  const pants = createProduct("Pants", createPrice(39.99), createStockLevel(30))
  const updated = updatePrice(pants, createPrice(34.99))
  console.log("Updated product:", updated)
  emit({ type: "PriceUpdated", productId: updated.id, newPrice: updated.price })
} catch (error) {
  console.error("ERROR:", error instanceof Error ? error.message : "Unknown error")
}

console.log("=== TEST 4: INVALID negative price ===")
try {
  const bad = createProduct("Shirt", createPrice(-10), createStockLevel(20))
  console.log(bad)
} catch (error) {
  console.error("Caught:", error instanceof Error ? error.message : "Unknown error")
}

console.log("=== TEST 5: INVALID wrong product name ===")
try {
  const bad = createProduct("Hat", createPrice(25), createStockLevel(10))
  console.log(bad)
} catch (error) {
  console.error("Caught:", error instanceof Error ? error.message : "Unknown error")
}

console.log("=== TEST 6: INVALID reduce stock below zero ===")
try {
  const shoes = createProduct("Shoes", createPrice(15), createStockLevel(3))
  const qty = createQuantity(99)
  reduceStock(shoes, qty)
} catch (error) {
  console.error("Caught:", error instanceof Error ? error.message : "Unknown error")
}
