var Vector = require('./vector.js').Vector;

var white = '#FFF';

var Particle = function (pos, vel, acc, color) {
  this.pos = pos || new Vector(0, 0);
  this.vel = vel || new Vector(0, 0);
  this.acc = acc || new Vector(0, 0);
  this.color = color || white;
  _.bindAll(this, 'move');
};

Particle.prototype.move = function() {
  this.vel.add(this.acc);
  this.pos.add(this.vel);
};

exports.Particle = Particle;