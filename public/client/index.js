var State = require('./state.js');
var Animate = require('./animate.js');
var Animator = require('./animator.js');
var Update = require('./stepper.js');
var Stopper = require('./stopper.js');
var Emitter = require('./emitter.js');
var Vector = require('./vector.js');
var Field = require('./field.js');

exports.xBound = window.innerWidth;
exports.yBound = window.innerHeight;
exports.particleLimit = 20000;

var start = new State.State(
  [], 
  [
    // new Field.Field(new Vector.Vector(600, 300), -2000),
    new Field.Field(new Vector.Vector(600, 400), 50000),
  ], // particles, fields
  [new Emitter.Emitter(
    new Vector.Vector(500, 200),
    100,
    20
  )]);

exports.init = function () {
  var canvas = document.getElementById('main');
  canvas.width = exports.xBound;
  canvas.height = exports.yBound;

  Animator.animator = require('./animator.js').animator(canvas, canvas.getContext('2d'));
  Animate.animate(Animator.animator, Update.update, Stopper.stop, start);   
};