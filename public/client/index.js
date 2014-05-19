var State = require('./state.js');
var Animate = require('./animate.js');
var Update = require('./stepper.js');
var Stopper = require('./stopper.js');
var Emitter = require('./emitter.js');
var Vector = require('./vector.js');

exports.xBound = window.innerWidth;
exports.yBound = window.innerHeight;

var start = new State.State(
  [], [], // particles, fields
  new Emitter.Emitter(
    new Vector.Vector(100, 100),
    100,
    5
  ));

exports.init = function () {
  exports.canvas = document.getElementById('main');
  exports.canvas.context = exports.canvas.getContext('2d');
  exports.canvas.width = exports.xBound;
  exports.canvas.height = exports.yBound;

  Animate.animate(Update.update, Update.update, Stopper.stop, start);   
};