import express, { Express } from "express";
import mongoose from "mongoose";
import { passportConfig } from "./services/passport";
import dotenv from "dotenv";
import { authRoutes } from "./routes/authRoutes";
import { mongoURI } from "./config/keys";

dotenv.config();

mongoose.connect(mongoURI);

const app: Express = express();
authRoutes(app);

passportConfig();

const PORT = process.env.PORT;
app.listen(PORT, (): void => {
  console.log(`[Server]: server is running at http://localhost:${PORT}`);
});
