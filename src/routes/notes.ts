import express from "express";
import { getNotesZodSchema } from "../zodSchemas";

const router = express.Router();

router.get("/", (req, res) => {
  const getNotesUser = getNotesZodSchema.parse(req.body);
  res.send(`Fetching notes for ${getNotesUser.username} token: ${getNotesUser.token}`);
});

router.get("/:noteId", (req, res) => {
  res.send(`Fetching note ${req.params.noteId}!`);
});

router.post("/", (req, res) => {
  res.send(`Saving new note: ${req.body}`);
});

router.put("/:noteId", (req, res) => {
  res.send(`Updating note ${req.params.noteId} with ${req.body}`);
});

export default router;
