import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello World!!!",
  });
});

app.listen(port, (): void => {
  console.log(`[server]: server is running at http://localhost:${port}`);
});
