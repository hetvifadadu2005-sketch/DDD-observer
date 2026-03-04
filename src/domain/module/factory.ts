import { Module } from "./module"
import { ModuleId, ModuleTitle, ModuleStatus, XpReward } from "./types"
import { v4 as uuidv4 } from "uuid"

export function createModule(title: string, status: string, xp: number, id?: string): Module {
  const validStatuses: ModuleStatus[] = ["passed", "failed", "pending"]
  if (!validStatuses.includes(status as ModuleStatus)) {
    throw new Error(
      `Invalid status: "${status}". Must be passed | failed | pending`,
    )
  }
  if (xp < 0) {
    throw new Error(`XpReward cannot be negative: ${xp}`)
  }
  if (!Number.isInteger(xp)) {
    throw new Error(`XpReward must be a whole number: ${xp}`)
  }
  if (title.trim() === "") {
    throw new Error("Title cannot be empty")
  }

  return {
    id: (id ?? uuidv4()) as ModuleId,
    title: title as ModuleTitle,
    status: status as ModuleStatus,
    xpReward: xp as XpReward,
  }
}


export function completeModule(module: Module): Module {
    if (module.status === "passed") {
      throw new Error("Module is already passed")
    }
    return createModule(
      module.title as string,
      "passed",
      module.xp as number,
      module.id as string,
    )
}