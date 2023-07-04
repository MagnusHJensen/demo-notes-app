import { NoteService } from "@notes/core";
import { Note, NoteInput } from "@notes/graphql";

export async function updateNote(id: string, note: NoteInput): Promise<string> {
  const noteService = NoteService.getInstance();

  return await noteService.update(id, note);
}
