// Smart constructors for the Bank domain

import {
    AccountId,
    AccountName,
    Balance,
    DailyLimit,
    PositiveAmount,
} from "./types.js";

import { BankAccount } from "./bank.js";


export function createAccountId(id: string): AccountId {
    return id as AccountId;
}

export function createAccountName(name: string): AccountName {
    if (name.trim() === "") {
        throw new Error("Account name cannot be empty 😔");
    }
    if (name.length > 50) {
        throw new Error("Account name cannot exceedcharacters limits 😔");
    }
    return name as AccountName;
}

export function createBalance(balanceValue: number): Balance {
    if (balanceValue < 0) {
        throw new Error("Balance cannot be negative whoops! 😔");
    }
    return balanceValue as Balance;
}

export function createDailyLimit(dailyLimitValue: number): DailyLimit {
    if (dailyLimitValue < 0) {
        throw new Error("Daily limit cannot be negative 😔");
    }
    if (dailyLimitValue > 10000) {
        throw new Error("Your account daily withdrawal limit has been reached 😔");
    }
    return dailyLimitValue as DailyLimit;
}
export function createPositiveAmount(positiveAmountValue: number): PositiveAmount {
    if (positiveAmountValue <= 0) {
        throw new Error("Amount must be a positive number whoops! 😔");
    }
    return positiveAmountValue as PositiveAmount;
}

// Factory function to create a BankAccount entity
export function createBankAccount(  
    id: AccountId,
    name: AccountName,
    balance: Balance,
    dailyLimit: DailyLimit,
): BankAccount {
    if (!id) {
        throw new Error("Account ID is required 😔");
    }
    if (!name) {
        throw new Error("Account name is required 😔");
    }
    return {
        id: id as AccountId,
        name: name as AccountName,
        balance,
        dailyLimit,
        withdrawToday: 0
    };
}
