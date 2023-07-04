import {
  MutationCreateNoteArgs,
  MutationDeleteNoteArgs,
  MutationUpdateNoteArgs,
  Note,
  QueryGetNoteByIdArgs,
} from "@notes/graphql";
import { AppSyncResolverHandler } from "aws-lambda";
import { getNoteById, listNotes } from "./query/model";
import { createNote } from "./create/model";
import { updateNote } from "./update/model";
import { deleteNote } from "./delete/model";

export const handler: AppSyncResolverHandler<
  | MutationCreateNoteArgs
  | MutationDeleteNoteArgs
  | MutationUpdateNoteArgs
  | QueryGetNoteByIdArgs,
  Note[] | Note | string | boolean
> = async (event) => {
  switch (event.info.fieldName) {
    case "listNotes":
      return await listNotes();
    case "getNoteById":
      const getNoteByIdArgs = event.arguments as QueryGetNoteByIdArgs;
      return await getNoteById(getNoteByIdArgs.filter);
    case "createNote":
      const createNoteArgs = event.arguments as MutationCreateNoteArgs;
      return await createNote(createNoteArgs.note);
    case "updateNote":
      const updateNoteArgs = event.arguments as MutationUpdateNoteArgs;
      return await updateNote(updateNoteArgs.id, updateNoteArgs.note);
    case "deleteNote":
      const deleteNoteArgs = event.arguments as MutationDeleteNoteArgs;
      return await deleteNote(deleteNoteArgs.filter);

    default: {
      throw new Error(
        `Unknown field, unable to resolve ${event.info.fieldName}`
      );
    }
  }
};
