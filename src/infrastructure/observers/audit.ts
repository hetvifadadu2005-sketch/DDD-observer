// Audit Log Observer (database mock)

import type { DomainEvent } from "../../domain/events/events.js"

export function auditObserver(event: DomainEvent) {
  if (event.type !== "withdrawal-Made") return

  console.log(
    `🛡️ Audit Log: ${event.accountName} there was a withdrawal of $${event.amount} | New balance: $${event.balanceAfterWithdrawal}`
  )
}
