module.exports = {
  handle : (ui, callback) => {

    if(ui.render) {
      if (typeof Android === "undefined")
        throw new Error("Android is undefined");

      if (window.__OS != "ANDROID")
        return Android.Render(ui.render, null);
      else
        return Android.Render(JSON.stringify(ui.render), null);
    }

    if(ui.runInUI) {
      Android.runInUI(ui.runInUI, null);
    }
    if(ui.addViewToParent) {
      Android.addViewToParent(ui.addViewToParent.parentId, JSON.stringify(ui.addViewToParent.jsx), ui.addViewToParent.index, null);
    }
  }
}
