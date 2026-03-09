// Bank domain branded types

export type AccountId = string & { readonly __brand: "AccountId" };
export type AccountName = string & { readonly __brand: "AccountName" };
export type Balance = number & { readonly __brand: "Balance" };
export type DailyLimit = number & { readonly __brand: "DailyLimit" };
export type PositiveAmount = number & { readonly __brand: "PositiveAmount" };


