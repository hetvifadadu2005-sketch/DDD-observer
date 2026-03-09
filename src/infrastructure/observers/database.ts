import { DomainEvent } from "../../domain/events/events.js"

export function saveToDatabaseMock(event: DomainEvent): void {
	console.log(`[DB] Event saved: ${JSON.stringify(event)}`)
}
