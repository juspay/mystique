const render = require('./Render');

module.exports = {
  getScreenDimensions: function () {
    return JSON.stringify({
      width: window.__DEVICE_DETAILS.screen_width,
      height: window.__DEVICE_DETAILS.screen_height
    });
  },

  runInUI: function (cmd) {
    if (typeof cmd == "string")
      return;

    render.runInUI(cmd);
  },

  Render: function (view, cb) {
    let obj = {
      type: "linearLayout",
      props: {
        h: window.__HEIGHT,
        w: window.__WIDTH
      },
      children: [view]
    };
    render.computeChildDimens(obj);
    view = render.inflate(view);
    if (view) {
      window.webkit.messageHandlers.IOS.postMessage(
        JSON.stringify({
          methodName: "render",
          parameters: {
            view: view
          }
        }));
    }
    if (typeof cb === "function")
      cb();
  },

  addViewToParent: function (id, view, index, cb, replace) {
    if (!window.__VIEWS[id]) {
      return console.error(new Error("AddViewToParent: Invalid parent ID: " +
        id));
    }
    let parent = window.__VIEWS[id];
    parent.children.splice(index, 0, view);
    view.props.parentId = id;
    render.computeChildDimens(parent);
    view = render.inflate(view);
    if (parent.type == "linearLayout") {
      parent.children.forEach(child => {
        if (child.props.id != view.props.id)
          render.inflate(child);
      });

      if (parent.props.parentIsScroll) {
        render.inflate(window.__VIEWS[parent.props.parentId]);
      }

    }
    if (view) {
      window.webkit.messageHandlers.IOS.postMessage(JSON.stringify({
        methodName: "addViewToParent",
        parameters: {
          index: index,
          parentId: id,
          view: view
        }
      }));
    }
    if (typeof cb === "function")
      cb();
  }
};