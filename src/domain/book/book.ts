import {
  BookId,
  BookTitle,
  AuthorName,
  ISBN,
  CopyCount,
} from "./types"

// The Book entity type reflects the state of a library item.
// Identity is a UUID and does not change even when copies are borrowed/returned.

export type Book = {
  readonly id: BookId
  readonly title: BookTitle
  readonly author: AuthorName
  readonly isbn: ISBN
  readonly totalCopies: CopyCount
  readonly availableCopies: CopyCount
}

// re-export for convenience
export { BookId }
