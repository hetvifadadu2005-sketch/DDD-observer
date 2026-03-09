import {
  AccountId,
  AccountHolderName,
  AccountType,
  BalanceAmount,
  TransactionAmount,
  TransactionId,
  MINIMUM_BALANCES,
} from "./types.js";
import { Account } from "./account.js";
import { v4 as uuidv4 } from "uuid";

// ── Helpers ──────────────────────────────────────────────────────────────────

function assertFinitePositive(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }
  if (value < 0) {
    throw new Error(`${label} cannot be negative. Received: ${value}`);
  }
}

function assertMinimumBalance(
  accountType: AccountType,
  balance: number,
  context: string
): void {
  const minimum = MINIMUM_BALANCES[accountType];
  if (balance < minimum) {
    throw new Error(
      `${context}: ${accountType} account requires a minimum balance of $${minimum}. ` +
        `Resulting balance would be $${balance}.`
    );
  }
}

// ── Factories ─────────────────────────────────────────────────────────────────

export function createAccountHolderName(name: string): AccountHolderName {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    throw new Error("Account holder name cannot be empty.");
  }
  if (trimmed.length < 2) {
    throw new Error("Account holder name must be at least 2 characters.");
  }

  return trimmed as AccountHolderName;
}

export function createBalanceAmount(amount: number): BalanceAmount {
  assertFinitePositive(amount, "Balance");
  const rounded = Math.round(amount * 100) / 100;
  return rounded as BalanceAmount;
}

export function createTransactionId(): TransactionId {
  return uuidv4() as TransactionId;
}

export function createAccount(
  holderName: AccountHolderName,
  accountType: AccountType,
  initialBalance: BalanceAmount
): Account {
  assertMinimumBalance(accountType, initialBalance, "Initial deposit");

  return {
    id: uuidv4() as AccountId,
    holderName,
    accountType,
    balance: initialBalance,
    createdAt: new Date(),
  };
}

// ── Operations ────────────────────────────────────────────────────────────────

export function depositMoney(
  account: Account,
  amount: TransactionAmount
): BalanceAmount {
  assertFinitePositive(amount, "Deposit amount");
  return createBalanceAmount(account.balance + amount);
}

export function withdrawMoney(
  account: Account,
  amount: TransactionAmount
): BalanceAmount {
  assertFinitePositive(amount, "Withdrawal amount");

  const newBalance = account.balance - amount;

  if (newBalance < 0) {
    throw new Error(
      `Insufficient funds. Available: $${account.balance}, Requested: $${amount}.`
    );
  }

  assertMinimumBalance(account.accountType, newBalance, "Withdrawal");

  return createBalanceAmount(newBalance);
}

export function transferMoney(
  fromAccount: Account,
  toAccount: Account,
  amount: TransactionAmount
): [BalanceAmount, BalanceAmount] {
  if (fromAccount.id === toAccount.id) {
    throw new Error("Cannot transfer money to the same account.");
  }

  assertFinitePositive(amount, "Transfer amount");

  const newSourceBalance = fromAccount.balance - amount;

  if (newSourceBalance < 0) {
    throw new Error(
      `Insufficient funds for transfer. Available: $${fromAccount.balance}, Requested: $${amount}.`
    );
  }

  assertMinimumBalance(fromAccount.accountType, newSourceBalance, "Transfer");

  const newDestBalance = toAccount.balance + amount;

  return [
    createBalanceAmount(newSourceBalance),
    createBalanceAmount(newDestBalance),
  ];
}