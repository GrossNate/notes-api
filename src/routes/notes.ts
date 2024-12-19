import express  from "express";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Fetching notes!');
});

router.get('/:noteId', (req, res) => {
  res.send(`Fetching note ${req.params.noteId}!`);
});

router.post('/', (req, res) => {
  res.send(`Saving new note: ${req.body}`);
});

router.put('/:noteId', (req, res) => {
  res.send(`Updating note ${req.params.noteId} with ${req.body}`);
});

export default router;