const express = require("express");
const app = express();

const Router = require("./routes/Routes");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cors = require("cors");

require("dotenv").config();
const connectDB = require("./db/connect");
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

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
