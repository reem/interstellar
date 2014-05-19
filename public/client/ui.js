$(document).ready(function () {
  var canvas = document.getElementById("main");
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  timeStream = new TimeStream(canvas, ctx);
  timeStream.addEmitter(
    new Emitter(new Vector(100, 230), Vector.fromAngle(5, 0)));

  timeStream.addEmitter(
    new Emitter(new Vector(100, 430), Vector.fromAngle(5, 0)));

  timeStream.addEmitter(
    new Emitter(new Vector(100, 630), Vector.fromAngle(5, 0)));

  timeStream.addEmitter(
    new Emitter(new Vector(900, 230), Vector.fromAngle(5, -Math.PI)));

  timeStream.addEmitter(
    new Emitter(new Vector(900, 430), Vector.fromAngle(5, -Math.PI)));

  timeStream.addEmitter(
    new Emitter(new Vector(900, 630), Vector.fromAngle(5, -Math.PI)));

  timeStream.addEmitter(
    new Emitter(new Vector(500, 100), Vector.fromAngle(5, Math.PI / 2)));

  timeStream.addEmitter(
    new Emitter(new Vector(500, 800), Vector.fromAngle(5, -Math.PI / 2)));

  setInterval(function () {
    if (timeStream.fields.length > 5) { return; }
      times(5, function () {
      timeStream.addFieldParticle(
        new FieldParticle(new Vector(Math.random() * 1000, Math.random() * 1000),
          new Vector((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2), undefined,
          (Math.random() -0.5) * 10000)
      );
    }); 
  }, 3000);
  timeStream.run();
});