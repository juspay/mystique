var Renderer = require("./Render");

function generateTabWrapper ()  {
  var elem = document.createElement("div");

  elem.className = "tab";

  return elem;
}

function generateTabTitleWrapper () {
  var elem = document.createElement("div");
  elem.className = "tab-titleWrapper";

  return elem;
}

function generateTabContentWrapper ()  {
  var elem = document.createElement("div");

  elem.className = "tab-contentWrapper";

  return elem;
}

function generateTabTitleEl (title) {
  var elem = document.createElement("div");

  elem.innerHTML = title;
  elem.className = "tab-title";

  return elem;
};

function generateTabContentEl (view)  {
  var elem = Renderer.inflateView(view.view);
  elem.className += " tab-content";

  return elem;
}

var createTabs = function(Android, id, tabJsx, jsx, cb)  {
  var view = generateTabWrapper();
  var tabTitleWrapper = generateTabTitleWrapper();
  var tabContentWrapper = generateTabContentWrapper();
  var tabItem;

  view.appendChild(tabTitleWrapper);
  view.appendChild(tabContentWrapper);

  jsx.forEach((each, index) => {
    tabItem = generateTabTitleEl(each.value);

    if (index == 0)
    tabItem.className += " tab-title-active";

    tabTitleWrapper.appendChild(tabItem);
  });

  tabJsx.forEach((each, index) => {
    tabItem = generateTabContentEl(each);

    if (index == 0)
    tabItem.className += " tab-content-active";

    tabContentWrapper.appendChild(tabItem);
  });

  document.getElementById(id).appendChild(view);

  window.callUICallback(cb , "0");
};

module.exports = {
  createTabs: createTabs,
}
