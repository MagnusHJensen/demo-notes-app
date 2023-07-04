export class LoggedError extends Error {
  public static ERROR_NAME = "LoggedError";
  public readonly originalError: unknown;
  constructor(message: string, originalError?: unknown) {
    super(message);
    this.name = LoggedError.ERROR_NAME;
    this.originalError = originalError;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
