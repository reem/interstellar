var canvas = require('./index.js').canvas;

var animateState = function (state) {
  clear(canvas);
  _.map(state.particles, renderParticle);
  _.map(state.emitters, renderEmitter);
  _.map(state.fields, renderField);
};

var renderParticle = function (particle) {
  
};

var renderEmitter = function (emitter) {

};

var renderField = function (field) {

};

var renderFieldLine = function () {
  // Theoretical
  throw new Error("Not implemented: renderFieldLine");
};

var renderCircle = function () {

};

var clear = function (canvas) {
  canvas.context.clearRect(0, 0, canvas.width, canvas.height);
};

exports.animator = animateState;