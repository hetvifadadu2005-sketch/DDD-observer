import { v4 as uuidv4 } from "uuid";

/*
 **
 ** avoid any "weird" number as input
 */

/* 1.  factory function  */
/*  a factory function creates a new object  */

/* 2.  constructor function  */
// OOP
// a constructor function creates a new object and sets its properties

// create a primitive obsessed type

// modify this code for testing !!
// this replicates user input


// Wiring + test run only

import {
    AccountId,
    AccountName,
    Balance,
    DailyLimit,
    PositiveAmount,
} from "./src/domain/bank/types.js";

import { BankAccount } from "./src/domain/bank/bank.js";


import {createAccountId, createAccountName, createBankAccount, createBalance, createDailyLimit, createPositiveAmount} from "./src/domain/bank/factories.js";

import { withdraw } from "./src/domain/bank/operations.js";
import { registerObserver, emit } from "./src/infrastructure/observers/observer.js"

import { smsObserver } from "./src/infrastructure/observers/sms.js"
import { auditObserver } from "./src/infrastructure/observers/audit.js"

// Register observers
registerObserver(smsObserver)
registerObserver(auditObserver)

// create and withdraw from account
// Create account
// const account = createBankAccount(createAccountId("acc-1"), createAccountName("John Doe"), createBalance(10000), createDailyLimit(12000))

// using try catch to handle errors from smart constructors and operations
try {
  // Create account with invalid name
  const account = createBankAccount(createAccountId("acc-1"), createAccountName("John Doe"), createBalance(10000), createDailyLimit(8000))

// using try catch to handle errors from smart constructors and operations
  // Withdraw from account
  const { account: updated, events } = withdraw(account, createPositiveAmount(6000))
  // Emit events
  emit(events)

  console.log("Updated account:", updated)

} catch (error) {
  if (error instanceof Error) {
	console.error(" ❌ Error creating account:", error.message)
  }
  else {
	console.error(" ❌ Unknown error ", error)
  }
}











