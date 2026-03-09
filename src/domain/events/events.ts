import { ProjectId } from "../product/types.ts";

type ProjectEvent =
  | { type: "ProjectCreated"; projectId: ProjectId }
  | { type: "DesignApproved"; projectId: ProjectId }
  | { type: "BuildStarted"; projectId: ProjectId }
  | { type: "ProjectReadyToDeploy"; projectId: ProjectId }
  | { type: "ProjectDeployed"; projectId: ProjectId }
  | { type: "DiscoveryCompleted"; projectId: ProjectId };

type Observer = (event: ProjectEvent) => void;
