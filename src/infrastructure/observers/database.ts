export const saveToDatabaseMock = (data: unknown): void => {
  console.log("DB saved: " + JSON.stringify(data))
}

export const logToAuditMock = (action: string, data: unknown): void => {
  console.log("Audit log [" + action + "]: " + JSON.stringify(data))
}
