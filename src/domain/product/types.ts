export type ProductId   = string & { readonly __brand: "ProductId" }
export type ProductName = string & { readonly __brand: "ProductName" }
export type PriceNumber = number & { readonly __brand: "PriceNumber" }
export type StockLevel  = number & { readonly __brand: "StockLevel" }
export type Quantity    = number & { readonly __brand: "Quantity" }
