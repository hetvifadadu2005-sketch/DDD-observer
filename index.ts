import { v4 as uuidv4 } from "uuid"

/*
 **
 ** avoid any "weird" number as input
 */

/* 1.  factory function  */
/*  a factory function creates a new object  */

/* 2.  constructor function  */
// OOP
// a constructor function creates a new object and sets its properties

type Brand<K, T> = K & { __brand: T }
type ModuleId = Brand<string, "mID">
type CourseId = Brand<string, "cID">
type ModuleTitle = Brand<string, "mTitle">
type CourseTitle = Brand<string, "cTitle">
type XpReward = Brand<number, "xp">
// no more incorrect inputs
type ModuleStatus = "passed" | "pending" | "failed"


type Module = {
	id: ModuleId
	title: ModuleTitle
	status: ModuleStatus
	xpReward: XpReward
}

type Course = {
	id: CourseId
	title: CourseTitle
	modules: Module[]
	completed: boolean
}

function createModuleId(): ModuleId {
  return uuidv4() as ModuleId
}

function createCourseId(): CourseId {
  return uuidv4() as CourseId
}

function createModuleTitle(title: string): ModuleTitle {
  if (title.trim() === "") throw new Error("ModuleTitle cannot be empty")
  return title as ModuleTitle
}

function createCourseTitle(title: string): CourseTitle {
	if (title.trim() === "") throw new Error("CourseTitle cannot be empty")
	return title as CourseTitle
}

function createXpReward(num: number): XpReward {
  if (num < 0)         throw new Error(`XpReward cannot be negative: ${num}`)
  if (!isFinite(num))  throw new Error(`XpReward must be a whole number: ${num}`)
  return num as XpReward
}

// modify this code for testing !!
// this replicates user input
const module1: Module = {
  id: createModuleId(), // generate a unique id for the order
  title: createModuleTitle("Intro"),
  status: "passed",
  xpReward: createXpReward(30)
}

const module2: Module = {
  id: createModuleId(), // generate a unique id for the order
  title: createModuleTitle("Intermediate"),
  status: "pending",
  xpReward: createXpReward(60),
}

const course1: Course = {
  id: createCourseId(), // generate a unique id for the order
  title: createCourseTitle("TypeScript"),
  modules: [module1, module2],
  completed: false,
}

function evaluateCompletion(courses: Course): void {
	const pass = course1.modules.every(m => m.status === "passed")
	if (pass) {
		courses.completed = true
	} 
}
evaluateCompletion(course1)

console.log(course1)