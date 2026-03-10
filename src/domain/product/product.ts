import { ProductId, ProductName, PriceNumber, StockLevel } from "./types"

export type Product = {
  id: ProductId
  name: ProductName
  price: PriceNumber
  stock: StockLevel
}
