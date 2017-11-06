var Render = require("./Render");
const R = require('ramda');

module.exports = {
  getScreenDimensions: function () {
    let element = document.getElementById("content");
    return JSON.stringify({
      width: element.offsetWidth,
      height: element.offsetHeight
    });
  },

  runInUI: function (cmd) {
    if (typeof cmd == "string")
      return;

    Render.runInUI(cmd);
  },

  Render: function (view, cb) {
    var parentElement = document.getElementById("content");
    let parentView = {
      type: "linearLayout",
      props: {
        "h": parentElement.clientHeight,
        "w": parentElement.clientWidth,
      },
      children: [view]
    };

    Render.computeChildDimens(parentView);
    Render.inflateView(view, parentElement);
    if (cb)
      window.callUICallback(cb);
  },

  addViewToParent: function (id, view, index, cb, replace) {
    var parent = document.getElementById(id);
    var props = window.__VIEWS[id].props;
    var type = parent.className;
    var iterableChildNodes = Array.prototype.slice.call(parent.children);

    if (replace) {
      iterableChildNodes.forEach((each) => {
        each.remove();
      });
    }

    let parentView = window.__VIEWS[id];
    parentView.children.splice(index, 0, view);
    Render.computeChildDimens(parentView);
    if (parentView.type === "linearLayout")
      parentView.children.forEach(child => {
        Render.inflateView(child, parent);
      });
    else
      Render.inflateView(view, parent);

    if (cb)
      window.callUICallback(cb);
  }
};