const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let loop;
let numOfBalls = 1;
const numOfBallsLimit = 30;
let balls = [];
const colors = ["#00a8ff", "#9c88ff", "#fbc531", "#4cd137", "#e84118"];

class Ball {
   constructor() {
      this.radius = randomGenerator(20, 50);
      this.color = colors[randomGenerator(0, (colors.length - 1))];
      this.x = randomGenerator(this.radius, canvas.width - this.radius);
      this.y = randomGenerator(this.radius, canvas.height - this.radius);
      this.dx = randomGenerator(-20, 20);
      this.dy = randomGenerator(-10, 10);
   }

   Draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
   }

   Move() {
      this.x += this.dx;
      this.y += this.dy;

      if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
         this.dx = -this.dx;
         this.ChangeColor();
      }

      if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
         this.dy = -this.dy;
         this.ChangeColor();
      }

      this.Draw();
   }

   ChangeColor() {
      let newColor = colors[randomGenerator(0, (colors.length - 1))];
      while(newColor === this.color) {
         newColor = colors[randomGenerator(0, (colors.length - 1))];
      }
      this.color = newColor;
   }
}

function AddNewBall(event) {
   if(event.keyCode === 32 && numOfBalls < numOfBallsLimit) {
      balls.push(new Ball());
      numOfBalls++;
   }
}

function randomGenerator(min, max) {
   let rnd;
   do {
      rnd = Math.floor(Math.random() * (max - min + 1)) + min;
   }
   while(rnd === 0)
   return rnd;
}

function Init() {
   for(let i = 0; i < numOfBalls; i++) {
      balls.push(new Ball());
   }
}

function Gameloop() {
   loop = requestAnimationFrame(Gameloop);
   context.clearRect(0, 0, canvas.width, canvas.height);
   for(let i = 0; i < balls.length; i++) {
      balls[i].Move();
   }
}

Init();
Gameloop();

window.addEventListener("keydown", AddNewBall);
