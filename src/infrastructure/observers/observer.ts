import { DomainEvent } from "../../domain/events/events"

export type Observer = (event: DomainEvent) => void

// a simple list; in a more sophisticated implementation we might allow subscribe/unsubscribe
const observers: Observer[] = []

export const EMITTER_NAME = "LibraryDomainEmitter"

export function subscribe(observer: Observer): void {
  observers.push(observer)
}

export function emit(event: DomainEvent): void {
  console.log(`\n[${EMITTER_NAME}] Emitting -> ${event.type}`)
  observers.forEach((obs) => obs(event))
}
