const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// const os = require("os");
// console.log(os.type());
// console.log(os.version());
// console.log(__dirname);
// console.log(__filename);

// if (!fs.existsSync("./newDir")) {
//   fs.mkdir("./newDir", (err) => {
//     if (err) throw err;
//     console.log("Directory created");
//   });
// }
// // rmdir -> remove directory

const { logEvents, logger } = require("./middleware/logEvents");

const EventsEmitter = require("events");

class Emitter extends EventsEmitter {}

// initialize an object
const myEmitter = new Emitter();

// add listener for the log event
myEmitter.on("log", (msg) => logEvents(msg));

// myEmitter.emit("log", "log event emitted!");

//* ------------------------------------ Express js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

const cors = require("cors");

// custom middleware logger
app.use(logger);

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/subdir", express.static(path.join(__dirname, "public")));

app.use("/subdir", require("./routes/subdir"));

//*    ^  starts          $  ends       |   or
app.get("^/$|index(.html)?", (req, res) => {
  // res.send("hello");
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//? ()? optional
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page"); //* 302 by default
});

//! route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("hello");
    next();
  },
  (req, res) => {
    res.send("Hi");
  }
);

// 404 page not found
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
