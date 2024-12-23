import { Client, QueryResult } from "pg";

// Note that the client is automatically using a number of variables set in
// the .env.dev/.env.prod files. We're not explicitly pulling them through
// the config file because we don't need to.

export const dbQuery = async (statement: string, ...parameters: string[]): Promise<QueryResult> => {
  const client = new Client();
  await client.connect();
  const result = await client.query(statement, parameters);
  await client.end();
  return result;
};

