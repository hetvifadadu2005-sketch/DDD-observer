import { CourseId } from "../course/types"
import { XpReward } from "../module/types"
import { Student } from "./student"
import { Rank, StudentId } from "./types"
import { v4 as uuidv4 } from "uuid"

function makeId(id?: string): StudentId {
  return (id ?? uuidv4()) as StudentId
}

function makeXp(xp: number): XpReward {
  if (xp < 0) {
    throw new Error(`XpReward cannot be negative: ${xp}`)
  }
  if (!Number.isInteger(xp)) {
    throw new Error(`XpReward must be a whole number: ${xp}`)
  }
  return xp as XpReward
}

function makeRank(rank: number): Rank {
  if (!Number.isInteger(rank)) {
    throw new Error(`Rank must be a whole number: ${rank}`)
  }
  if (rank < 1) throw new Error(`Rank must be at least 1: ${rank}`)
  return rank as Rank
}

function calcRank(xp: number): Rank {
  return makeRank(Math.floor(xp / 100) + 1)
}

export function createStudent(
  xp = 0,
  id?: string,
  rewardedCourseId: readonly CourseId[] = [],
): Student {
  return {
    id: makeId(id),
    xp: makeXp(xp),
    rank: calcRank(xp),
    rewardedCourseId: [...rewardedCourseId],
  }
}

export function addXp(student: Student, earned: number): Student {
  const newXp = (student.xp as number) + earned

  return {
    ...student,
    xp: makeXp(newXp),
    rank: calcRank(newXp),
  }
}

export function hasBeenRewarded(student: Student, courseId: CourseId): boolean {
  return student.rewardedCourseIds.includes(courseId)
}

export function markCourseRewarded(student: Student, courseId: CourseId): Student {
  if (hasBeenRewarded(student, courseId)) {
    return student
  }

  return {
    ...student,
    rewardedCourseId: [...student.rewardedCourseId, courseId],
  }
}