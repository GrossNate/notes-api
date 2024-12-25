import express from "express";
import { getNotesZodSchema, postNoteZodSchema } from "../zodSchemas";
import { addNoteForUser, getNotesForUser } from "../models/notes";

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
  const postNotebody = postNoteZodSchema.parse(req.body);
  const noteAdded = await addNoteForUser(postNotebody.username, postNotebody.content);
  res.sendStatus(noteAdded ? 201 : 400);
});

router.put("/:noteId", (req, res) => {
  res.send(`Updating note ${req.params.noteId} with ${req.body}`);
});

export default router;
