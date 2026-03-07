import { createModule } from "./domain/module/factory"
import {completeModInCourse, createCourse, subscribe} from "./domain/course/factory"
import { createStudent } from "./domain/student/factory"
import { createCertificate } from "./infrastructure/observers/certificate"
import { createGamification } from "./infrastructure/observers/gamification"

const module1 = createModule("Introduction to Contracts", "pending", 20)
const module2 = createModule("Offer and Acceptance", "pending", 30)
const module3 = createModule("Remedies", "pending", 50)

let course = createCourse("Contract Law Basics", [module1, module2, module3])

let student = createStudent()

const certificateObserver = createCertificate()

const gamificationObserver = createGamification({
  getStudent: () => student,
  setStudent: (updatedStudent) => {
    student = updatedStudent
  },
  xpPerCourse: 100,
})

course = subscribe(course, certificateObserver)
course = subscribe(course, gamificationObserver)

course = completeModInCourse(course, module1.id)
course = completeModInCourse(course, module2.id)
course = completeModInCourse(course, module3.id)

console.log("Course completed:", course.completed)
console.log("Student XP:", student.xp)
console.log("Student rank:", student.rank)
console.log("Rewarded courses:", student.rewardedCourseId)
