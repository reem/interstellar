var State = {};

(function (exports) {
  var State = function (particles, fields, emitters) {
    this.particles = particles || [];
    this.fields = fields || [];
    this.emitters = emitters || [];
  };

  exports.State = State;
}(State));