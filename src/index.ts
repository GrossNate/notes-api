import express from 'express';
import notesRouter from './routes/notes';
import userRouter from './routes/user';
import {connect} from 'mongoose';
import { API_PORT, MONGODB_URI, TOKEN_SECRET } from './utils/config';
import { safeAssertString } from './types';
import { containsTokenStringZodSchema } from './zodSchemas';
import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";
import { logOnlyInDev } from './utils/devHelpers';
import cors from "cors";
import cookieParser from "cookie-parser";

const checkAuthentication: express.Handler = (req, res, next) => {
  console.log(req.cookies);
  const parsedToken = containsTokenStringZodSchema.safeParse(req.cookies);
  if (parsedToken.success && parsedToken.data.token !== "") {
    safeAssertString(TOKEN_SECRET);
    try {
      const userTokenObj = jsonwebtoken.verify(parsedToken.data.token, TOKEN_SECRET);
      if (
        typeof userTokenObj === "object" &&
        userTokenObj !== null &&
        "username" in userTokenObj &&
        typeof userTokenObj.username === "string"
      ) {
        if (parsedToken.data.username === userTokenObj.username) {
          next();
        } else {
          logOnlyInDev("token didn't match username");
          res.sendStatus(401);
        }
      }
    } catch (err: unknown) {
      if (err instanceof JsonWebTokenError && err.message === "invalid token")
        logOnlyInDev("invalid token sent");
        res.sendStatus(401);
    }
  } else {
    logOnlyInDev("token or username not sent");
    res.sendStatus(401);
  }

};

safeAssertString(MONGODB_URI);
void connect(MONGODB_URI);
const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(cookieParser(TOKEN_SECRET));

app.use('/api/notes', checkAuthentication, notesRouter);
app.use('/api/user', userRouter);

app.listen(API_PORT, () => {
  console.log(`Server running on port ${API_PORT}`);

});