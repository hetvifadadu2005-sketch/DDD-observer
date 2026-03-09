import { AccountId, AccountName, DailyLimit, PositiveAmount, Balance } from "./types.js";

import { BankAccount } from "./bank.js";
import { DomainEvent } from "../events/events.js";

export function withdraw(
  account: BankAccount,
  amount: PositiveAmount
): { account: BankAccount; events: DomainEvent[] } {
  if (amount > account.balance) {
    throw new Error(" Ohlaa!!!  Insufficient funds ")
  }

  if (account.withdrawToday + amount > account.dailyLimit) {
    throw new Error("Daily withdrawal limit exceeded")
  }

  const updated: BankAccount = {
    ...account,
    balance: (account.balance - amount) as BankAccount["balance"],
    withdrawToday: account.withdrawToday + amount
  }

  const events: DomainEvent[] = [
    {
      type: "withdrawal-Made",
      accountId: account.id,
      accountName: account.name,
      amount,
      balanceAfterWithdrawal: updated.balance
    }
  ]

  if (amount > 5000) {
    events.push({
      type: "Large-Withdrawal",
      accountId: account.id,
      accountName: account.name,
      amount
    })
  }

  return { account: updated, events }
}