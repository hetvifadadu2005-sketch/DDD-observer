import { BookId, BookTitle } from "../book/types"
import { CopyCount, LoanDays } from "../book/types"

// Domain events for the library domain. Discriminated union so observers can
// pattern-match on `event.type` with full type safety and exhaustiveness checking.

export type BookAddedEvent = {
  readonly type: "BookAdded"
  readonly bookId: BookId
  readonly title: BookTitle
  readonly author: string
  readonly isbn: string
  readonly copies: CopyCount
}

export type BookBorrowedEvent = {
  readonly type: "BookBorrowed"
  readonly bookId: BookId
  readonly title: BookTitle
  readonly remainingCopies: CopyCount
  readonly loanDays: LoanDays
}

export type BookReturnedEvent = {
  readonly type: "BookReturned"
  readonly bookId: BookId
  readonly title: BookTitle
  readonly availableCopies: CopyCount
}

export type BookOutOfStockEvent = {
  readonly type: "BookOutOfStock"
  readonly bookId: BookId
  readonly title: BookTitle
}

export type DomainEvent =
  | BookAddedEvent
  | BookBorrowedEvent
  | BookReturnedEvent
  | BookOutOfStockEvent
