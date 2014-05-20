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

  var renderLine = function (color, from, to) {
    canvasContext.beginPath();
    canvasContext.moveTo(from.x, from.y);
    canvasContext.lineTo(to.x, to.y);
    canvasContext.strokeStyle = color;
    canvasContext.stroke();
  };

  var renderField = function (field) {
    renderCircle(field.color, field.pos, 4);
  };

  var renderFieldLines = function (state) {
    _.each(state.fields, function (field) {
      for (var i = 0; i < state.particles.length; i++) {
        renderLine(field.color, field.pos, state.particles[i].pos);
      }
    });
  };

  var clear = function (canvasContext) {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  };

  var animateState = function (state) {
    clear(canvasContext);
    _.map(state.particles, renderParticle);
    _.map(state.emitters, renderEmitter);
    _.map(state.fields, renderField);
    // renderFieldLines(state);
  };

  return animateState;
};