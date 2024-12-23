import { NoteRow } from "../types";
import { dbQuery } from "../utils/db-query";
import { noteRowArrayZodSchema } from "../zodSchemas";

export const getNotesForUser = async (username: string): Promise<NoteRow[]> => {
  const result = await dbQuery(
    "SELECT * FROM notes WHERE username = $1",
    username
  );
  const parsedResult = noteRowArrayZodSchema.parse(result.rows);
  return parsedResult;
};

export const addNoteForUser = async (
  username: string,
  content: string
): Promise<boolean> => {
  const result = await dbQuery(
    "INSERT INTO notes (username, content) VALUES ($1, $2)",
    username,
    content
  );
  return result.rowCount !== null && result.rowCount > 0;
};
