const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { Module, builtinModules } = require("module");

const logEvents = async (message) => {
  const dateTime = format(new Date(), "dd/MM/yyyy\tHH:mm:ss");
  const logItem = `${dateTime} \t ${uuid()} \t ${message}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    //* appendFile also create a file if it doesn't exist
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.md"),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = logEvents;
