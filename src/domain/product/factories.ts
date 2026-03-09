import { v4 as uuidv4 } from "uuid";
import { Email, Money, Price, ProjectIs, Currency } from "./types.ts";
import { Project } from "./product.ts";
import { notify } from "./product.ts";

function createEmail(value: string): Email {
  if (!value.includes("@")) {
    throw new Error("Invalid email");
  }
  return value as Email;
}

function createPrice(value: number): Price {
  if (value <= 0) {
    throw new Error("Price must be positive");
  }
  return value as Price;
}

function createMoney(amount: number, currency: Currency): Money {
  return {
    amount: createPrice(amount),
    currency,
  };
}

function createProject(
  name: string,
  email: string,
  price: number,
  immersive: boolean,
): Project {
  const project: Project = {
    id: uuidv4() as ProjectId,
    clientName: name,
    clientEmail: createEmail(email),
    price: createMoney(price, "EUR"),
    immersive,
    status: "Draft",
    observers: [],
  };

  notify(project, {
    type: "ProjectCreated",
    projectId: project.id,
  });
  return project;
}
