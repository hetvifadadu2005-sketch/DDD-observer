// Fraud Detection Observer (SMS mock)

import type { DomainEvent } from "../../domain/events/events.js"

export function smsObserver(event: DomainEvent) {
  if (event.type !== "Large-Withdrawal") return

  console.log(
    `📱 SMS Verification: ${event.accountName} there was a large withdrawal of $${event.amount} on account ${event.accountId}`
  )
}
