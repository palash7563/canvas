const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: undefined,
  y: undefined
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.distanceFromCenter = {
    x: randomIntFromRange(100, 200),
    y: randomIntFromRange(100, 200)
  };
  this.lastMouse = { x: x, y: y };

  this.update = function() {
    const lastpoint = { x: this.x, y: this.y };
    this.radians += this.velocity;
    this.x = mouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
    this.y = mouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    this.draw(lastpoint);
  };

  this.draw = function(lastpoint) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastpoint.x, lastpoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  };
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 400; i++) {
    particles.push(
      new Particle(
        Math.random() * canvas.width + 10,
        Math.random() * canvas.height + 10,
        Math.random() * 50,
        randomColor(colors)
      )
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rbga(255,255,255,0.05)";
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(Particle => {
    Particle.update();
  });
}

init();
animate();
