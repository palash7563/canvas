const canva = document.querySelector("canvas");

canva.width = window.innerWidth;
canva.height = window.innerHeight;

const contest = canva.getContext("2d");

let mouse = {
  x: undefined,
  y: undefined
};

const minRadius = Math.random() + 2;
const maxRadius = Math.random() + 30;

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function() {
  canva.width = window.innerWidth;
  canva.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = color;

  this.draw = function() {
    contest.beginPath();
    contest.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    contest.strokeStyle = this.color;
    contest.stroke();
    contest.fillStyle = this.color;
    contest.fill();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    this.draw();
  };
}

const circleArray = [];
for (let i = 0; i < 100; i++) {
  let x = Math.random() * innerWidth;
  let y = Math.random() * innerHeight;
  let dx = (Math.random() - 0.5) * 10;
  let dy = (Math.random() - 0.5) * 10;
  let radius = Math.floor(Math.random() * 15) + 1;

  circleArray.push(new Circle(x, y, dx, dy, radius, "blue"));
}
for (let i = 0; i < 100; i++) {
  let x = Math.random() * innerWidth;
  let y = Math.random() * innerHeight;
  let dx = (Math.random() - 0.5) * 10;
  let dy = (Math.random() - 0.5) * 10;
  let radius = Math.floor(Math.random() * 15) + 1;

  circleArray.push(new Circle(x, y, dx, dy, radius, "red"));
}
for (let i = 0; i < 100; i++) {
  let x = Math.random() * innerWidth;
  let y = Math.random() * innerHeight;
  let dx = (Math.random() - 0.5) * 10;
  let dy = (Math.random() - 0.5) * 10;
  let radius = Math.floor(Math.random() * 15) + 1;

  circleArray.push(new Circle(x, y, dx, dy, radius, "black"));
}

function animate() {
  requestAnimationFrame(animate);
  contest.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
