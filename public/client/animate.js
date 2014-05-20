var Utility = require('./utility.js');

var inner = function (animator, stepper, stopper, state) {
  if (!stopper(state)) {
    animator(state); // Blocking
    window.requestAnimationFrame(function () { inner(animator, stepper, stopper, stepper(state)); });
  } else {
    return state;
  }
};

exports.animate = function (animator, stepper, stopper, start) {
  inner(animator, stepper, stopper, start); 
};
