const express = require("express");
const app = express();

const Router = require("./routes/Routes");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
require("dotenv").config();
const connectDB = require("./db/connect");
app.use(cors());
app.set("trust proxy", 1);

app.use(express.json());
app.use(helmet());

app.use(xss());
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("crud-api");
});
app.use("/api/v1", Router);
app.use(notFound);

app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
