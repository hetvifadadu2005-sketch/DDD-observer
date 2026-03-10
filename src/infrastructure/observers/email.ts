import { Observer } from "./observer"

export const sendEmailMock: Observer = (event) => {
  switch (event.type) {
    case "BookAdded":
      console.log(
        `[Email] New arrival: "${event.title}" by ${event.author} — ${event.copies} copies added.`
      )
      break
    case "BookBorrowed":
      console.log(
        `[Email] Loan confirmed: "${event.title}" for ${event.loanDays} days. Remaining: ${event.remainingCopies}.`
      )
      break
    case "BookReturned":
      console.log(
        `[Email] Return received: "${event.title}". Available copies: ${event.availableCopies}.`
      )
      break
    case "BookOutOfStock":
      console.log(
        `[Email] Out of stock: all copies of "${event.title}" are on loan.`
      )
      break
  }
}
