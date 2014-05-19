/* globals Utility */
var Update = {};

(function (exports) {
  var update = function (state) {
    // Emit all new particles -- O(n)
    Utility.methodMap(state.emitters, 'emit');

    // Submit all particles to all fields -- O(n * m) -- the bottleneck
    var affecters = _.pluck(state.fields, 'affect'); // Cache property lookup.
    _.each(state.particles, function (particle) {
      particle.acceleration.x = particle.acceleration.y = 0; // No GC on Vectors!
      Utility.reverseMap(affecters, particle);
    });

    // Move all particles -- O(n)
    Utility.methodMap(state.particles, 'move');
  };

  exports.update = update;
}(Update));