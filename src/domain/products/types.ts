export type Price    = number & { readonly __brand: "Price" }
export type Quantity = number & { readonly __brand: "Quantity" }
export type ItemName = string & { readonly __brand: "ItemName" }
export type OrderId  = string & { readonly __brand: "OrderId" }

export type Money = {
	readonly amount:   Price
	readonly currency: string
}

export function createPrice(raw: number): Price {
	if (raw <= 0) throw new Error(`Price must be greater than zero. Got: ${raw}`)
	return raw as Price
}

export function createQuantity(raw: number): Quantity {
	if (raw <= 0) throw new Error(`Quantity must be greater than zero. Got: ${raw}`)
	if (!Number.isInteger(raw)) throw new Error(`Quantity must be a whole number. Got: ${raw}`)
	return raw as Quantity
}

export function createItemName(raw: string): ItemName {
	if (raw.trim() === "") throw new Error("Item name cannot be blank.")
	return raw.trim() as ItemName
}

export function createMoney(amount: number, currency: string): Money {
	if (currency.trim().length !== 3) throw new Error(`Currency must be a 3-letter code. Got: "${currency}"`)
	return { amount: createPrice(amount), currency: currency.toUpperCase() }
}

export function addMoney(a: Money, b: Money): Money {
	if (a.currency !== b.currency) throw new Error(`Cannot add ${a.currency} and ${b.currency}`)
	return createMoney(a.amount + b.amount, a.currency)
}
