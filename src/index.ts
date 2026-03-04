import { v4 as uuidv4 } from "uuid"
import { createModule } from "./domain/module/factory"
import { createCourse, evaluateCompletion } from "./domain/course/factory"


// modify this code for testing !!
// this replicates user input
const module1 = createModule("Introduction", "passed", 30)


const module2 = createModule("Intermediate", "passed", 40)

const course1 = createCourse("TypeScript", [module1, module2])

evaluateCompletion(course1)


console.log(course1)