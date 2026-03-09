import {
    AccountId,
    AccountName,
    Balance,
    DailyLimit,
    PositiveAmount,
} from "../bank/types.js";

export type WithdrawalMadeEvent = {
  //type: "withdrawal-Made";
  readonly type: "withdrawal-Made";
  readonly accountId: AccountId;
  readonly accountName: AccountName;
  readonly amount: PositiveAmount;
  readonly balanceAfterWithdrawal: Balance;

};

export type LargeWithdrawalEvent = {
  readonly type: "Large-Withdrawal";
  readonly accountId: AccountId;
  readonly accountName: AccountName;
  readonly amount: PositiveAmount;
};

export type DomainEvent = WithdrawalMadeEvent | LargeWithdrawalEvent;
