import { Router } from "express";
import { User } from "../models/user";
import { userZodSchema } from "../zodSchemas";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { TOKEN_SECRET } from "../utils/config";
import { safeAssertString } from "../types";

const router = Router();

router.get("/", (_req, res) => {
  res.send("This route is for testing only!");
});

router.post("/create", async (req, res) => {
  try {
    const newUser = userZodSchema.parse(req.body);
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(newUser.clearPassword, saltRounds);
    const userToCreate = new User({ username: newUser.username, hashPassword });
    const savedUser = await userToCreate.save();
    res.status(201).json(savedUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(`Error: ${error.message}`);
    } else {
      res.status(400).send("Something went wrong.");
    }
  }
});
router.post("/login", async (req, res) => {
  try {
    const loginUser = userZodSchema.parse(req.body);
    const user = await User.findOne({ username: loginUser.username });
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(loginUser.clearPassword, user.hashPassword);
    if (passwordCorrect) {
      const userForToken = {username: loginUser.username};
      safeAssertString(TOKEN_SECRET);
      const token = jsonwebtoken.sign(userForToken, TOKEN_SECRET);
      res.status(200).send({token, username: userForToken.username});
    } else {
      res.status(401).json({ error: "invalid username or password" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(`Error: ${error.message}`);
    } else {
      res.status(400).send("Something went wrong.");
    }
  }
});

export default router;
