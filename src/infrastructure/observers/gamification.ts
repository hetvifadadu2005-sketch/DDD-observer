import { Observer } from "../../domain/events/events"
import { CourseId } from "../../domain/course/types"
import { Student } from "../../domain/student/student"
import {addXp, hasBeenRewarded, markCourseRewarded} from "../../domain/student/factory"

type GamificationConfig = {
  getStudent: () => Student
  setStudent: (student: Student) => void
  xpPerCourse: number
}

export function createGamification(config: GamificationConfig): Observer {
  return (event) => {
    if (event.type !== "CourseCompleted") {
      return
    }

    const student = config.getStudent()
    const courseId = event.courseId as CourseId

    if (hasBeenRewarded(student, courseId)) {
      return
    }

    const rewardedStudent = markCourseRewarded(student, courseId)
    const updatedStudent = addXp(rewardedStudent, config.xpPerCourse)

    config.setStudent(updatedStudent)

    console.log(
      `Student awarded ${config.xpPerCourse} XP for completing "${event.courseTitle}". New rank: ${updatedStudent.rank}`,
    )
  }
}
