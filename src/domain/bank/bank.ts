// BankAccount entity type

import {
    AccountId,
    AccountName,
    Balance,
    DailyLimit,
    PositiveAmount,
} from "./types.js";

export type BankAccount = {
    id: AccountId;
    name: AccountName;
    balance: Balance;
    dailyLimit: DailyLimit;
    withdrawToday: number;
};