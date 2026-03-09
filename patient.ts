import { v4 as uuidv4 } from "uuid"

// PHASE 3 — Branded Types

export type PatientId   = string & { readonly __brand: unique symbol }
export type PatientName = string & { readonly __brand: unique symbol }
export type Age         = number & { readonly __brand: unique symbol }
export type RoomNumber  = number & { readonly __brand: unique symbol }
export type Hour        = number & { readonly __brand: unique symbol }

// PHASE 4 — Smart Constructors

export function makePatientId(): PatientId {
  return uuidv4() as PatientId
}

export function makePatientName(s: string): PatientName {
  if (s.trim() === "") throw new Error("Patient name cannot be empty.")
  return s as PatientName
}

export function makeAge(n: number): Age {
  if (n < 0 || n > 130) throw new Error(`Invalid age: ${n}`)
  return n as Age
}

export function makeRoomNumber(n: number): RoomNumber {
  if (n < 1 || n > 500) throw new Error(`Invalid room number: ${n}. Must be between 1 and 500.`)
  return n as RoomNumber
}

export function makeHour(n: number): Hour {
  if (n < 0 || n > 23) throw new Error(`Invalid hour: ${n}`)
  return n as Hour
}

// PHASE 5 — Value Object (VisitWindow)

export type VisitWindow = {
  readonly start: Hour
  readonly end: Hour
}

export function makeVisitWindow(start: number, end: number): VisitWindow {
  if (end <= start) throw new Error("End time must be after start time.")
  return { start: makeHour(start), end: makeHour(end) }
}

export function isWithinVisitWindow(window: VisitWindow, current: number): boolean {
  return current >= window.start && current < window.end
}

export function withNewEndTime(window: VisitWindow, newEnd: number): VisitWindow {
  return makeVisitWindow(window.start, newEnd)
}

// PHASE 6 — Entity

export type PatientStatus = "registered" | "checked-in" | "discharged"

export type PatientEvent =
  | { type: "PatientCheckedIn"; payload: { id: PatientId; name: PatientName; roomNumber: RoomNumber } }

export type Observer = (event: PatientEvent) => void

export type PatientEntity = {
  readonly id: PatientId
  readonly name: PatientName
  readonly age: Age
  readonly roomNumber: RoomNumber
  readonly status: PatientStatus
}

export type ObservablePatient = PatientEntity & { readonly observers: Observer[] }

export function createPatient(name: string, age: number, roomNumber: number): ObservablePatient {
  return {
    id: makePatientId(),
    name: makePatientName(name),
    age: makeAge(age),
    roomNumber: makeRoomNumber(roomNumber),
    status: "registered",
    observers: [],
  }
}

export function checkInPatient(patient: ObservablePatient): ObservablePatient {
  if (patient.status !== "registered") throw new Error("Patient must be registered before checking in.")
  const next: ObservablePatient = { ...patient, status: "checked-in" }
  notify(next, {
    type: "PatientCheckedIn",
    payload: { id: patient.id, name: patient.name, roomNumber: patient.roomNumber },
  })
  return next
}

export function dischargePatient(patient: ObservablePatient): ObservablePatient {
  if (patient.status !== "checked-in") throw new Error("Patient must be checked in before being discharged.")
  return { ...patient, status: "discharged" }
}

// PHASE 7 — Observer helpers

export function subscribe(patient: ObservablePatient, obs: Observer): ObservablePatient {
  return { ...patient, observers: [...patient.observers, obs] }
}

export function unsubscribe(patient: ObservablePatient, obs: Observer): ObservablePatient {
  return { ...patient, observers: patient.observers.filter(o => o !== obs) }
}

export function notify(patient: ObservablePatient, event: PatientEvent): void {
  patient.observers.forEach(o => o(event))
}