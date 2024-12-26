import { Note, NoteRow } from "../types";
import { dbQuery } from "../utils/db-query";
import { addedRowZodSchema, noteRowArrayZodSchema } from "../zodSchemas";

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
): Promise<{rowCount: number, rows: NoteRow[]}> => {
  const result = await dbQuery(
    "INSERT INTO notes (username, content) VALUES ($1, $2) RETURNING *",
    username,
    content
  );
  const parsedResult = addedRowZodSchema.parse(result);
  return parsedResult;
};

export const deleteNote = async (noteId: string, username: string): Promise<boolean> => {
  const result = await dbQuery("DELETE FROM notes WHERE id = $1 AND username = $2", noteId, username);
  return result.rowCount === null || result.rowCount > 0;
};

export const updateNote = async (noteToUpdate: Note, username: string): Promise<{rowCount: number, rows: NoteRow[]}> => {
  const result = await dbQuery("UPDATE notes SET content = $1 WHERE id = $2 AND username = $3 RETURNING *", noteToUpdate.content, noteToUpdate.id, username);
  const parsedResult = addedRowZodSchema.parse(result);
  return parsedResult;

};
