import { ModuleId, ModuleTitle, ModuleStatus, XpReward } from "./types"

export type Module = {
  id: ModuleId
  title: ModuleTitle
  status: ModuleStatus
  xpReward: XpReward
}
