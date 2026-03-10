import { Book, BookId } from "./book"
import {
  BookTitle,
  AuthorName,
  ISBN,
  CopyCount,
  LoanDays,
} from "./types"
import { v4 as uuidv4 } from "uuid"

// Smart constructors for the branded primitives
function createBookTitle(value: string): BookTitle {
  const trimmed = value.trim()
  if (!trimmed) throw new Error("Book title cannot be empty")
  if (trimmed.length > 200) throw new Error("Book title too long (max 200 chars)")
  return trimmed as BookTitle
}

function createAuthorName(value: string): AuthorName {
  const trimmed = value.trim()
  if (!trimmed) throw new Error("Author name cannot be empty")
  if (trimmed.length < 2) throw new Error("Author name too short (min 2 chars)")
  return trimmed as AuthorName
}

function createISBN(value: string): ISBN {
  const stripped = value.replace(/-/g, "")
  if (!/^\d{10}(\d{3})?$/.test(stripped)) {
    throw new Error(`Invalid ISBN: "${value}" — must be 10 or 13 digits`)
  }
  return stripped as ISBN
}

function createCopyCount(value: number): CopyCount {
  if (!Number.isInteger(value)) throw new Error("Copy count must be an integer")
  if (value < 0) throw new Error("Copy count cannot be negative")
  if (value > 10_000) throw new Error("Copy count exceeds maximum (10 000)")
  return value as CopyCount
}

function createLoanDays(value: number): LoanDays {
  if (!Number.isInteger(value)) throw new Error("Loan days must be an integer")
  if (value < 1) throw new Error("Loan period must be at least 1 day")
  if (value > 90) throw new Error("Loan period cannot exceed 90 days")
  return value as LoanDays
}

// Entity factory
function createBook(
  title: BookTitle,
  author: AuthorName,
  isbn: ISBN,
  copies: CopyCount
): Book {
  if (copies < 1) throw new Error("A book must have at least 1 copy to be added")
  return {
    id: uuidv4() as BookId,
    title,
    author,
    isbn,
    totalCopies: copies,
    availableCopies: copies,
  }
}

function borrowBook(book: Book): Book {
  if (book.availableCopies <= 0) {
    throw new Error(`No available copies of "${book.title}" to borrow`)
  }
  return { ...book, availableCopies: createCopyCount(book.availableCopies - 1) }
}

function returnBook(book: Book): Book {
  if (book.availableCopies >= book.totalCopies) {
    throw new Error(`All copies of "${book.title}" are already in the library`)
  }
  return { ...book, availableCopies: createCopyCount(book.availableCopies + 1) }
}

export {
  createBookTitle,
  createAuthorName,
  createISBN,
  createCopyCount,
  createLoanDays,
  createBook,
  borrowBook,
  returnBook,
}
