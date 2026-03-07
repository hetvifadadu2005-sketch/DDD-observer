import { CourseId, CourseTitle } from "./types"
import { Module } from "../module/module"
import { Observer } from "../events/events"

export type Course = {
  readonly id: CourseId
  readonly title: CourseTitle
  readonly modules: readonly Module[]
  readonly completed: boolean
  readonly observers: readonly Observer[]
}
