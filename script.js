const map = document.querySelector("#game");
const canvas = map.getContext("2d");
canvas.fillStyle = "rgb(228, 164, 0)";

const maxX = 800;
const maxY = 585;
const grid = 5;

const sizeX = 5 * grid;
const sizeY = 5 * grid;

const upDiv = document.querySelector(".first");
const leftDiv = document.querySelector(".second");
const rightDiv = document.querySelector(".fourty");
const downDiv = document.querySelector(".fifty");

let canShoot = true;

const player = {
  x: maxX / 2 - sizeX / 2,
  y: maxY / 2 + 2.5 - sizeY / 2,
  speed: grid,
  dx: 0,
  dy: 0,
  facing: "north",
};

const projectile = {
  x: 0,
  y: 0,
  dy: 0,
  dx: 0,
  sizeX: 5,
  sizeY: 7,
  speed: 3 * grid,
};

let projectiles = [];

function renderPlayer() {
  canvas.fillRect(player.x, player.y, sizeX, sizeY);
  canvas.fillStyle = "rgb(200,50,50)";
  if (player.facing === "north") {
    canvas.fillRect(player.x + sizeX / 2 - 1, player.y - 2 * grid, 3, 2 * grid);
  } else if (player.facing === "south") {
    canvas.fillRect(player.x + sizeX / 2 - 1, player.y + sizeY, 3, 2 * grid);
  } else if (player.facing === "east") {
    canvas.fillRect(player.x + sizeX, player.y + sizeY / 2 - 1, 2 * grid, 3);
  } else if (player.facing === "west") {
    canvas.fillRect(player.x - 2 * grid, player.y + sizeY / 2 - 1, 2 * grid, 3);
  }
  canvas.fillStyle = "rgb(228,164,0)";
}

function clearMap() {
  canvas.clearRect(0, 0, maxX, maxY);
}

function movePlayer() {
  player.x += player.speed * player.dx;
  player.y += player.speed * player.dy;
}

function shoot() {
  let laser = projectile;
  if (canShoot) {
    if (player.facing === "north") {
      laser.dy = -1;
      laser.dx = 0;
      laser.sizeX = sizeX;
      laser.sizeY = 20;
      laser.x = player.x;
      laser.y = player.y - 7;
    } else if (player.facing === "south") {
      laser.dy = 1;
      laser.dx = 0;
      laser.sizeX = sizeX;
      laser.sizeY = 20;
      laser.x = player.x;
      laser.y = player.y + sizeY;
    } else if (player.facing === "east") {
      laser.dx = 1;
      laser.dy = 0;
      laser.sizeX = 20;
      laser.sizeY = sizeY;
      laser.x = player.x + sizeX;
      laser.y = player.y;
    } else if (player.facing === "west") {
      laser.dx = -1;
      laser.dy = 0;
      laser.sizeX = 20;
      laser.sizeY = sizeY;
      laser.x = player.x - 7;
      laser.y = player.y;
    }

    projectiles.push({
      x: laser.x,
      y: laser.y,
      dx: laser.dx,
      dy: laser.dy,
      sizeX: laser.sizeX,
      sizeY: laser.sizeY,
    });
  }
}

function moveProjectile() {
  for (let i = 0; i <= projectiles.length - 1; i++) {
    projectiles[i].x += projectile.speed * projectiles[i].dx;
    projectiles[i].y += projectile.speed * projectiles[i].dy;
  }
}

function deleteProjectile() {
  for (let i = 0; i <= projectiles.length - 1; i++) {}
  if (
    projectiles[i].x > maxX + 40 ||
    projectiles[i].x < -40 ||
    projectiles[i].y < -40 ||
    projectiles[i].y > maxY + 40
  ) {
    projectiles.splice(i);
  }
}

function renderProjectiles() {
  for (let i = 0; i <= projectiles.length - 1; i++) {
    canvas.fillStyle = "rgb(228, 228, 228)";
    canvas.fillRect(
      projectiles[i].x,
      projectiles[i].y,
      projectiles[i].sizeX,
      projectiles[i].sizeY
    );
    canvas.fillStyle = "rgb(228, 164, 0)";
  }
}

function loop() {
  clearMap();

  movePlayer();
  renderPlayer();

  moveProjectile();
  renderProjectiles();

  requestAnimationFrame(loop);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "w" || event.key === "ц") {
    player.dy = -1;
  } else if (event.key === "s" || event.key === "ы") {
    player.dy = 1;
  } else if (event.key === "d" || event.key === "в") {
    player.dx = 1;
  } else if (event.key === "a" || event.key === "ф") {
    player.dx = -1;
  } else if (event.key === " ") {
    shoot();
    canShoot = false;
  }
});

document.addEventListener("keyup", (event) => {
  if (
    event.key === "w" ||
    event.key === "ц" ||
    event.key === "s" ||
    event.key === "ы"
  ) {
    player.dy = 0;
  } else if (
    event.key === "d" ||
    event.key === "в" ||
    event.key === "a" ||
    event.key === "ф"
  ) {
    player.dx = 0;
  } else if (event.key === " ") {
    canShoot = true;
  }
});

upDiv.addEventListener("mouseover", () => {
  player.facing = "north";
});
leftDiv.addEventListener("mouseover", () => {
  player.facing = "west";
});
rightDiv.addEventListener("mouseover", () => {
  player.facing = "east";
});
downDiv.addEventListener("mouseover", () => {
  player.facing = "south";
});

requestAnimationFrame(loop);
