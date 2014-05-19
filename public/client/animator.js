var Animator = {};

(function (exports) {
  var animateState = function (state) {
    _.map(state.particles, renderParticle);
    _.map(state.emitters, renderEmitter);
    _.map(state.fields, renderField);
  };

  var renderParticle = function (particle) {

  };

  var renderEmitter = function (emitter) {

  };

  var renderField = function (field) {

  };

  var renderFieldLine = function () {
    // Theoretical
    throw new Error("Not implemented: renderFieldLine");
  };

  exports.animator = animateState;
}(Animator));