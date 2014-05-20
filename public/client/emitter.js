var Vector = require('./vector.js').Vector;
var Particle = require('./particle.js').Particle;

var Emitter = function (pos, ppf, startVel, spread, color) {
  this.pos = pos || new Vector(0, 0);
  this.ppf = ppf || 10;
  this.startVel = startVel === undefined ? 0 : startVel;
  this.spread = spread || Math.PI / 64;
  this.drawColor = color || '#999';
  _.bindAll(this, 'emit');
};

Emitter.prototype.emit = function() {
  // Returns all emitted particles.
  return _.times(this.ppf, function () {
    return new Particle(
      this.pos.clone(),
      Vector.fromAngle(this.startVel * (Math.random() + 0.2), this.spread - (Math.random() * this.spread * 2)) 
      // default acceleration to Vec(0, 0)
    );
  }.bind(this));
};

exports.Emitter = Emitter;