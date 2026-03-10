import { Observer } from "./observer"

export const sendNotificationMock: Observer = (event) => {
  if (event.type === "BookOutOfStock") {
    console.log(
      `[Notification] Waitlist members notified: "${event.title}" is fully on loan.`
    )
  }
  if (event.type === "BookReturned") {
    console.log(
      `[Notification] "${event.title}" is back — notifying members who requested it.`
    )
  }
}
