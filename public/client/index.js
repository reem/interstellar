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
exports.particleLimit = 1000000;

var examples = [
  new State.State(
    [], 
    [
      new Field.Field(new Vector.Vector(700, 400), -50000)
    ],
    [
      new Emitter.Emitter(
        new Vector.Vector(200, 400), 50, 50, undefined, 0, "white"
      ),
      new Emitter.Emitter(
        new Vector.Vector(1200, 400), 50, 50, undefined, Math.PI, "white"
      )
    ]
  ),
  new State.State(
    [], 
    [
      new Field.Field(new Vector.Vector(700, 400), 25000),
      new Field.Field(new Vector.Vector(500, 400), -5000),
      new Field.Field(new Vector.Vector(900, 400), -5000),
      new Field.Field(new Vector.Vector(400, 400), 5000),
      new Field.Field(new Vector.Vector(1000, 400), 5000),
    ],
    [
      new Emitter.Emitter(
        new Vector.Vector(400, 200), 25, 10, undefined, 0, "orange"
      ),
      new Emitter.Emitter(
        new Vector.Vector(1000, 600), 25, 10, undefined, Math.PI, "yellow"
      ),
      new Emitter.Emitter(
        new Vector.Vector(1000, 200), 25, 10, undefined, Math.PI, "pink"
      ),
      new Emitter.Emitter(
        new Vector.Vector(400, 600), 25, 10, undefined, 0, "teal"
      )
    ]
  ),
  new State.State(
    [], 
    [
      new Field.Field(new Vector.Vector(700, 400), 200),
    ],
    [
      new Emitter.Emitter(
        new Vector.Vector(650, 600), 50, 5, undefined, -Math.PI/2, "orange"
      ),
      new Emitter.Emitter(
        new Vector.Vector(750, 600), 50, 5, undefined, -Math.PI/2, "orange"
      )
    ]
  ),
  new State.State(
    [], 
    [
      new Field.Field(new Vector.Vector(500, 400), -20000),
      new Field.Field(new Vector.Vector(900, 400), -20000),
      new Field.Field(new Vector.Vector(700, 600), -20000),
      new Field.Field(new Vector.Vector(700, 200), -20000),
    ],
    [
      new Emitter.Emitter(
        new Vector.Vector(700, 400), 400, 20, Math.PI * 2, Math.PI * 2, "orange"
      )
    ]
  ),
]; 

var start = examples[1]; 

exports.init = function () {
  var canvas = document.getElementById('main');
  canvas.width = exports.xBound;
  canvas.height = exports.yBound;

  Animator.animator = require('./animator.js').animator(canvas, canvas.getContext('2d'));
  Animate.animate(Animator.animator, Update.update, Stopper.stop, start);   
};