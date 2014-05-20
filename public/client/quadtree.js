var SplitTree = require('./splittree.js').SplitTree;
var Vector = require('./vector.js').Vector;
var Particle = require('./particle.js').Particle;

var QuadBox = function (high, low) {
  this.high = high;
  this.low = low;
};

QuadBox.prototype.split = function () {
  var middle = new Vector(
    this.low.x + 0.5 * (this.high.x - this.low.x),
    this.low.y + 0.5 * (this.high.y - this.low.y)
  );
  return [
    new QuadBox(this.high, middle),
    new QuadBox(new Vector(this.low.x, this.high.y), middle),
    new QuadBox(middle, new Vector(this.high.x, this.low.y)),
    new QuadBox(middle, this.low)
  ];
};

var ParticlePoint = function (particle) {
  this.particle = particle;
};

ParticlePoint.fromVector = function (vec) {
  return new ParticlePoint(new Particle(vec));
};

ParticlePoint.prototype.lt = function (other) {
  return this.particle.pos.lt(other.particle.pos);
};

ParticlePoint.prototype.gt = function (other) {
  return this.particle.pos.gt(other.particle.pos);
};

var ParticleBox = function (high, low) {
  QuadBox.call(this, high, low);
};

ParticleBox.prototype.split = function () {
  var middle = ParticlePoint.fromVector(new Vector(
    this.low.particle.pos.x + 0.5 * (this.high.particle.pos.x - this.low.particle.pos.x),
    this.low.particle.pos.y + 0.5 * (this.high.particle.pos.y - this.low.particle.pos.y)
  ));
  return [
    new ParticleBox(ParticlePoint.fromVector(this.high.particle.pos), middle),
    new ParticleBox(ParticlePoint.fromVector(new Vector(this.low.particle.pos.x, this.high.particle.pos.y)), middle),
    new ParticleBox(middle, ParticlePoint.fromVector(new Vector(this.high.particle.pos.x, this.low.particle.pos.y))),
    new ParticleBox(middle, ParticlePoint.fromVector(this.low.particle.pos))
  ];
};

exports.ParticleBox = ParticleBox;
exports.ParticlePoint = ParticlePoint;
