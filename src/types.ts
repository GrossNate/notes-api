export interface IUser {
  username: string;
  hashPassword: string;
}

export function safeAssertString(val: unknown): asserts val is string {
  if (typeof val !== "string") {
    throw new Error("Unexpected type. Expected string.");
  }
}