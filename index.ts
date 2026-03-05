import { v4 as uuidv4 } from "uuid"

type OrderId = string & { readonly __brand: "OrderId" };
type Currency = "EUR" | "USD" | "GBP";
type Amount = number & { readonly __brand: "Amount" };

type Money = {
    readonly amount: Amount;
    readonly currency: Currency;
};

type OrderStatus = "OPEN" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

type OrderItem = {
    readonly name: string;
    readonly price: Money;
    readonly quantity: number;
};

type Order = {
    readonly id: OrderId;
    readonly createdAt: Date;
    readonly status: OrderStatus;
    readonly items: readonly OrderItem[];
    readonly total: Money;
};

function createMoney(amount: number, currency: Currency): Money {
    if (amount < 0) throw new Error("Amount cannot be negative!");
    if (!Number.isFinite(amount)) throw new Error("Amount must be valid!");
    return {
        amount: amount as Amount,
        currency
    };
}

function add(moneyA: Money, moneyB: Money): Money {
    if (moneyA.currency !== moneyB.currency) {
        throw new Error("Cannot add different currencies!");
    }
    return createMoney(moneyA.amount + moneyB.amount, moneyA.currency);
}

function multiply(money: Money, factor: number): Money {
    if (factor < 0) throw new Error("Factor must be positive!");
    return createMoney(money.amount * factor, money.currency);
}

function format(money: Money): string {
    return `${money.amount.toFixed(2)} ${money.currency}`;
}

function createOrder(currency: Currency): Order {
    return {
        id: uuidv4() as OrderId,
        createdAt: new Date(),
        status: "OPEN",
        items: [],
        total: createMoney(0, currency)
    };
}

function addItem(order: Order, itemName: string, price: Money, qty: number): Order {
    if (order.status !== "OPEN") {
        throw new Error(`Cannot add item to ${order.status} order!`);
    }
    if (qty <= 0) throw new Error("Quantity must be positive!");
    if (qty > 1000) throw new Error("You cannot order this many!");
    if (price.currency !== order.total.currency) {
        throw new Error("Item currency must match order currency!");
    }
    
    const itemTotal = multiply(price, qty);
    const newTotal = add(order.total, itemTotal);
    const newItem: OrderItem = { name: itemName, price, quantity: qty };
    
    return {
        ...order,
        items: [...order.items, newItem],
        total: newTotal
    };
}

function confirmOrder(order: Order): Order {
    if (order.items.length === 0) {
        throw new Error("Cannot confirm empty order!");
    }
    if (order.status !== "OPEN") {
        throw new Error(`Cannot confirm ${order.status} order!`);
    }
    return { ...order, status: "CONFIRMED" };
}

function completeOrder(order: Order): Order {
    if (order.status !== "CONFIRMED") {
        throw new Error("Can only complete CONFIRMED orders!");
    }
    return { ...order, status: "COMPLETED" };
}

function cancelOrder(order: Order): Order {
    if (order.status === "COMPLETED") {
        throw new Error("Cannot cancel COMPLETED order!");
    }
    return { ...order, status: "CANCELLED" };
}

const order1 = createOrder("EUR");
const order1_v2 = addItem(order1, "Burger", createMoney(12.99, "EUR"), 2);
const order1_v3 = addItem(order1_v2, "Fries", createMoney(5.99, "EUR"), 1);
const order1_v4 = confirmOrder(order1_v3);
const order1_v5 = completeOrder(order1_v4);

console.log(order1_v5);
console.log("Total:", format(order1_v5.total));