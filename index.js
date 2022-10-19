const logEvents = require("./logEvents");

const EventsEmitter = require("events");

class MyEmitter extends EventsEmitter {}

// initialize an object
const myEmitter = new MyEmitter();

// add listener for the log event
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  // Emit event
  myEmitter.emit("log", "log event emitted!");
}, 1000);
