var Emitter = function EmitterConstructor (point, velocity, spread) {
    // particlePosition, particleVelocity, particleAcceleration) {

  // this.particle = new Particle(particlePosition, particleVelocity, particleAcceleration);

  this.position = point;
  this.velocity = velocity;
  this.spread = spread || Math.PI / 32;
  this.drawColor = "#999";
};

Emitter.prototype.emitParticle = function EmitterEmitParticle () {
  var angle = this.velocity.angle() + this.spread - (Math.random() * this.spread * 2);

  return new Particle(this.position.clone(), 
    Vector.fromAngle(this.velocity.magnitude(), angle));
};