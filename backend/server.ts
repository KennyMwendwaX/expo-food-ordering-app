import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users";
import productsRouter from "./routes/products";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
app.use(express.json());

app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
