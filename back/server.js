const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const middlewares = require("./middlewares");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(middlewares.validateToken);

const routes = require("./routes");
app.use("/", routes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
