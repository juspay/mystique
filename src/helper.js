// Following functions are used by WEB and IOS Render

function cacheDimen(view) {
  let props = view.props;
  let dimen = {
    w: props.w,
    h: props.h,
    stroke: props.stroke ? props.stroke.split(",")[0] * 1 : 0,
    x: props.x,
    y: props.y
  }
  window.__VIEW_DIMENSIONS[props.id] = dimen;
}

function shouldMove(view) {
  let props = view.props;
  let dimen = {
    w: props.w,
    h: props.h,
    x: props.x,
    y: props.y
  };
  let cachedDimen = window.__VIEW_DIMENSIONS[props.id];
  let changed = false;
  if (!cachedDimen)
    return dimen;
  for (let key in dimen) {
    if (cachedDimen[key] != dimen[key]) {
      dimen.id = props.id;
      changed = true;
    }
  }
  if (changed)
    return dimen;
  return null;
}

function shouldInfateChilds(view) {
  let props = view.props;

  if (props.visibility == "gone")
    return null;

  let dimen = {
    w: props.w,
    h: props.h,
    stroke: props.stroke ? props.stroke.split(",")[0] * 1 : 0,
  };

  let changed = false;
  let cachedDimen = window.__VIEW_DIMENSIONS[props.id];
  if (!cachedDimen)
    return true;
  for (let key in dimen) {
    if (cachedDimen[key] != dimen[key]) {
      changed = true;
      break;
    }
  }
  return changed;
}

function getOS() {
  var userAgent = navigator.userAgent;
  if (!userAgent)
    return console.error(new Error("UserAgent is null"));
  if (userAgent.indexOf("Android") != -1 && userAgent.indexOf("Version") != -1)
    return "ANDROID";
  if (userAgent.indexOf("iPhone") != -1 && userAgent.indexOf("Version") == -1)
    return "IOS";
  return "WEB";
}

module.exports = {
  shouldInfateChilds,
  shouldMove,
  cacheDimen,
  getOS
}