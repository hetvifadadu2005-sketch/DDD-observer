import { XpReward } from "../module/types";
import { StudentId, Rank } from "./types";
import { CourseId } from "../course/types"

export type Student = {
    readonly id: StudentId
    readonly xp: XpReward
    readonly rank: Rank
    readonly rewardedCourseId: readonly CourseId[]
}