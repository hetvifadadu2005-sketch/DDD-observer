export type Brand<K, T> = K & { __brand: T }

export type ModuleId = Brand<string, "mID">

export type ModuleTitle = Brand<string, "mTitle">

//no more incorect imputs
export type ModuleStatus = "passed" | "pending" | "failed"

export type XpReward = Brand<number, "xp">
