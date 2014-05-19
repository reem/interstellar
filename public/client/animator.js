exports.animator = function (canvas) {
  var renderParticle = function (particle) {
    canvas.context.fillStlye = particle.color;
    canvas.context.fillRect(particle.pos.x, particle.pos.y, 1, 1);
  };

  var renderEmitter = function (emitter) {

  };

  var renderCircle = function (color, location, size) {
    canvas.context.fillStyle = color;
    canvas.context.beginPath();
    canvas.context.arc(location.x, location.y, size, 0, Math.PI * 2);
    canvas.context.closePath();
    canvas.context.fill();
  };

  var renderField = function (field) {
    renderCircle(field.color, field.pos, 4);
  };

  var renderFieldLine = function () {
    // Theoretical
    throw new Error("Not implemented: renderFieldLine");
  };

  var clear = function (canvas) {
    canvas.context.clearRect(0, 0, canvas.width, canvas.height);
  };

  var animateState = function (state) {
    clear(canvas);
    _.map(state.particles, renderParticle);
    _.map(state.emitters, renderEmitter);
    _.map(state.fields, renderField);
  };

  exports.animator = animateState;
};