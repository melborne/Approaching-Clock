var canvas = {};
var x, y;
$(document).ready(function(){
  canvas.c = $("canvas#clock");
  canvas.ctx = canvas.c[0].getContext('2d');
  canvas.width = canvas.c.width();
  canvas.height = canvas.c.height();
  
  canvas.ctx.translate(canvas.width/2, canvas.height/2);
  
  const min = 60;
  var x = min;
  var sp = 2;
  clock(x);
  setInterval(
    function(){
      clock(x);
      x += sp;
      if (x > canvas.width*0.6 || x < min) { sp = -sp };
    },
    500
  );
})

function clock (radius) {
  canvas.ctx.clearRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
  var unit = radius/75;
  drawFrame(radius, '#325FA2');
  canvas.ctx.save();
  canvas.ctx.rotate(-Math.PI/2); //set start angle at twelve o'clock
  drawHand('hr', radius*0.5, unit*3, unit*5, 'black');
  drawHand('min', radius*0.9, unit*2, unit*10, 'black');
  drawHand('sec', radius*0.9, unit, unit*5, 'red');
  canvas.ctx.restore();
}

function drawFrame (radius, color) {
  drawCircle(radius, radius*0.1, color, false);
  drawPitchLines(radius*0.9, 2, 1);
  drawNumbers(radius/5, radius*0.7, color);
}

function drawCircle (distance, width, color, filly) {
  var ctx = canvas.ctx;
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.arc(0, 0, distance, 0, 2*Math.PI, true);
  filly ? ctx.fill() : ctx.stroke();
}

function drawPitchLines (distance, length, width) {
  var ctx = canvas.ctx;
  ctx.save();
  for (var i=0; i < 60; i++) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    var len = i%5==0 ? length*3 : length;
    ctx.moveTo(0, -distance);
    ctx.lineTo(0, -(distance-len));
    ctx.stroke();
    ctx.rotate(2*Math.PI/60);
  };
  ctx.restore();
}

function drawNumbers (size, distance, color) {
  var ctx = canvas.ctx;
  ctx.font = size + "px Helvetica";
  ctx.fillStyle = color;
  
  for (var i=1; i <= 12; i++) {
    ctx.save();
    ctx.translate(distance*Math.sin(Math.PI/6*i), -distance*Math.cos(Math.PI/6*i));
    ctx.fillText(i, -size/3, size/3);
    ctx.restore();
  };
}

function drawHand (unit, length, width, offset, color) {
  var now = new Date();
  var hr = now.getHours(), min = now.getMinutes(), sec = now.getSeconds();
  hr = hr >= 12 ? hr-12 : hr;
  var _360 = 2*Math.PI;

  var angle;
  if (unit=='hr') {
    angle = hr*_360/12 + min*_360/(12*60) + sec*_360/(12*60*60);
  } else if (unit=='min') {
    angle = min*_360/60 // + sec*_360/(60*60);
  } else {
    angle = sec*_360/60;
  };

  var ctx = canvas.ctx;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(-offset,0);
  ctx.lineTo(length,0);
  ctx.stroke();
  ctx.restore();
}
