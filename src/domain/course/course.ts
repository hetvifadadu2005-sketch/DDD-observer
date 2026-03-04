import { CourseId, CourseTitle } from "./types"
import { Module } from "../module/module"

export type Course = {
  id: CourseId
  title: CourseTitle
  modules: Module[]
  completed: boolean
}
