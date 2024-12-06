import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import validateToken from "./middlewares/index.js";
import { config } from "dotenv";
import routes from "./routes/index.js";
import connectDB from './db.js';

const app = express();

config();
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(validateToken);

app.use("/", routes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
