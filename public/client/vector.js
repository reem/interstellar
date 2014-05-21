var Vector = function VectorConstructor(x, y) {
  this.x = x || 0;
  this.y = y || 0;
};

Vector.fromAngle = function VectorFromAngle (magnitude, angle) {
  return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};

Vector.prototype.add = function VectorAdd(other) {
  this.x += other.x;
  this.y += other.y;
};

Vector.prototype.fastAdd = function (x, y) {
  this.x += x;
  this.y += y;
};

Vector.prototype.magnitude = function VectorMagnitude() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.angle = function VectorAngle() {
  return Math.atan2(this.y, this.x);
};

Vector.prototype.scale = function VectorScale(scalar) {
  this.x *= scalar;
  this.y *= scalar;
};

Vector.prototype.immutableScale = function VectorImmutableScale (scalar) {
  return new Vector(this.x * scalar, this.y * scalar);
};

Vector.prototype.clone = function VectorClone() {
  return new Vector(this.x, this.y);
};

Vector.prototype.lt = function (other) {
  return this.x <= other.x && this.y <= other.y;
};

Vector.prototype.gt = function (other) {
  return this.x >= other.x && this.y >= other.y;
};

Vector.prototype.dotproduct = function (other) {
  return this.x * other.x + this.y * other.y;
};

exports.Vector = Vector;