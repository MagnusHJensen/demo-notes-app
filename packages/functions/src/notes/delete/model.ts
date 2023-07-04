import { NoteService } from "@notes/core";
import { NoteFilterInput } from "@notes/graphql";

export async function deleteNote(filter: NoteFilterInput): Promise<boolean> {
  const noteService = NoteService.getInstance();
  await noteService.delete(filter.noteId);
  return true;
}
