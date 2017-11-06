const View = require("./views/View");
const getOS = require('./helper').getOS;
const objectAssign = require('object-assign');

String.prototype.addCmd = function(data) {
  return this.concat(data);
};

Array.prototype.addCmd = function(data) {
  this.push(data);
  return this;
};

if (!window.__OS)
  window.__OS = getOS();

let parseParams;
if (window.__OS == "ANDROID")
  parseParams = require('./helpers/android/parseParams');
else if (window.__OS == "WEB")
  parseParams = require('./helpers/web/parseParams');
else
  parseParams = require('./helpers/ios/parseParams');

class BaseView extends View {

  constructor(props, children) {
    super(props, children);

    window.__SETFN = function (config) {
      Android.runInUI(
        this.set(config),
        null
      )
    }.bind(this)

    this.idSet = {};
  }

  findRecurse(obj, selector) {
    var children = obj.children;

    for (var i = 0; i < children.length; i++) {
      if (children[i].displayName && children[i].displayName == selector) {
        this.foundChildren.push(children[i]);
      }

      if (children[i].children && children[i].children.length)
        this.findRecurse(children[i], selector);
    }

    return;
  }

  find(selector, obj) {
    this.foundChildren = [];

    if (!obj)
      this.findRecurse(this.layout, selector);
    else
      this.findRecurse(obj, selector);

    return this.foundChildren;
  }

  setIds(arr) {
    if (!this.idSet)
      this.idSet = {};

    for (var i = 0; i < arr.length; i++) {
      window.__ID++;
      this.idSet[arr[i]] = window.__ID + '';
    }
  }

  handleSpecialChars(value) {
    value = value.indexOf(',') > -1 ? value.replace(/\,/g, '\\\\,') : value;
    value = value.indexOf(':') > -1 ? value.replace(/\:/g, '\\\\:') : value;
    value = value.indexOf('=') > -1 ? value.replace(/\=/g, '\\\\=') : value;
    value = value.indexOf(';') > -1 ? value.replace(/\;/g, '\\\\;') : value;

    return value;
  }

  cmdForAndroid(config) {
    var cmd = "set_view=ctx->findViewById:i_" + config.id + ";";
    var runInUI;

    if (config.toast) {
      cmd = "set_TOAST=android.widget.Toast->makeText:ctx_ctx,cs_" + this.handleSpecialChars(
          config.text) + ",i_" + (config.duration == "short" ? 0 : 1) +
        ";get_TOAST->show";
    } else if (config && Object.keys(config).length) {
      delete config.id;

      config.root = "true";
      runInUI = parseParams("linearLayout", config, "get").runInUI;

      cmd += runInUI + ';';
    }

    return cmd;
  }

  cmdContainer() {
    if (window.__OS == "ANDROID")
      return "";
    return [];
  }

  cmdForWeb(config) {
    if (Object.keys(config).length)
      return parseParams("linearLayout", config, "set");
  }

  cmd(config) {
    if (window.__OS == "ANDROID")
      return this.cmdForAndroid(config);
    else if (window.__OS == "WEB")
      return this.cmdForWeb(config);
    return config;
  }

  appendChild(id, jsx, index, fn, replaceChild) {
    var proxyFnName;
    if (!replaceChild) {
      replaceChild = false;
    }

    if (fn) {
      proxyFnName = 'F' + window.__FN_INDEX;
      window.__PROXY_FN[proxyFnName] = fn;
      window.__FN_INDEX++;
    }

    jsx = (window.__OS != "ANDROID") ? jsx : JSON.stringify(jsx);

    if (proxyFnName)
      Android.addViewToParent(id, jsx, index, proxyFnName, replaceChild);
    else
      Android.addViewToParent(id, jsx, index, null, replaceChild);
  }

  getView(jsx) {
    if (window.__OS != "ANDROID")
      return jsx;

    return JSON.stringify(jsx);
  }

  delete(id) {
    return "set_VIEW=ctx->findViewById:i_" + id +
      ";set_PARENT=get_VIEW->getParent;get_PARENT->removeView:get_VIEW;"
  }

  removeAllChildren(id) {
    return "set_VIEW=ctx->findViewById:i_" + id +
      ";get_VIEW->removeAllViews;"
  }

  replaceChild(id, jsx, index, fn) {
    this.appendChild(id, jsx, index, fn, true);
  }
}

module.exports = BaseView;