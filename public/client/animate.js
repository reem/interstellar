/* globals Lazy */

var Utility = require('./utility.js');

var innerAnimate = function (animation, sequence, wait) {
  animation(sequence.first());
  if (typeof wait === 'number') {
    setTimeout(function () {
      innerAnimate(animation, sequence.rest(), wait);
    }, wait);
  } else {
    window.requestAnimationFrame(function () {
      innerAnimate(animation, sequence.rest(), wait);
    });
  }
};

var iterate = function (stepper, start) {
  var current;

  return Lazy.generate(function () {
    if (current === undefined) {
      current = start;
    } else {
      current = stepper(current);
    }
    return current;
  });
};

exports.animate = function (animator, stepper, stopper, start, wait) {
  innerAnimate(animator, Lazy.takeWhile(Utility.not(stopper), iterate(stepper, start))); 
};
