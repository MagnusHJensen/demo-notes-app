import { NoteService } from "@notes/core";
import { Note, NoteInput } from "@notes/graphql";
import { randomUUID } from "crypto";

export async function createNote(input: NoteInput): Promise<Note> {
  const note: Note = {
    id: randomUUID(),
    content: input.content,
  };

  console.log(note);

  const noteService = NoteService.getInstance();
  await noteService.put(note);

  return note;
}
