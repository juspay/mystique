var parseParams = require('../helpers/web').parseParams;

Array.prototype.flatten = function () {
  return this.reduce(function (prev, cur) {
    var more = [].concat(cur).some(Array.isArray);
    return prev.concat(more ? cur.flatten() : cur);
  }, []);
};

module.exports = function (type, props, ...children) {
  children = children.flatten();

  if (!props)
    props = {};

  if (typeof type === "string") {
    props = parseParams(type, props);
    let obj = {
      props: props,
      type: type,
      children: children
    };
    window.__VIEWS[props.id] = obj;
    return obj;
  } else {
    return new type(props, children);
  }
}