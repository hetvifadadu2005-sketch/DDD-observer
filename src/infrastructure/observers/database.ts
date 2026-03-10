import { Observer } from "./observer"

export const saveToDatabaseMock: Observer = (event) => {
  const record = { timestamp: new Date().toISOString(), ...event }
  console.log(`[Database] Event persisted: ${JSON.stringify(record)}`)
}
