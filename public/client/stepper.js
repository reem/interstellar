var Utility = require('./utility.js');
var Index = require('./index.js');
var SplitTree = require('./splittree.js').SplitTree;
var QuadTree = require('./quadtree.js');
var Vector = require('./vector.js');

var update = function (state) {
  var i = 0;
  // Emit all new particles -- O(n)
  if (state.particles.length < Index.particleLimit) {
    state.particles = state.particles.concat(_.flatten(Utility.methodMap(state.emitters, 'emit')));
  }

  // Submit all particles to all fields -- O(n * m) -- the bottleneck
  var affecters = _.pluck(state.fields, 'affect'); // Cache property lookup.
  _.each(state.particles, function affectParticle (particle) {
    particle.acc.x = particle.acc.y = 0; // No GC on Vectors!
    for (var i = 0; i < affecters.length; i++) {
      affecters[i](particle);
    }
  });

  var collisionTree = new SplitTree(
    new QuadTree.ParticleBox(
      QuadTree.ParticlePoint.fromVector(new Vector.Vector(Index.xBound, Index.yBound)),
      QuadTree.ParticlePoint.fromVector(new Vector.Vector(0, 0))
    ));
  for (i = 0; i < state.particles.length; i++) {
    collisionTree.insert(new QuadTree.ParticlePoint(state.particles[i]));
  }
  for (i = 0; i < state.particles.length; i++) {
    var near = collisionTree.near(new QuadTree.ParticlePoint(state.particles[i]));
    if (!near) { continue; }
    for (var j = 0; j < near.length; j++) {
      if (Math.abs(state.particles[i].pos.x - near[j].particle.pos.x) <= 1 && Math.abs(state.particles[i].pos.y - near[j].particle.pos.y) <= 1) {
        if (state.particles[i].vel.dotproduct(near[j].vel) > 0) {
          var temp = state.particles[i].vel;
          state.particles[i].vel = near[j].particle.vel;
          near[j].particle.vel = temp;
        }  
      }
    }
  }

  // Move all particles -- O(n)
  for (i = 0; i < state.particles.length; i++) { // Making this a for loop sped up the code by 10x
    state.particles[i].move();
  }

  // Remove all particles that are out of bounds
  state.particles = _.reject(state.particles, function removeParticle (particle) {
    return particle.pos.x > Index.xBound || particle.pos.y > Index.yBound;
  }); 
  return state;
};

exports.update = update;