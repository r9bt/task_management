import express from "express";
import routers from "./routes/index";
import { errorHandler } from "./error/error_handler";
import "dotenv/config";
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(PORT);
});
