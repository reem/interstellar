var State = require('./state.js');
var Animate = require('./animate.js');
var Animator = require('./animator.js');
var Update = require('./stepper.js');
var Stopper = require('./stopper.js');
var Emitter = require('./emitter.js');
var Vector = require('./vector.js');

exports.xBound = window.innerWidth;
exports.yBound = window.innerHeight;

var start = new State.State(
  [], [], // particles, fields
  [new Emitter.Emitter(
    new Vector.Vector(100, 100),
    100,
    5
  )]);

exports.init = function () {
  var canvas = document.getElementById('main');
  canvas.context = canvas.getContext('2d');
  canvas.width = exports.xBound;
  canvas.height = exports.yBound;

  Animator.animator = require('./animator.js').animator(canvas);
  Animate.animate(Animator.animator, Update.update, Stopper.stop, start);   
};