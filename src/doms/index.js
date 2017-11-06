const getOS = require('../helper').getOS;

function run() {
  let OS = getOS();

  let type;
  switch (OS) {
  case "IOS":
    type = require("./ios")
    break;
  case "WEB":
    type = require("./web")
    break;
  default:
    type = require("./android")
  }

  return type;
}

module.exports = run();