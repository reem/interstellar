var Utility = require('./utility.js');
var Index = require('./index.js');
var Vector = require('./vector.js');

var update = function (state) {
  var i = 0;
  // Emit all new particles -- O(n)
  if (state.particles.length < Index.particleLimit) {
    state.particles = state.particles.concat(_.flatten(Utility.methodMap(state.emitters, 'emit')));
  }

  // Move all particles -- O(n)
  for (i = 0; i < state.particles.length; i++) { // Making this a for loop sped up the code by 10x
    state.particles[i].move();
  }

  // Submit all particles to all fields -- O(n * m) -- the bottleneck
  var affecters = _.pluck(state.fields, 'affect'); // Cache property lookup.
  _.each(state.particles, function affectParticle (particle) {
    particle.acc.x = particle.acc.y = 0; // No GC on Vectors!
    for (var i = 0; i < affecters.length; i++) {
      affecters[i](particle);
    }
  });

  // Remove all particles that are out of bounds
  state.particles = _.reject(state.particles, function removeParticle (particle) {
    return particle.pos.x > Index.xBound || particle.pos.y > Index.yBound || particle.pos.y < 0 || particle.pos.x < 0;
  }); 
  return state;
};

exports.update = update;