export type Brand<K, T> = K & {readonly __brand: T }

export type StudentId = Brand<string, "sID">
export type Rank = Brand<number, "rank">
