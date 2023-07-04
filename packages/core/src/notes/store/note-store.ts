import { Table } from "sst/node/table";
import { deleteItem, getItem, putItem, scan } from "../../dynamodb";
import { Note } from "../model/note-model";
import { mapDynamoItemToNote, mapNoteToDynamoItem } from "../mapper";

export class NoteStore {
  public static getInstance(): NoteStore {
    if (!NoteStore.INSTANCE) {
      NoteStore.INSTANCE = new NoteStore();
    }
    return NoteStore.INSTANCE;
  }
  private static INSTANCE: NoteStore;

  private constructor() {}

  async search(): Promise<Note[]> {
    const result = await scan({
      TableName: Table["notes-notes"].tableName,
    });

    return result.Items?.map((item) => mapDynamoItemToNote(item)) ?? [];
  }

  async get(id: string): Promise<Note | null> {
    const result = await getItem({
      TableName: Table["notes-notes"].tableName,
      Key: {
        id: { S: id },
      },
    });

    if (!result.Item) {
      return null;
    }

    return mapDynamoItemToNote(result.Item);
  }

  async put(note: Note) {
    const mappedNote = mapNoteToDynamoItem(note);
    console.log(mappedNote);
    await putItem({
      TableName: Table["notes-notes"].tableName,
      Item: mappedNote,
    });
  }

  async delete(id: string) {
    await deleteItem({
      TableName: Table["notes-notes"].tableName,
      Key: {
        id,
      },
    });
  }
}
