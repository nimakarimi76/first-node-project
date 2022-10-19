const os = require("os");
const path = require("path");

console.log(os.type());
console.log(os.version());
console.log(__dirname);
console.log(__filename);

const fs = require("fs");

if (!fs.existsSync("./newDir")) {
  fs.mkdir("./newDir", (err) => {
    if (err) throw err;
    console.log("Directory created");
  });
}
//* rmdir -> remove directory
