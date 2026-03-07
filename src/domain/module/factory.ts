import { Module } from "./module"
import { ModuleId, ModuleTitle, ModuleStatus, XpReward } from "./types"
import { v4 as uuidv4 } from "uuid"

function makeId(id?: string): ModuleId {
    return (id ?? uuidv4()) as ModuleId
}

function makeTitle(title: string): ModuleTitle {
    if (title.trim() === "") {
        throw new Error("Title cannot be empty")
    }
    if (title.trim().length > 100) {
      throw new Error("Title should not exceed 100 characters")
    }
    const validTitlePattern = /^[A-Za-z0-9À-ÿ' -]+$/

    if (!validTitlePattern.test(title.trim())) {
        throw new Error(
        "Module title contains invalid characters. Only letters, numbers, spaces, apostrophes, and hyphens are allowed.",
        )
    }
    return title.trim() as ModuleTitle
}

function makeStatus(status: string): ModuleStatus {
  const validStatus: ModuleStatus[] = ["passed", "failed", "pending"]
  if (!validStatus.includes(status as ModuleStatus)) {
    throw new Error(
      `Invalid status: "${status}". Must be passed | failed | pending`,
    )
  }
    return status as ModuleStatus
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


export function createModule(title: string, status: string, xp: number, id?: string): Module {
  return {
    id: makeId(id),
    title: makeTitle(title),
    status: makeStatus(status),
    xpReward: makeXp(xp),
  }
}


export function passModule(module: Module): Module {
    if (module.status === "passed") {
      return module
    }
    return {
        ...module,
        status: "passed"
    }
}