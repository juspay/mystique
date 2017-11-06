Array.prototype.rotate = (function () {
  // save references to array functions to make lookup faster
  var push = Array.prototype.push,
    splice = Array.prototype.splice;

  return function (count) {
    var len = this.length >>> 0, // convert to uint
      count = count >> 0; // convert to int

    // convert count to value in range [0, len)
    count = ((count % len) + len) % len;

    // use splice.call() instead of this.splice() to make function generic
    push.apply(this, splice.call(this, 0, count));
    return this;
  };
})();

function convertHexToRgb(hex) {
  var r = (parseInt(hex.substring(0, 2), 16));
  var g = (parseInt(hex.substring(2, 4), 16));
  var b = (parseInt(hex.substring(4, 6), 16));

  return r + "," + g + "," + b;
}

function flattenObject(ob) {
  var toReturn = {};
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if ((typeof ob[i]) == 'object') {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        if (typeof flatObject[x] !== "undefined")
          toReturn[x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

function parseColors(color) {
  if (color.length < 8)
    return color;

  var alpha = parseInt(color.substring(1, 3), 16);
  alpha = (alpha / 255).toFixed(2);

  var hexColor = color.substring(3, 9);
  var rgbaColor = "rgba(" + convertHexToRgb(hexColor) + "," + alpha + ")";

  return rgbaColor;
}

function parseLayoutProps(type, config, key) {
  if (typeof config[key] == "undefined" || config[key] == null) {
    delete config[key];
    return;
  }

  if (!config.style) {
    config.style = {};
    config.style.transform = "";
    config.animation = {};
    config.animation.transform = "";
  }

  if (!config.attributes)
    config.attributes = {};

  if (!config.style.className)
    config.style.className = "";

  if (key == "onClick") {
    config.style.cursor = "pointer";
  }

  if (key == "textSize")
    config.style.fontSize = config.textSize;

  if (key == "imageUrl")
    config.attributes.src = config.imageUrl + ".png";

  if (key == "background") {
    config.style.background = parseColors(config.background);
  }

  if (key == "color") {
    config.style.color = parseColors(config.color);
  }

  if (key == "cornerRadius") {
    config.style.borderRadius = config.cornerRadius + "px";
  }

  if (key == "alpha") {
    config.style.opacity = config[key];
  }

  if (key == "a_alpha") {
    config.animation.opacity = config[key];
  }

  if (key == "fontStyle") {
    let match = config.fontStyle.match(/[/-]/);
    let fontName = match ? config.fontStyle.slice(0, match.index) : config.fontStyle;
    config.style.fontFamily = fontName;

    if (!match)
      return;

    let type = config.fontStyle.slice(match.index + 1);
    type = type.replace(/[-/]/g, '');
    type  = type.toLowerCase();

    if (type.indexOf('italic') != -1)
      config.style.fontStyle = 'italic';

    if (type.indexOf('extralight') != -1)
      type = '200';
    else if (type.indexOf('light') != -1)
      type = '300';
    else if (type.indexOf('regular') != -1 || type.indexOf('book') != -1)
      type = '400';
    else if (type.indexOf('semibold') != -1 || type.indexOf('medium') != -1)
      type = '500';
    else if (type.indexOf('bold') != -1 || type.indexOf('heavy') != -1)
      type = '700';
    else if (type.indexOf('black') != -1)
      type = '900';



    config.style.fontWeight = type;
  }

  if (key == "stroke") {
    let values = config.stroke.split(",");
    config.style.border = values[0] + "px solid" + values[1];
  }

  if (key == "translationY") {
    config.style.transform += "translateY(" + config[key] + "px) ";
  }

  if (key == "a_translationY") {
    config.animation.transform += "translateY(" + config[key] + "px) ";
  }

  if (key == "translationX") {
    config.style.transform += "translateX(" + config[key] + "px) ";
  }

  if (key == "a_translationX") {
    config.animation.transform += "translateX(" + config[key] + "px) ";
  }

  if (key == "scaleX") {
    config.style.transform += "scaleX(" + config[key] + ") ";
  }

  if (key == "a_scaleX") {
    config.animation.transform += "scaleX(" + config[key] + ") ";
  }

  if (key == "scaleY") {
    config.style.transform += "scaleY(" + config[key] + ") ";
  }

  if (key == "a_scaleY") {
    config.animation.transform += "scaleY(" + config[key] + ") ";
  }

  if (key == "rotation") {
    config.style.transform += "rotate(" + config[key] + "deg) ";
  }

  if (key == "a_rotation") {
    config.animation.transform += "rotate(" + config[key] + "deg) ";
  }

  if (key == "rotationX") {
    config.style.transform += "rotateX(" + config[key] + "deg) ";
  }

  if (key == "a_rotationX") {
    config.animation.transform += "rotateX(" + config[key] + "deg) ";
  }

  if (key == "rotationY") {
    config.style.transform += "rotateY(" + config[key] + "deg) ";
  }

  if (key == "a_rotationY") {
    config.animation.transform += "rotateY(" + config[key] + "deg) ";
  }

  if (key == "translationZ") {
    config.style["z-index"] = config[key];
  }

  if (key == "a_duration") {
    config.animation.transition = config[key] + 'ms all';
  }

  if (type == "textView" && key == "gravity" && config.gravity) {
    config.style.textAlign = config.gravity;
  }

  if (key == "id") {
    config.attributes.id = config.id;
  }

  if (key == "lineHeight")
    config.style.lineHeight = config.lineHeight;

}

function setDefaults(type, config) {
  if (type == "linearLayout") {
    config.orientation = config.orientation;
  }
}

module.exports = function (type, config, getSetType) {

  config = flattenObject(config);
  setDefaults(type, config);

  var keys = Object.keys(config);

  for (var i = 0; i < keys.length; i++) {
    parseLayoutProps(type, config, keys[i]);
  }

  config.transition = "0ms all";

  if (config.style.transform == "") {
    delete config.style.transform;
  }

  return config;
}