var Field = function (pos, strength) {
  this.pos = pos;
  this.strength = strength;
  this.color = this.strength < 0 ? "#f00" : "#0f0"; // Set green or red color.
  _.bindAll(this, 'affect');
};

Field.prototype.affect = function (particle) {
  var xDiff = this.pos.x - particle.pos.x;
  var yDiff = this.pos.y - particle.pos.y; 
  var force = this.strength / Math.pow(xDiff * xDiff + yDiff * yDiff, 1.5);

  // Don't create a vector obj.
  particle.acc.fastAdd(xDiff * force, yDiff * force);
};

exports.Field = Field;