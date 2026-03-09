# Code Review Feedback — factories.ts

## Bug Fixes

### 1. Validation Order in `createBalanceAmount`
The original code checked `amount < 0` before checking `Number.isFinite()`, meaning values like `NaN` or `-Infinity` could slip through in the wrong order. Fixed by checking `isFinite` first.

### 2. Typo in Function Name
`createAccountHoldername` had a lowercase `n` — renamed to `createAccountHolderName` to match TypeScript naming conventions.

---

## Code Quality Improvements

### 3. Extracted Reusable Helper Functions
Added two shared helpers to eliminate repeated validation logic:
- `assertFinitePositive(value, label)` — used across deposit, withdraw, and transfer
- `assertMinimumBalance(accountType, balance, context)` — replaces duplicated minimum balance checks in `createAccount`, `withdrawMoney`, and `transferMoney`

### 4. Added Missing Validation
Deposit and transfer `amount` values were never validated. They can now no longer be negative or infinite.

### 5. Cleaner Error Messages
All error messages now have consistent punctuation and clearer descriptions.

### 6. Code Organisation
Added section comments to separate **Helpers**, **Factories**, and **Operations** for better readability.