import { Construct } from "constructs";
import { Bucket, StackContext, Table } from "sst/constructs";

export function StorageStack({ stack, app }: StackContext) {
  const bucket = new Bucket(stack, "Uploads");

  const table = new Table(stack, "notes-notes", {
    fields: {
      id: "string",
    },
    primaryIndex: {
      partitionKey: "id",
    },
  });

  return { table, bucket };
}
