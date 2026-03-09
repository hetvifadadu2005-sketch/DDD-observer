import { ProjectId, Email, Money } from "./types.ts";
import { Observer, ProjectEvent } from "../events/events.ts";

type Project = {
  id: ProjectId;
  clientName: string;
  clientEmail: Email;
  price: Money;
  immersive: boolean;
  status: "Draft" | "DesignApproved" | "Build" | "Deployed";
  observers: Observer[];
};

function notify(project: Project, event: ProjectEvent) {
  project.observers.forEach((obs) => obs(event));
}

function subscribe(project: Project, observer: Observer): Project {
  return {
    ...project,
    observers: [...project.observers, observer],
  };
}

function unsubscribe(project: Project, observer: Observer): Project {
  return {
    ...project,
    observers: project.observers.filter((obs) => obs !== observer),
  };
}

function deployProject(project: Project): Project {
  if (project.status !== "Build") {
    throw new Error("Project must be built before deployment");
  }

  const updatedProject: Project = {
    ...project,
    status: "Deployed",
  };

  notify(updatedProject, {
    type: "ProjectDeployed",
    projectId: updatedProject.id,
  });

  return updatedProject;
}
