require("dotenv").config({ path: "./config.env" });
const express = require("express");
// const connectDB = require("./config/db");
const mogoose = require("mongoose");
const errorHandler = require("./middleware/error");
//connect db
// await connectDB();

const app = express();

mogoose.connect(
  "mongodb+srv://melvinfernando:melvin1705@cluster0.trfyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db")
);

//Error handlre (shoyld be the last piece of middlewares)
app.use(errorHandler);

app.use(express.json());
app.use("/api/auth", require("./route/auth"));
app.use("/api/private", require("./route/private"));

const PORT = process.env.port || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server up and running on ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
