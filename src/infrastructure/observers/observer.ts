import { DomainEvent } from "../../domain/events/events.js"

export type Observer = (event: DomainEvent) => void

export function notify(observers: Observer[], event: DomainEvent): void {
	for (const observer of observers) {
		observer(event)
	}
}
