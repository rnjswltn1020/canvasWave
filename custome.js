import WaveGroup from "./waveGroup.js";

class App {
  constructor() {
    // canvas 생성
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.waveGroup = new WaveGroup();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    this.waveGroup.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.waveGroup.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
  init();
};

// mouse cursor 생성
const cursor = document.createElement("canvas");
const ctx = cursor.getContext("2d");

function init() {
  if (cursor.getContext) {
    cursor.classList.add("cursor");
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.width = "300px";
    cursor.style.height = "300px";
    document.body.appendChild(cursor);
    draw(ctx);
    window.addEventListener("mousemove", mouseMove);
  }
}

function mouseMove(e) {
  let stageHalfHeight = document.body.clientHeight / 2;

  if (e.clientY > stageHalfHeight) {
    console.log(e.clientY);
    // cursor.style.transform = "rotate(45deg)";
    cursor.classList.add("moving");
  } else {
    cursor.style.transform = "rotate(100deg)";
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.classList.remove("moving");
  }
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
}

function draw(ctx) {
  // fish tail
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#ecb117";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(45, 45);
  ctx.lineTo(110, 65);
  ctx.lineTo(45, 90);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  //fish body
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#ecb117";
  ctx.beginPath();
  ctx.moveTo(110, 65);
  ctx.quadraticCurveTo(115, 40, 150, 36);
  ctx.quadraticCurveTo(155, 20, 160, 27);
  ctx.quadraticCurveTo(170, 20, 175, 27);
  ctx.quadraticCurveTo(180, 20, 185, 27);
  ctx.quadraticCurveTo(190, 20, 195, 27);
  ctx.quadraticCurveTo(200, 20, 205, 27);
  ctx.quadraticCurveTo(235, 30, 270, 70);
  ctx.quadraticCurveTo(240, 110, 160, 100);
  ctx.quadraticCurveTo(125, 95, 110, 70);
  ctx.stroke();
  ctx.fill();
  //eyes
  const circle = new Path2D();
  ctx.fillStyle = "#fff";
  circle.arc(220, 60, 5, 0, Math.PI * 2, true);
  ctx.fill(circle);
}
