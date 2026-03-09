// Observer type + registry + emit() function

import type { DomainEvent } from "../../domain/events/events.js";

export type Observer = (event: DomainEvent) => void

export const observers: Observer[] = []

export function registerObserver(observer: Observer) {
  observers.push(observer)
}

export function emit(events: DomainEvent[]) {
  for (const event of events) {
    for (const observer of observers) {
      observer(event)
    }
  }
}
