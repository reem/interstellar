/* globals Utilty, Update, Stopper, State, Particle, Field, Emitter, Animate */
exports.xBound = window.innerWidth;
exports.yBound = window.innerHeight;

var start = new State.State();

exports.init = function () {
  Animate.animate(Update.update, Stopper.stop, start);   
};