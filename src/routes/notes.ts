import express from "express";
import { getNotesZodSchema, postNoteZodSchema } from "../zodSchemas";
import { addNoteForUser, getNotesForUser, deleteNote } from "../models/notes";

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

router.put("/:noteId", (req, res) => {
  res.send(`Updating note ${req.params.noteId} with ${req.body}`);
});

export default router;
