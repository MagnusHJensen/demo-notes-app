import { Note, NoteUpdate } from "../model/note-model";
import { NoteStore } from "../store/note-store";

export class NoteService {
  // Make singleton instance
  public static getInstance(): NoteService {
    if (!NoteService.instance) {
      NoteService.instance = new NoteService();
    }
    return NoteService.instance;
  }
  private static instance: NoteService;

  private constructor() {}

  async search(): Promise<Note[]> {
    return await NoteStore.getInstance().search();
  }

  async get(id: string): Promise<Note> {
    const noteStore = NoteStore.getInstance();
    const note = await noteStore.get(id);

    if (!note) {
      throw new Error(`Note with id ${id} not found`);
    }

    return note;
  }

  async put(note: Note) {
    await NoteStore.getInstance().put(note);
  }

  async delete(id: string) {
    const note = await this.get(id);
    await NoteStore.getInstance().delete(note.id);
  }

  async update(id: string, update: NoteUpdate) {
    const existingNote = await this.get(id);
    const updatedNote = {
      ...existingNote,
      ...update,
    };
    await this.put(updatedNote);

    return updatedNote.id;
  }
}
