import { Observer } from "../../domain/events/events.ts";

const emailObserver: Observer = (event) => {
  if (event.type === "ProjectDeployed") {
    console.log(
      `[Email] Sending email to client of project ${event.projectId} about deployment`,
    );
  }
};
