import express, { Express } from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { passportConfig } from "./services/passport";
import dotenv from "dotenv";
import { authRoutes } from "./routes/authRoutes";
import { mongoURI, cookieKey } from "./config/keys";

dotenv.config();

mongoose.connect(mongoURI);

const app: Express = express();

app.use(
  session({
    secret: [cookieKey],
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

authRoutes(app);

const PORT = process.env.PORT;
app.listen(PORT, (): void => {
  console.log(`[Server]: server is running at http://localhost:${PORT}`);
});
