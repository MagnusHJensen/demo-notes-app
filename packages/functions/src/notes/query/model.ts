import { NoteService } from "@notes/core";
import { Note, NoteFilterInput } from "@notes/graphql";
import { Table } from "sst/node/table";

export async function listNotes(): Promise<Note[]> {
  const noteService = NoteService.getInstance();
  return await noteService.search();
}

export async function getNoteById(filter: NoteFilterInput): Promise<Note> {
  const noteService = NoteService.getInstance();

  return await noteService.get(filter.noteId);
}
