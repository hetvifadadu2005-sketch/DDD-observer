import { Observer } from "../../domain/events/events.ts";

const loggerObserver: Observer = (event) => {
  console.log("Event occured:", event.type);
};
