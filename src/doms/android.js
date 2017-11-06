var excluded = {
  "CoordinatorLayout": "android.support.design.widget.",
  "FloatingActionButton": "android.support.design.widget.",
  "Toolbar": "android.support.v7.widget.",
  "AppBarLayout": "android.support.design.widget.",
  "CollapsingToolbarLayout": "android.support.design.widget.",
  "View": "android.view.",
  "WebView": "android.webkit.",
  "ViewPager": "android.support.v4.view.",
  "RotateAnimation": "android.view.animation.",
  "LinearInterpolator": "android.view.animation.",
  "Animation": "android.view.animation."
}

function getCtr(viewGroup) {
  var viewGroupMap = {
    'linearLayout': 'android.widget.LinearLayout$LayoutParams->new',
    'coordinatorLayout': 'android.widget.CoordinatorLayout$LayoutParams->new',
    'scrollView': 'android.widget.LinearLayout$LayoutParams->new',
    'horizontalScrollView': 'android.widget.LinearLayout$LayoutParams->new',
    'relativeLayout': 'android.widget.RelativeLayout$LayoutParams->new',
    'frameLayout': 'android.widget.FrameLayout$LayoutParams->new',
    'toolbar': 'android.support.v7.widget.Toolbar$LayoutParams->new',
    'collapsingToolbarLayout': 'android.support.design.widget.CoordinatorLayout$LayoutParams->new',
    'appBarLayout': 'android.support.design.widget.AppBarLayout$LayoutParams->new',
    'view': 'android.widget.LinearLayout$LayoutParams->new',
    'tabLayout': 'android.widget.LinearLayout$LayoutParams->new',
    'viewPager': 'android.support.v4.view.ViewPager$LayoutParams->new',
    'listView': 'android.widget.LinearLayout$LayoutParams->new',
    'expandableListView': 'android.widget.LinearLayout$LayoutParams->new',
    'recyclerView': 'android.support.v7.widget.RecyclerView$LayoutParams->new',
    'ratingBar': 'android.widget.LinearLayout$LayoutParams->new',
  }

  return viewGroupMap[viewGroup];
}

Array.prototype.flatten = function() {
  return this.reduce(function(prev, cur) {
    var more = [].concat(cur).some(Array.isArray);
    return prev.concat(more ? cur.flatten() : cur);
  }, []);
};

var parseParams = require('../helpers/android').parseParams;

module.exports = function(type, props, ...children) {
  var paramType;

  children = children.flatten();

  if (!props)
    props = {};

  if (typeof type === "string") {
    paramType = getCtr(type);
    props = parseParams(type, props, "set");

    props.node_id = window.__NODE_ID + '';
    window.__NODE_ID++;

    if (!props.__filename)
      props.__filename = "filename not added";

    for (let j = 0; j < children.length; j++) {
      if (children[j].props.runInUI) {
        children[j].props.runInUI = children[j].props.runInUI.replace('PARAM_CTR_HOLDER', paramType);
      }
    }

    type = type[0].toUpperCase() + type.substr(1, type.length)

    for (var excludedType in excluded) {
      if (excludedType === type) {
        return { type: excluded[excludedType] + type, props: props, children: children }
      }
    }

    return { type: "android.widget." + type, props: props, children: children }

  } else {
    return new type(props, children);
  }
}
