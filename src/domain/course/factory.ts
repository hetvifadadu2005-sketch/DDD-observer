import { Course } from "./course"
import { Module } from "../module/module"
import { CourseId, CourseTitle } from "./types"
import { v4 as uuidv4 } from "uuid"
import { passModule } from "../module/factories"
import { Observer, DomainEvent } from "../events/events"

function makeId(id?: string): CourseId {
  return (id ?? uuidv4()) as CourseId
}

function makeTitle(title: string): CourseTitle {
  if (title.trim() === "") {
    throw new Error("Title cannot be empty")
  }
  if (title.trim().length > 120) {
    throw new Error("Title should not exceed 100 characters")
  }
    const validTitlePattern = /^[A-Za-z0-9À-ÿ' -]+$/

    if (!validTitlePattern.test(title.trim())) {
        throw new Error(
            "Module title contains invalid characters. Only letters, numbers, spaces, apostrophes, and hyphens are allowed.",
          )
        }
  return title.trim() as CourseTitle
}


export function createCourse(title: string, modules: Module[]): Course {
  if (modules.length === 0) {
    throw new Error("Course should have at least one module")
  }

  return {
    id: makeId(),
    title: makeTitle(title),
    modules: [...modules],
    completed: false,
    observers: [],
  }
}

export function evaluateCompletion(courses: Course): Course {
    const pass = courses.modules.every((m) => m.status === "passed")
    if (!pass) return courses
    if (courses.completed) return courses
    const completed : Course = { ...courses, completed: true }
    notify(completed, { type: "CourseCompleted", courseId: completed.id, courseTitle: completed.title})
    return completed
    
}

export function subscribe(course: Course, observer: Observer): Course {
  return {
    ...course,
    observers: [...course.observers, observer],
  }
}

export function unsubscribe(course: Course, observer: Observer): Course {
  return {
    ...course,
    observers: course.observers.filter((o) => o !== observer),
  }
}

function notify(course: Course, event: DomainEvent): void {
  course.observers.forEach(observer => observer(event))
}

function completeModInCourse(course: Course, modId: string): Course{
    let found = false
    let passModTit = ""
    const updateModules = course.modules.map((module) => {
        if (module.id !== modId) {
            return module
        }
        found = true
        const update = passModule(module)
        passModTit = update.title
        return update
    })
    if (!found) {
        throw new Error(`Module with id "${modId}" was not found in the course`)
    }
    const updateCourse = { ...course, modules: updateModules }
    notify(updateCourse, {type: "ModulePassed", modId, moduleTitle: passModTit,
    })
    return evaluateCompletion(updateCourse)
}