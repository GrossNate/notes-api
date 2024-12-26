import express from "express";
import { getNotesZodSchema, noteZodSchema, postNoteZodSchema } from "../zodSchemas";
import { addNoteForUser, getNotesForUser, deleteNote, updateNote } from "../models/notes";

const router = express.Router();

router.get("/", async (req, res) => {
  const getNotesUser = getNotesZodSchema.parse(req.cookies);
  const results = await getNotesForUser(getNotesUser.username);
  res.json(results);
});

router.get("/:noteId", (req, res) => {
  res.send(`Fetching note ${req.params.noteId}!`);
});

router.post("/", async (req, res) => {
  const {username} = getNotesZodSchema.parse(req.cookies);
  const postNotebody = postNoteZodSchema.parse(req.body);
  const result = await addNoteForUser(username, postNotebody.content);
  if (result.rowCount > 0) {
    res.status(201).json(result.rows[0]);
  } else {
    res.sendStatus(400);
  }
});

router.delete("/:noteId", async (req, res) => {
  const notesUser = getNotesZodSchema.parse(req.cookies);
  const result = await deleteNote(req.params.noteId, notesUser.username);
  if (result) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.put("/:noteId", async (req, res) => {
  const { username } = getNotesZodSchema.parse(req.cookies);
  const updateNoteBody = noteZodSchema.parse(req.body);
  const result = await updateNote(updateNoteBody, username);
  if (result.rowCount > 0) {
    res.status(201).json(result.rows[0]);
  } else {
    res.sendStatus(404);
  }
});

export default router;
