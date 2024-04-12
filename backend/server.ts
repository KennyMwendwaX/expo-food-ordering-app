import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript backend!");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
