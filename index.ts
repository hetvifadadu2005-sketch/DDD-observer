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

type Module = {
	id: string
	title: string
	status: string
}

type Course = {
	id: string
	title: string
	modules: Module[]
	completed: boolean
}

// modify this code for testing !!
// this replicates user input
const module1: Module = {
  id: uuidv4(), // generate a unique id for the order
  title: "Introduction",
  status: "passed",
}

const module2 : Module = {
  id: uuidv4(), // generate a unique id for the order
  title: "Intermediate",
  status: "passed",
}

const course1: Course = {
  id: uuidv4(), // generate a unique id for the order
  title: "TypeScript",
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
