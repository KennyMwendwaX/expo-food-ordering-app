import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
app.use(express.json());

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
