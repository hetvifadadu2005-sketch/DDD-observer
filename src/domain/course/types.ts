export type Brand<K, T> = K & {readonly __brand: T }

export type CourseId = Brand<string, "cID">

export type CourseTitle = Brand<string, "cTitle">
