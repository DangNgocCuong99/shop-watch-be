var express = require("express"),
  app = express(),
  port = process.env.PORT || 3008,
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require("cors");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: "./config.env" });

const DB =  process.env.mode ==="online" ? process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
).replace("<username>", process.env.DATABASE_USERNAME) : process.env.DATABASE_LOCAL.replace("localhost", process.env.LOCALHOST);

mongoose.Promise = global.Promise;
const Connection = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(` Database Connected : ${DB}`);
  } catch (error) {
    console.log(error);
  }
};

Connection();

app.use(cors({}));
app.use(express.json());

var routes = require("./api/route");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("Server started on: " + port);
