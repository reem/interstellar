var Field = {};

(function (exports) {
  var Field = function (pos, strength) {
    this.pos = pos;
    this.strength = strength;
    this.color = this.strength > 0 ? "#f00" : "#0f0"; // Set green or red color.
  };

  Field.prototype.force = function (xdiff, ydiff) {
    return this.strength / Math.pow(xdiff * xdiff + ydiff * ydiff, 1.5);
  };

  Field.prototype.affect = function (particle) {
    var xDiff = this.pos.x - particle.pos.x;
    var yDiff = this.pos.y - particle.pos.y; 
    var force = this.force(xDiff, yDiff);
    
    // Don't create a vector obj.
    particle.acceleration.fastAdd(xDiff * force, yDiff * force);
  };

  exports.Field = Field;
}(Field));