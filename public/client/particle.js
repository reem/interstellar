var Particle = {};

(function (exports) {
  var Vector = Vector.Vector;

  var Particle = function (pos, vel, acc) {
    this.pos = pos || new Vector(0, 0);
    this.vel = vel || new Vector(0, 0);
    this.acc = acc || new Vector(0, 0);
  };

  Particle.prototype.move = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  };

  exports.Particle = Particle;
}(Particle));
