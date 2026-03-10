import { v4 as uuidv4 } from "uuid"

type BookId     = string & { readonly __brand: unique symbol }
type BookTitle  = string & { readonly __brand: unique symbol }
type AuthorName = string & { readonly __brand: unique symbol }
type ISBN       = string & { readonly __brand: unique symbol }
type CopyCount  = number & { readonly __brand: unique symbol }
type LoanDays   = number & { readonly __brand: unique symbol }

type Book = {
  readonly id: BookId
  readonly title: BookTitle
  readonly author: AuthorName
  readonly isbn: ISBN
  readonly totalCopies: CopyCount
  readonly availableCopies: CopyCount
}

type BookAddedEvent = {
  readonly type: "BookAdded"
  readonly bookId: BookId
  readonly title: BookTitle
  readonly author: AuthorName
  readonly isbn: ISBN
  readonly copies: CopyCount
}

type BookBorrowedEvent = {
  readonly type: "BookBorrowed"
  readonly bookId: BookId
  readonly title: BookTitle
  readonly remainingCopies: CopyCount
  readonly loanDays: LoanDays
}

type BookReturnedEvent = {
  readonly type: "BookReturned"
  readonly bookId: BookId
  readonly title: BookTitle
  readonly availableCopies: CopyCount
}

type BookOutOfStockEvent = {
  readonly type: "BookOutOfStock"
  readonly bookId: BookId
  readonly title: BookTitle
}

type DomainEvent =
  | BookAddedEvent
  | BookBorrowedEvent
  | BookReturnedEvent
  | BookOutOfStockEvent

type Observer = (event: DomainEvent) => void

const sendEmailMock: Observer = (event) => {
  switch (event.type) {
    case "BookAdded":
      console.log(`[Email] New arrival: "${event.title}" by ${event.author} — ${event.copies} copies added.`)
      break
    case "BookBorrowed":
      console.log(`[Email] Loan confirmed: "${event.title}" for ${event.loanDays} days. Remaining: ${event.remainingCopies}.`)
      break
    case "BookReturned":
      console.log(`[Email] Return received: "${event.title}". Available copies: ${event.availableCopies}.`)
      break
    case "BookOutOfStock":
      console.log(`[Email] Out of stock: all copies of "${event.title}" are on loan.`)
      break
  }
}

const saveToDatabaseMock: Observer = (event) => {
  const record = { timestamp: new Date().toISOString(), ...event }
  console.log(`[Database] Event persisted: ${JSON.stringify(record)}`)
}

const sendNotificationMock: Observer = (event) => {
  if (event.type === "BookOutOfStock") {
    console.log(`[Notification] Waitlist members notified: "${event.title}" is fully on loan.`)
  }
  if (event.type === "BookReturned") {
    console.log(`[Notification] "${event.title}" is back — notifying members who requested it.`)
  }
}

const EMITTER_NAME = "LibraryDomainEmitter"

const observers: Observer[] = []
observers.push(sendEmailMock)
observers.push(saveToDatabaseMock)
observers.push(sendNotificationMock)

function emit(event: DomainEvent): void {
  console.log(`\n[${EMITTER_NAME}] Emitting -> ${event.type}`)
  observers.forEach((observer) => observer(event))
}

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

console.log("=".repeat(60))
console.log("Library DDD + Observer Pattern")
console.log("=".repeat(60))

console.log("\n-- TEST 1: Add a valid book")
try {
  const book1 = createBook(
    createBookTitle("The Pragmatic Programmer"),
    createAuthorName("Andrew Hunt"),
    createISBN("9780135957059"),
    createCopyCount(3)
  )
  console.log("Book created:", book1.title, "| copies:", book1.availableCopies)
  emit({ type: "BookAdded", bookId: book1.id, title: book1.title, author: book1.author, isbn: book1.isbn, copies: book1.totalCopies })
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unknown error")
}

console.log("\n-- TEST 2: Borrow until out of stock")
try {
  let book2 = createBook(
    createBookTitle("Clean Code"),
    createAuthorName("Robert C. Martin"),
    createISBN("9780132350884"),
    createCopyCount(2)
  )
  const loanDays = createLoanDays(14)

  book2 = borrowBook(book2)
  emit({ type: "BookBorrowed", bookId: book2.id, title: book2.title, remainingCopies: book2.availableCopies, loanDays })

  book2 = borrowBook(book2)
  emit({ type: "BookBorrowed", bookId: book2.id, title: book2.title, remainingCopies: book2.availableCopies, loanDays })
  emit({ type: "BookOutOfStock", bookId: book2.id, title: book2.title })

  book2 = borrowBook(book2)
} catch (error) {
  console.error("(expected):", error instanceof Error ? error.message : "Unknown error")
}

console.log("\n-- TEST 3: Return a book")
try {
  let book3 = createBook(
    createBookTitle("Design Patterns"),
    createAuthorName("Gang of Four"),
    createISBN("9780201633610"),
    createCopyCount(1)
  )
  book3 = borrowBook(book3)
  book3 = returnBook(book3)
  emit({ type: "BookReturned", bookId: book3.id, title: book3.title, availableCopies: book3.availableCopies })
  console.log("Returned:", book3.title, "| available:", book3.availableCopies)
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unknown error")
}

console.log("\n-- TEST 4: Negative copy count")
try {
  createBook(
    createBookTitle("Ghost Book"),
    createAuthorName("Nobody"),
    createISBN("9780000000002"),
    createCopyCount(-5)
  )
} catch (error) {
  console.error("(expected):", error instanceof Error ? error.message : "Unknown error")
}

console.log("\n-- TEST 5: Invalid ISBN")
try {
  createISBN("not-a-real-isbn")
} catch (error) {
  console.error("(expected):", error instanceof Error ? error.message : "Unknown error")
}

console.log("\n-- TEST 6: Empty book title")
try {
  createBookTitle("   ")
} catch (error) {
  console.error("(expected):", error instanceof Error ? error.message : "Unknown error")
}

console.log("\n-- TEST 7: Loan period of 0 days")
try {
  createLoanDays(0)
} catch (error) {
  console.error("(expected):", error instanceof Error ? error.message : "Unknown error")
}

console.log("\n-- TEST 8: Return a book never borrowed")
try {
  const book8 = createBook(
    createBookTitle("Refactoring"),
    createAuthorName("Martin Fowler"),
    createISBN("9780134757599"),
    createCopyCount(2)
  )
  returnBook(book8)
} catch (error) {
  console.error("(expected):", error instanceof Error ? error.message : "Unknown error")
}

console.log("\n" + "=".repeat(60))
console.log("All tests complete")
console.log("=".repeat(60))
