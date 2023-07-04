import { AppSyncApi, Stack, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { SSTConstruct } from "sst/constructs/Construct";

export function ApiStack({ stack, app }: StackContext) {
  const { table } = use(StorageStack);

  const api = createGraphQLApi(stack, [table]);

  addNotesResolver(stack, api);

  stack.addOutputs({
    ApiId: api.apiId,
    ApiUrl: api.url,
    ApiKey: api.cdk.graphqlApi.apiKey || "",
  });

  return { api };
}

function createGraphQLApi(stack: Stack, constructsToBind: SSTConstruct[]) {
  const api = new AppSyncApi(stack, "AppSyncApi", {
    schema: "./packages/shared/graphql/schema.graphql",
    defaults: {
      function: {
        bind: constructsToBind,
      },
    },
  });

  return api;
}

function addNotesResolver(stack: Stack, api: AppSyncApi) {
  const dataSource = {
    notes: "packages/functions/src/notes/index.notesHandler",
  };

  api.addDataSources(stack, dataSource);

  api.addResolvers(stack, {
    "Query listNotes": dataSource.notes,
    "Query getNoteById": dataSource.notes,
    "Mutation createNote": dataSource.notes,
    "Mutation updateNote": dataSource.notes,
    "Mutation deleteNote": dataSource.notes,
  });
}
