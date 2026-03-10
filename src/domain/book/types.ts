// Branded types for the library/book domain

type BookId     = string & { readonly __brand: unique symbol }
type BookTitle  = string & { readonly __brand: unique symbol }
type AuthorName = string & { readonly __brand: unique symbol }
type ISBN       = string & { readonly __brand: unique symbol }
type CopyCount  = number & { readonly __brand: unique symbol }
type LoanDays   = number & { readonly __brand: unique symbol }

export {
  BookId,
  BookTitle,
  AuthorName,
  ISBN,
  CopyCount,
  LoanDays,
}
