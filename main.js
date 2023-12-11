const RIGHT = 39;
const LEFT = 37;
const UP = 38;
const DOWN = 40;

const MAX_VELOCITY = 25;
const ACCELLERATION = 2;
const DRAG = .95;
const GRAVITY = 1;
const BOUNCE = .75;

const isKeyDown = Array(255).fill(false);
onkeydown = onkeyup = (e) => {
  isKeyDown[e.keyCode] = e.type === "keydown";
  e.preventDefault(); 
};

let position = {
  x: innerWidth / 2,
  y: 0
};
let velocity = {
  x: 0,
  y: 0
};

const clamp = (value, min, max) => value > min ? value < max ? value : max : min;

const ball = document.querySelector(".ball");

function renderLoop() {
  requestAnimationFrame(renderLoop);

  const width = innerWidth - ball.offsetWidth;
  const height = innerHeight - ball.offsetHeight;

  velocity.x = clamp(
    velocity.x * DRAG + (isKeyDown[RIGHT] - isKeyDown[LEFT]) * ACCELLERATION, 
    -MAX_VELOCITY,
    MAX_VELOCITY
  );
  velocity.y = clamp(
    velocity.y * DRAG + GRAVITY + (isKeyDown[DOWN] - isKeyDown[UP]) * ACCELLERATION, 
    -MAX_VELOCITY,
    MAX_VELOCITY
  );

  position.x += velocity.x;
  position.y += velocity.y;

  if (position.x <= 0) {
    position.x = -position.x;
    velocity.x *= -BOUNCE;
  }

  if (position.x >= width) {
    position.x = 2 * width - position.x;
    velocity.x *= -BOUNCE;
  }

  if (position.y <= 0) {
    position.y = -position.y;
    velocity.y *= -BOUNCE;
  }

  if (position.y >= height) {
    position.y = 2 * height - position.y;
    velocity.y *= -BOUNCE;
  }

  ball.style.transform = `translate(${position.x}px, ${position.y}px)`;
}

renderLoop();
window.focus();
