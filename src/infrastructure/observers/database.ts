import { Observer } from "../../domain/events/events.ts";

const portfolioObserver: Observer = (event) => {
  if (event.type === "ProjectDeployed") {
    console.log("Adding project to portfolio index:", event.projectId);
  }
};
