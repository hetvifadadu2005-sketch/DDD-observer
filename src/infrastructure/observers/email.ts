import { DomainEvent } from "../../domain/events/events.js"

export function sendEmailMock(event: DomainEvent): void {
	if (event.type === "OrderPlaced") {
		console.log(`[EMAIL] Confirmation sent for "${event.emitterName}" (order: ${event.orderId})`)
	}
	if (event.type === "OrderCancelled") {
		console.log(`[EMAIL] Cancellation notice sent for "${event.emitterName}"`)
	}
}
