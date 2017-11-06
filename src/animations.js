const BaseView = require('./baseView');
const VIEW = new BaseView(null, null, {});

// Object of types of animations available on screen change
const AnimationTypes = {
  SLIDE: {
    name: "slide",
    handler: slideHandler
  },
  SLIDE_VERTICAL: {
    name: "slide_down",
    handler: slideDownHandler
  },
  SIMPLE: {
    name: "simple",
    handler: simpleHandler
  }
}

const DEFAULT_ANIMATION = AnimationTypes.SLIDE;

function simpleHandler(fromId, toId, direction) {
  let cmd = VIEW.cmd({
    id: toId,
    translationZ: ++window.ZIndex
  });
  return cmd;
}

function slideDownHandler(fromId, toId, direction) {
  let container = VIEW.cmdContainer();
  let cmd;

  if (direction == 1) {
    cmd = VIEW.cmd({
      id: toId,
      translationY: window.__HEIGHT,
      a_duration: '300',
      a_translationY: '0',
      translationZ: ++window.ZIndex,
    });
    container = container.addCmd(cmd);

    cmd = VIEW.cmd({
      id: fromId,
      a_translationY: -0.2 * window.__HEIGHT,
      a_duration: '300'
    });
    container = container.addCmd(cmd);

    return container;
  }

  window.ZIndex++;
  cmd = VIEW.cmd({
    id: fromId,
    translationY: 0,
    a_translationY: window.__HEIGHT,
    a_duration: '300',
    translationZ: ++window.ZIndex
  });
  container = container.addCmd(cmd);

  cmd = VIEW.cmd({
    id: toId,
    translationZ: window.ZIndex-1,
    a_translationY: '0',
    translationY: -0.2 * window.__HEIGHT,
    a_duration: '300',
  });
  container = container.addCmd(cmd);

  return container;
}

function slideHandler(fromId, toId, direction) {
  let container = VIEW.cmdContainer();
  let cmd;
  if (direction == 1) {
    cmd = VIEW.cmd({
      id: toId,
      visibility: 'visible',
      translationX: window.__WIDTH,
      a_duration: '300',
      a_translationX: '0',
      translationZ: ++window.ZIndex,
    });
    container = container.addCmd(cmd);
    cmd = VIEW.cmd({
      id: fromId,
      translationX: '0',
      visibility: 'visible',
      a_duration: '300',
      a_translationX: (-.2 * window.__WIDTH) + '',
    });
    container = container.addCmd(cmd);
  }

  if (direction == -1) {
    window.ZIndex++;
    cmd = VIEW.cmd({
      id: fromId,
      translationX: '0',
      a_duration: '300',
      a_translationX: window.__WIDTH,
      translationZ: ++window.ZIndex,
    });
    container = container.addCmd(cmd);

    cmd = VIEW.cmd({
      id: toId,
      visibility: 'visible',
      translationX: (-.2 * window.__WIDTH) + '',
      a_duration: '300',
      a_translationX: '0',
      translationZ: window.ZIndex - 1,
    });
    container = container.addCmd(cmd);
  }

  return container;
}

/*
  Generic Handler for Animation
  Arguments:
    fromViewId: Number - Id of the view currently visible on the screen
    toViewID: Number - Id of the view which has to be brought on the screen
    ID: Number - Id of the view to be animated
    animator: Obj - {name:string, handler:function}
    direction: Number - Represents of the direction of the screen
      -1 : Go back to the already rendered screen (right to left)
       1 : Go to the new screen (left to right)
*/
function getAnimation(fromViewID, toViewId, direction, animator) {
  if (!animator)
    animator = DEFAULT_ANIMATION;

  if (typeof animator === "object" && typeof animator.handler === "function")
    return animator.handler(fromViewID, toViewId, direction);
  else
    console.log(new Error("Animation handler is not a function, type: " +
      animator));
}

module.exports.types = AnimationTypes;
module.exports.getAnimation = getAnimation;