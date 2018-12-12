const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

class Ball {
   constructor() {
      this.radius = randomGenerator(20, 50);
      this.x = randomGenerator(this.radius, canvas.width - this.radius);
      this.y = randomGenerator(this.radius, canvas.height - this.radius);
      this.dx = randomGenerator(-20, 20);
      this.dy = randomGenerator(-10, 10);
   }

   Draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fillStyle = "#000000";
      context.fill();
      context.closePath();
   }

   Move() {
      this.x += this.dx;
      this.y += this.dy;

      if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
         this.dx = -this.dx;
      }

      if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
         this.dy = -this.dy;
      }

      this.Draw();
   }
}

function randomGenerator(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
