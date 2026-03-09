# DDD Compliance Review

Overall, the project follows **Domain-Driven Design (DDD)** pretty well.
It uses strong typing, immutable objects, and separates domain logic from infrastructure, which is good practice. The code structure is clean and most of the important DDD ideas are implemented correctly.

However, there are a few small issues worth addressing.

---

## What's Working

- Branded types (`Price`, `Quantity`, `ItemName`, `OrderId`) are in place and prevent mixing up primitives
- Smart constructors validate all domain values at creation time — invalid values literally can't exist
- `Money`, `OrderLineItem`, and `Order` are all immutable (readonly fields, new objects returned instead of mutation)
- Factory functions are used instead of classes, keeping things FP-style
- Domain logic and infrastructure are cleanly separated — observers live outside the domain
- `DomainEvent` is a discriminated union, which makes event handling type-safe

---

## Issues Found

### Plain strings used where domain types should be

`Order.name`, `itemName` in events, and `Money.currency` are all typed as raw `string`.
The rest of the codebase wraps primitives in branded types to prevent invalid values — these three are inconsistent with that approach. Using proper domain types here would make the guarantees structural rather than just relying on validation inside a function.

### Mixed currencies aren't blocked early enough

Nothing stops a caller from adding a USD item and a EUR item to the same order.
The error only surfaces when `getTotal` is called and `addMoney` throws. By that point the damage is done — it would be better to reject the mismatch at `addItem` time, closer to where the mistake happens.

### `cancelOrder` may be too permissive

`placeOrder` only allows the transition `open → placed`.
But `cancelOrder` allows cancelling from any status, including `placed`.
Whether that's intentional depends on the business rule — if an order can't be cancelled after it's placed, the guard is missing. If it can, that's fine, but it should be documented.

### Events have to be triggered manually

Every state change in `index.ts` is followed by a manual `notify(observers, ...)` call.
There's nothing stopping a developer from forgetting one. The domain operation and its event notification are completely decoupled, which makes it easy to introduce silent bugs. Returning events alongside the new state from factory functions would make this harder to get wrong.

### Redundant TypeScript casts

`"placed" as OrderStatus` and `"cancelled" as OrderStatus` in `factories.ts` aren't needed — the string literals already match the union type. Small thing, but worth cleaning up.

---

## Summary

The design is solid. The main areas to improve are filling in the remaining type safety gaps, enforcing the currency rule earlier in the flow, and making event handling more reliable so it doesn't depend on the caller remembering to call `notify`.
