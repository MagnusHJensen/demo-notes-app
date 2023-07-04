import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { Note } from "./model/note-model";

export function mapDynamoItemToNote(
  item: Record<string, AttributeValue>
): Note {
  const note = unmarshall(item);
  if (!isNote(note)) {
    throw new Error("Invalid note");
  }
  return note;
}

function isNote(note: Record<string, any>): note is Note {
  return note.id !== undefined && note.content !== undefined;
}

export function mapNoteToDynamoItem(
  note: Note
): Record<string, AttributeValue> {
  return marshall(note);
}
