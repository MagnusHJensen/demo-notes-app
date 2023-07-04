import { LoggedError } from "@notes/core";
import { AppSyncResolverHandler } from "aws-lambda";

export function handlerWrapper(
  resolverName: string,
  handler: AppSyncResolverHandler<any, any>
) {
  return async (event: any, context: any, callback: any) => {
    try {
      const response = await handler(event, context, callback);
      return response;
    } catch (error) {
      if (!(error instanceof LoggedError)) {
        console.error(`A handler threw an unhandled error`, error);
      }
      throw error;
    }
  };
}
