import { handlerWrapper } from "src/shared/handler-wrapper";
import { handler } from "./resolver";

export const notesHandler = handlerWrapper("notes-handler", handler);
