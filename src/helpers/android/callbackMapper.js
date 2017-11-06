module.exports.map = (fn) => {
  if (typeof window.__FN_INDEX !== 'undefined' && window.__FN_INDEX !== null) {
    let proxyFnName = 'F' + window.__FN_INDEX;
    window.__PROXY_FN[proxyFnName] = fn;
    window.__FN_INDEX++;
    return proxyFnName;
  } else {
    throw new Error(
      "Please initialise window.__FN_INDEX = 0 in index.js of your project."
    );
  }
}

module.exports.callJSCallback = (...params) => {
  let fName = params[0]
  let functionArgs = params.slice(1)
  window.__PROXY_FN[fName].call(null, ...functionArgs);
}