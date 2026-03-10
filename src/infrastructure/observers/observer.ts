import { DomainEvent } from "../../domain/events/events"
import { sendEmailMock } from "./email"
import { saveToDatabaseMock, logToAuditMock } from "./database"

export type Observer = (event: DomainEvent) => void

export const observers: Observer[] = []

observers.push((event: DomainEvent) => {
  if (event.type === "ProductCreated") {
    sendEmailMock("admin@store.com", "New product added: " + event.name)
  }
  if (event.type === "StockReduced") {
    sendEmailMock("warehouse@store.com", "Stock reduced. New level: " + event.newLevel)
  }
  if (event.type === "PriceUpdated") {
    sendEmailMock("manager@store.com", "Price changed to: " + event.newPrice)
  }
})

observers.push((event: DomainEvent) => {
  saveToDatabaseMock(event)
})

observers.push((event: DomainEvent) => {
  logToAuditMock(event.type, event)
})

export function emit(event: DomainEvent): void {
  observers.forEach((observer) => observer(event))
}
