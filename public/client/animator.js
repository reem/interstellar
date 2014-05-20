exports.animator = function (canvas, canvasContext) {
  var renderParticle = function (particle) {
    canvasContext.fillStyle = particle.color;
    canvasContext.fillRect(particle.pos.x, particle.pos.y, 1, 1);
  };

  var renderEmitter = function (emitter) {
    renderCircle("#0ff", emitter.pos, 4);
  };

  var renderCircle = function (color, location, size) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(location.x, location.y, size, 0, Math.PI * 2);
    canvasContext.closePath();
    canvasContext.fill();
  };

  var renderField = function (field) {
    renderCircle(field.color, field.pos, 4);
  };

  var renderFieldLine = function () {
    // Theoretical
    throw new Error("Not implemented: renderFieldLine");
  };

  var clear = function (canvasContext) {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  };

  var animateState = function (state) {
    clear(canvasContext);
    _.map(state.particles, renderParticle);
    _.map(state.emitters, renderEmitter);
    _.map(state.fields, renderField);
  };

  return animateState;
};