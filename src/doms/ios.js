Array.prototype.flatten = function() {
  return this.reduce(function(prev, cur) {
    var more = [].concat(cur).some(Array.isArray);
    return prev.concat(more ? cur.flatten() : cur);
  },[]);
};

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

module.exports = function(type, props, ...children){
  var paramType;

  children =  children.flatten();

  if (!props)
  props = {};

  if(typeof type === "string") {
    props.node_id = window.__NODE_ID + '';
    props = flattenObject(props);
    window.__NODE_ID++;
    children.forEach(child => {
      child.props.parentId = props.id;
    })

    if (!props.__filename)
    props.__filename = "filename not added";

    return {type: type,  props: props, children: children}

  } else {
    return new type(props, children);
  }
}
