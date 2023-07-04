import {
  DynamoDB,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommand,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  ScanCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDB({});
const client = DynamoDBDocumentClient.from(dbClient, {
  marshallOptions: {
    convertClassInstanceToMap: true,
    convertEmptyValues: true,
    removeUndefinedValues: true,
  },
});

export async function getItem(input: GetItemCommandInput) {
  return await client.send(new GetItemCommand(input));
}

export async function putItem(input: PutItemCommandInput) {
  return await client.send(new PutItemCommand(input));
}

export async function scan(input: ScanCommandInput) {
  return await client.send(new ScanCommand(input));
}

export async function updateItem(input: UpdateItemCommandInput) {
  return await client.send(new UpdateItemCommand(input));
}

export async function deleteItem(input: DeleteCommandInput) {
  return await client.send(new DeleteCommand(input));
}
