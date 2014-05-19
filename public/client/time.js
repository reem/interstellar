var maxParticles = 10000; // Cap on number of particles for performance reasons.
var emissionRate = 8; // Per Emitter, Per Frame
var particleSize = 1; // How big our particles are.

var TimeStream = function (canvas, context) {
  this.canvas = canvas;
  this.context = context;

  this.particles = [];
  this.emitters = [];
  this.fields = [];
};

TimeStream.prototype.addEmitter = function (emitter) {
  this.emitters.push(emitter);
};

TimeStream.prototype.addField = function (field) {
  this.fields.push(field);
};

TimeStream.prototype.addFieldParticle = function (fieldParticle) {
  this.particles.push(fieldParticle);
  this.fields.push(fieldParticle.field);
};

TimeStream.prototype.timeStep = function TimeStep() {
  this.clear(); 
  this.update();
  this.draw();
};

TimeStream.prototype.clear = function Clear() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

TimeStream.prototype.run = function Run() {
  this.timeStep();
  // Launch the animation loop.
  // We use this instread of setInterval because it lets the browser
  // do more intelligent scheduling for us.
  var that = this;
  window.requestAnimationFrame(function () { that.run(); });
};

TimeStream.prototype.update = function Update() {
  this.addNewParticles();
  this.plotParticles();
  this.filterFields();
};

TimeStream.prototype.filterFields = function FilterFields() {
  this.fields = _.filter(this.fields, function (field) {
    return withinBounds(this.canvas.width, this.canvas.height, field.position); 
  }, this);
};

TimeStream.prototype.draw = function Draw() {
  this.context.fillStyle = 'rgb(255,255,255)';
  var context = this.context;

  _.each(this.particles, function (particle) {
    context.fillRect(particle.position.x, particle.position.y, 
      particleSize, particleSize); // Draw a rectangle of the right size.
  });

  _.each(this.fields, _.partial(drawCircle, this.context));
};

TimeStream.prototype.addNewParticles = function AddNewParticles() {
  if (this.particles.length > maxParticles + 5) {
    return;
  }

  _.each(this.emitters, function (emitter) {
    times(emissionRate, function Emit() {
      this.particles.push(emitter.emitParticle());
    }, this);
  }, this);
};

var withinBounds = function (xBound, yBound, vector) {
  return !(vector.x > xBound || vector.y < 0 || vector.y > yBound);
};

TimeStream.prototype.plotParticles = function PlotParticles() {
  var currentParticles = []; // Eventually replaces this.particles to clear out old particles. 
  var xBound = this.canvas.width;
  var yBound = this.canvas.height;

  _.each(this.particles, function (particle) {
    var pos = particle.position;

    if (!(withinBounds(xBound, yBound, pos)))  {
      return; // Don't add this particle and move on.
    }

    particle.submitToFields(this.fields);

    // Moves the particle to its new location.
    particle.move();

    // We still care about this particle, so add it to the currentParticles array.
    currentParticles.push(particle);
  }, this);

  this.particles = currentParticles; // Reset particles.
};

