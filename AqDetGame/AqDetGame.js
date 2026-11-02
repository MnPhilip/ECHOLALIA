const canvas = document.getElementById("PlrDisplay");
canvas.width = 1308;
canvas.height = 649;
canvas.style.width = "1308px";
canvas.style.height = "649px";
const playerPH = canvas.getContext("2d");

const initialSetupScreen = document.getElementById("initialSetup");
const beginGameButton = document.getElementById("beginGame");
const levelSelectScreen = document.querySelector(".level-select");
const gameScreen = document.getElementById("gameScreen");
const completionMenu = document.getElementById("completionMenu");
const completionWaiting = document.getElementById("completionWaiting");
const surrenderMenu = document.getElementById("surrenderMenu");
const cancelSurrenderOfferButton = document.getElementById("cancelSurrenderOffer");
const currentLevelTitle = document.getElementById("currentLevelTitle");
const offerSurrenderButton = document.getElementById("offerSurrender");

let stopMain = null;
let lastFrameTime = null;
let counter = 0;

const TOTAL_LEVELS = 5;
const STANDARD_MOVEMENT = 15;
const rectSize = 60;
const moveDistance = 15;
const NO_MOVEMENT = 0;
const pressedKeys = new Set();
const playerVelocity = { x: 0, y: 0 };
let activeMovementElement = null;

let currentLevel = 1;
let currentScreen = 0;
let rectX = 120;
let rectY = 500;
let gravVector = { x: 0, y: 0 };
let RESPAWN_X = rectX;
let RESPAWN_Y = rectY;
let gameStart = false;
let teleportState = null;
let firstTimeTunnel = true;
let spawnIndex = 0;

const ELEMENT_WATER_CURRENT = "waterCurrent";
const CURRENT_TYPES = {
  gentle: { speed: 60 },
  strong: { speed: 120 },
};

const TUNNEL_TIMING = {
  entering: 0.15,
  hidden: 1,
  exiting: 0.15,
};

const SEAWEED_SIZE = 40;
const PUDDLE_SIZE = 50;
const ROCKET_SIZE = 70;
const BUBBLE_SIZE = 80;
const PUSH_ROCK_SIZE = PUDDLE_SIZE;

const level1spawn = [
  { screen: 0, x: 120, y: 480 },
  { screen: 1, x: 120, y: 190 },
  { screen: 2, x: 120, y: 190 },
  { screen: 3, x: 120, y: 190 },
];

const spawnArr = [{ spawnPoints: level1spawn }];

const SPRITES = [];
const UrchinImage = new Image();
UrchinImage.src = "AqDetImport/UrchinEnemy.png";
UrchinImage.onload = () => {
  SPRITES.push(UrchinImage);
};

const enemy = {
  x: 200,
  y: 500,
  width: 50,
  height: 50,
  color: "purple",
};

const waterCurrents = [
  {
    x: 100,
    y: 200,
    width: 250,
    height: 150,
    type: "strong",
    direction: { x: 1, y: 0 },
  },
];

const tunnels = [
  { id: "A", partnerId: "B", x: 100, y: canvas.height - 400, width: 90, height: 45 },
  { id: "B", partnerId: "A", x: 500, y: canvas.height - 600, width: 90, height: 45 },
];

function createBarrier() {
  return [
    [
      { x: 0, y: 0, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: canvas.height - 22, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: canvas.width - 22, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: 260, y: 330, width: 120, height: 24, color: "#2a4b5f" },
    ],
    [
      { x: 0, y: 0, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: canvas.height - 22, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: canvas.width - 22, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: 420, y: 260, width: 100, height: 26, color: "#2a4b5f" },
    ],
    [
      { x: 0, y: 0, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: canvas.height - 22, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: canvas.width - 22, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: 260, y: 210, width: 120, height: 22, color: "#2a4b5f" },
    ],
    [
      { x: 0, y: 0, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: canvas.height - 22, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: canvas.width - 22, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: 480, y: 320, width: 140, height: 24, color: "#2a4b5f" },
    ],
  ];
}

function createInteractables() {
  return [
    [
      { x: 180, y: 260, width: 26, height: 26, color: "#d0f0ff" },
      { x: 640, y: 300, width: 26, height: 26, color: "#d0f0ff" },
    ],
    [
      { x: 300, y: 200, width: 26, height: 26, color: "#d0f0ff" },
      { x: 720, y: 220, width: 26, height: 26, color: "#d0f0ff" },
    ],
    [
      { x: 200, y: 220, width: 26, height: 26, color: "#d0f0ff" },
      { x: 620, y: 330, width: 26, height: 26, color: "#d0f0ff" },
    ],
    [
      { x: 300, y: 250, width: 26, height: 26, color: "#d0f0ff" },
      { x: 760, y: 270, width: 26, height: 26, color: "#d0f0ff" },
    ],
  ];
}

function createJumpPuddle() {
  return [
    [
      { x: 120, y: 450, width: 55, height: 18, color: "#a1d4d6" },
      { x: 610, y: 380, width: 55, height: 18, color: "#a1d4d6" },
    ],
    [
      { x: 150, y: 480, width: 55, height: 18, color: "#a1d4d6" },
      { x: 700, y: 260, width: 55, height: 18, color: "#a1d4d6" },
    ],
    [
      { x: 190, y: 430, width: 55, height: 18, color: "#a1d4d6" },
      { x: 670, y: 300, width: 55, height: 18, color: "#a1d4d6" },
    ],
    [
      { x: 140, y: 470, width: 55, height: 18, color: "#a1d4d6" },
      { x: 660, y: 270, width: 55, height: 18, color: "#a1d4d6" },
    ],
  ];
}

const barriers = createBarrier();
const interactableItems = createInteractables();
const jumpPuddles = createJumpPuddle();

function drawBarriers() {
  for (const b of barriers[currentScreen] || []) {
    playerPH.fillStyle = b.color;
    playerPH.fillRect(b.x, b.y, b.width, b.height);
  }
}

function drawEnemy() {
  if (UrchinImage.complete && UrchinImage.naturalWidth !== 0) {
    playerPH.drawImage(UrchinImage, enemy.x, enemy.y, enemy.width, enemy.height);
    return;
  }
  playerPH.fillStyle = enemy.color;
  playerPH.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function drawWaterCurrents() {
  playerPH.save();
  playerPH.strokeStyle = "lightblue";
  playerPH.fillStyle = "rgba(148, 210, 231, 0.5)";
  playerPH.lineWidth = 3;
  for (const current of waterCurrents) {
    playerPH.strokeRect(current.x, current.y, current.width, current.height);
    playerPH.fillRect(current.x, current.y, current.width, current.height);
  }
  playerPH.restore();
}

function tunnelExit(tunnel) {
  return {
    x: tunnel.x + (tunnel.width - rectSize) / 2,
    y: tunnel.y - rectSize + 4,
  };
}

function drawTunnels() {
  playerPH.save();
  playerPH.lineWidth = 4;
  playerPH.font = "14px Arial";
  playerPH.textAlign = "center";
  playerPH.textBaseline = "bottom";

  for (const tunnel of tunnels) {
    const centerX = tunnel.x + tunnel.width / 2;
    const centerY = tunnel.y + tunnel.height / 2;
    playerPH.beginPath();
    playerPH.ellipse(centerX, centerY, tunnel.width / 2, tunnel.height / 2, 0, 0, Math.PI * 2);
    playerPH.fillStyle = "MediumSpringGreen";
    playerPH.fill();
    playerPH.strokeStyle = "orange";
    playerPH.stroke();
    if (firstTimeTunnel) {
      playerPH.fillText("Press E to teleport", centerX, tunnel.y - 8);
    }
  }
  playerPH.restore();
}

function drawPlayer() {
  if (teleportState?.phase === "hidden") return;

  let scale = 1;
  if (teleportState) {
    const progress = Math.min(teleportState.elapsed / TUNNEL_TIMING[teleportState.phase], 1);
    scale = teleportState.phase === "entering" ? 1 - progress : progress;
  }

  const size = rectSize * scale;
  playerPH.fillStyle = "green";
  playerPH.fillRect(rectX + (rectSize - size) / 2, rectY + (rectSize - size) / 2, size, size);
}

function drawJumpPuddles() {
  for (const d of jumpPuddles[currentScreen] || []) {
    playerPH.fillStyle = d.color;
    playerPH.fillRect(d.x, d.y, d.width, d.height);
  }
}

function drawInteractables() {
  for (const d of interactableItems[currentScreen] || []) {
    playerPH.fillStyle = d.color;
    playerPH.fillRect(d.x, d.y, d.width, d.height);
  }
}

function drawAll() {
  playerPH.clearRect(0, 0, canvas.width, canvas.height);
  drawWaterCurrents();
  drawTunnels();
  drawBarriers();
  drawEnemy();
  drawPlayer();
  drawInteractables();
  drawJumpPuddles();
}

function WCCollision() {
  if (!gameStart) return;

  const overlappingCurrents = waterCurrents.filter((current) => {
    return rectX < current.x + current.width &&
      rectX + rectSize > current.x &&
      rectY < current.y + current.height &&
      rectY + rectSize > current.y;
  });

  for (const current of overlappingCurrents) {
    const currentType = CURRENT_TYPES[current.type];
    if (!currentType) continue;
    elementMovement(ELEMENT_WATER_CURRENT, current.direction, currentType.speed);
  }
}

function elementMovement(elementType, direction, speed) {
  if (elementType !== ELEMENT_WATER_CURRENT || !Number.isInteger(speed) || speed <= 0) return false;

  let directionVector = null;
  if (typeof direction === "string") {
    const normalizedDirection = direction.toLocaleLowerCase();
    const directions = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };
    directionVector = directions[normalizedDirection];
  } else if (direction && Number.isFinite(direction.x) && Number.isFinite(direction.y)) {
    directionVector = direction;
  }

  if (!directionVector) {
    return false;
  }

  const length = Math.hypot(directionVector.x, directionVector.y);
  if (length === 0) return false;

  playerVelocity.x += (directionVector.x / length) * speed;
  playerVelocity.y += (directionVector.y / length) * speed;

  if (activeMovementElement !== elementType) {
    activeMovementElement = elementType;
  }

  return true;
}

function ableToExitTunnel(pcPosition) {
  return (
    pcPosition.x >= 0 &&
    pcPosition.y >= 0 &&
    pcPosition.x + rectSize <= canvas.width &&
    pcPosition.y + rectSize <= canvas.height &&
    !collidesWithBarrier(pcPosition.x, pcPosition.y) &&
    !collidesWithEnemy(pcPosition.x, pcPosition.y)
  );
}

function tunnelCollision() {
  if (!gameStart || teleportState) return false;

  const entrance = tunnels.find((tunnel) => {
    return rectX < tunnel.x + tunnel.width &&
      rectX + rectSize > tunnel.x &&
      rectY < tunnel.y + tunnel.height + 14 &&
      rectY + rectSize > tunnel.y - 14;
  });

  if (!entrance) return false;

  const dest = tunnels.find((tunnel) => {
    return tunnel.id === entrance.partnerId &&
      tunnel.partnerId === entrance.id &&
      tunnel.id !== entrance.id;
  });

  if (!dest || !ableToExitTunnel(tunnelExit(dest))) return false;

  teleportState = {
    dest,
    elapsed: 0,
    sourceX: rectX,
    sourceY: rectY,
    phase: "entering",
  };
  drawAll();
  return true;
}

function collidesWithBarrier(x, y) {
  for (const b of barriers[currentScreen] || []) {
    if (x < b.x + b.width && x + rectSize > b.x && y < b.y + b.height && y + rectSize > b.y) {
      return true;
    }
  }
  return false;
}

function collidesWithEnemy(x, y) {
  if (x < enemy.x + enemy.width && x + rectSize > enemy.x && y < enemy.y + enemy.height && y + rectSize > enemy.y) {
    return true;
  }
  return false;
}

function reachScreenEnd(x) {
  return x < 1 && x > -20;
}

function getSpawnPoint() {
  return spawnArr[currentLevel - 1]?.spawnPoints[spawnIndex] ?? { screen: 0, x: 120, y: 480 };
}

function updateCheckPoint(checknum) {
  const total = spawnArr[currentLevel - 1]?.spawnPoints.length ?? 0;
  if (checknum === spawnIndex + 1 && checknum < total) {
    spawnIndex = checknum;
  }
}

function spawn() {
  teleportState = null;
  const spawnPoint = getSpawnPoint();
  currentScreen = spawnPoint.screen;
  rectX = spawnPoint.x;
  rectY = spawnPoint.y;
  playerPH.clearRect(0, 0, canvas.width, canvas.height);
  drawAll();
}

function respawn() {
  teleportState = null;
  findRespawn();
  removeOldCharacter();
  rectX = RESPAWN_X;
  rectY = RESPAWN_Y;
  reRender(0, 0);
}

function saveRespawnCoordinates(x, y) {
  RESPAWN_X = x;
  RESPAWN_Y = y;
}

function findRespawn() {
  let newResX = 120;
  let newResY = 480;

  if (rectX >= 400) newResX = 700;
  else if (rectX < 400) newResX = 100;

  if (rectY >= 500) newResY = 900;
  else if (rectY < 500) newResY = 100;

  saveRespawnCoordinates(newResX, newResY);
}

function removeOldCharacter() {
  playerPH.clearRect(rectX, rectY, rectSize, rectSize);
}

function reRender(movePosX, movePosY) {
  if (teleportState) return false;

  const nextX = rectX + movePosX;
  const nextY = rectY + movePosY;

  if (reachScreenEnd(nextX)) {
    if (currentScreen === 3) {
      levelCompleted();
      return;
    }

    updateCheckPoint(currentScreen + 1);
    currentScreen += 1;

    const coordinates = spawnArr[currentLevel - 1].spawnPoints[currentScreen];
    rectX = coordinates.x;
    rectY = coordinates.y;
    playerPH.clearRect(0, 0, canvas.width, canvas.height);
    drawAll();
    return;
  }

  if (collidesWithBarrier(nextX, nextY)) {
    return false;
  }

  if (collidesWithEnemy(nextX, nextY)) {
    respawn();
    return false;
  }

  playerPH.clearRect(rectX, rectY, rectSize, rectSize);
  rectX = nextX;
  rectY = nextY;
  drawAll();
  return true;
}

function pcInteract() {
  return tunnelCollision();
}

function moveCharacterWASD(moveKeys) {
  let moveDistanceX = NO_MOVEMENT;
  let moveDistanceY = NO_MOVEMENT;

  if (moveKeys.has("w")) {
    moveDistanceY -= STANDARD_MOVEMENT;
  } else if (moveKeys.has("a")) {
    moveDistanceX -= STANDARD_MOVEMENT;
  } else if (moveKeys.has("s")) {
    moveDistanceY += STANDARD_MOVEMENT;
  } else if (moveKeys.has("d")) {
    moveDistanceX += STANDARD_MOVEMENT;
  }

  reRender(moveDistanceX, moveDistanceY);
}

function updatePhysics(deltaTime) {
  if (teleportState) {
    updateTeleport(deltaTime);
    return;
  }

  playerVelocity.x = 0;
  playerVelocity.y = 0;
  WCCollision();

  if (playerVelocity.x !== 0 || playerVelocity.y !== 0) {
    reRender(playerVelocity.x * deltaTime, playerVelocity.y * deltaTime);
  } else {
    activeMovementElement = null;
  }
}

function updateTeleport(deltaTime) {
  if (!teleportState) return;

  teleportState.elapsed += deltaTime;
  while (teleportState && teleportState.elapsed >= TUNNEL_TIMING[teleportState.phase]) {
    teleportState.elapsed -= TUNNEL_TIMING[teleportState.phase];

    if (teleportState.phase === "entering") {
      teleportState.phase = "hidden";
    } else if (teleportState.phase === "hidden") {
      const exit = tunnelExit(teleportState.dest);
      if (ableToExitTunnel(exit)) {
        rectX = exit.x;
        rectY = exit.y;
      } else {
        rectX = teleportState.sourceX;
        rectY = teleportState.sourceY;
      }
      teleportState.phase = "exiting";
    } else {
      teleportState = null;
    }
  }

  drawAll();
}

function levelCompleted() {
  onLevelCompleted(currentLevel);
  chosenOption = null;
  completionMenu.hidden = false;
  completionMenu.classList.remove("is-waiting");
  completionWaiting.hidden = true;
  completionMenu.querySelectorAll("[data-completion-option]").forEach((button) => {
    button.disabled = false;
  });
}

function onOptionPressed(option) {
  if (chosenOption !== null || !["continue", "exit"].includes(option)) return;
  chosenOption = option;
  completionMenu.classList.add("is-waiting");
  completionWaiting.hidden = false;
  completionMenu.querySelectorAll("[data-completion-option]").forEach((button) => {
    button.disabled = true;
  });
  alertPartnerPlayer(option);
}

function alertPartnerPlayer(flag) {
  window.dispatchEvent(new CustomEvent("echolalia:alternate-player-alert", {
    detail: { option: flag, flag },
  }));
}

function onAlternatePlayerResponse() {
  if (surrenderOfferPending) {
    surrenderOfferPending = false;
    surrenderMenu.hidden = true;
    return;
  }

  if (chosenOption === null) return;

  const responseOption = chosenOption;
  chosenOption = null;
  completionMenu.hidden = true;
  completionMenu.classList.remove("is-waiting");
  completionWaiting.hidden = true;

  if (responseOption === "continue") loadNextLevel();
  else loadLevelSelect();
}

let chosenOption = null;
let surrenderOfferPending = false;
let highestUnlocked = 1;

function isUnlocked(level) {
  return level <= highestUnlocked;
}

function onLevelCompleted(level) {
  if (level === highestUnlocked && level < TOTAL_LEVELS) {
    highestUnlocked = level + 1;
  }
  updateLevelSelectButtons();
}

function onLevelSelected(level) {
  if (!isUnlocked(level)) return;
  loadLevel(level);
}

function updateLevelSelectButtons() {
  document.querySelectorAll(".level[data-level]").forEach((button) => {
    const unlocked = isUnlocked(Number(button.dataset.level));
    button.classList.toggle("is-locked", !unlocked);
    button.disabled = !unlocked;
    button.setAttribute("aria-disabled", String(!unlocked));
    const lock = button.querySelector(".level__lock");
    if (lock) lock.hidden = unlocked;
    if (!unlocked) button.setAttribute("aria-label", `Level ${button.dataset.level} locked`);
    else button.setAttribute("aria-label", `Level ${button.dataset.level}`);
  });
}

function loadLevel(level) {
  currentLevel = level;
  currentScreen = 0;
  levelSelectScreen.hidden = true;
  gameScreen.hidden = false;
  currentLevelTitle.textContent = `Level ${level}`;
  gameStart = true;
  spawn();
  if (stopMain === null) {
    stopMain = window.requestAnimationFrame(main);
  }
}

function loadNextLevel() {
  if (currentLevel < TOTAL_LEVELS) loadLevel(currentLevel + 1);
  else loadLevelSelect();
}

function loadLevelSelect() {
  gameScreen.hidden = true;
  levelSelectScreen.hidden = false;
  gameStart = false;
  playerPH.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLevelOption(level, unlocked) {
  const button = document.querySelector(`.level[data-level="${level}"]`);
  if (!button) return;
  const lock = button.querySelector(".level__lock");
  button.disabled = !unlocked;
  button.classList.toggle("is-locked", !unlocked);
  if (lock) lock.hidden = unlocked;
}

function levelSelectDisplay() {
  for (let level = 1; level <= TOTAL_LEVELS; level++) {
    drawLevelOption(level, isUnlocked(level));
  }
  initialSetupScreen.hidden = true;
  levelSelectScreen.hidden = false;
}

function onSetupKeyDown(event) {
  if (event.key !== "Enter") return;
  if (levelSelectShown) return;
  levelSelectShown = true;
  levelSelectDisplay();
}

window.main = (timestamp = performance.now()) => {
  if (!gameStart) {
    stopMain = null;
    lastFrameTime = null;
    return;
  }

  const deltaTime = lastFrameTime === null ? 0 : Math.min((timestamp - lastFrameTime) / 1000, 0.05);
  lastFrameTime = timestamp;
  counter += 1;
  updatePhysics(deltaTime);
  stopMain = window.requestAnimationFrame(main);
};

function start() {
  canvas.style.width = "1308px";
  canvas.style.height = "649px";
  playerPH.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameStart) {
    playerPH.fillStyle = "Black";
    playerPH.font = "80px Arial";
    playerPH.textAlign = "center";
    playerPH.textBaseline = "middle";
    playerPH.fillText("PRESS ENTER TO START", canvas.width / 2, canvas.height / 2);
  } else {
    spawn();
  }
}

function onOfferSurrender() {
  if (surrenderOfferPending) return;
  surrenderOfferPending = true;
  surrenderMenu.hidden = false;
  alertPartnerPlayer("surrender-offered");
}

function startLoopFromKeydown() {
  if (!gameStart || !stopMain) {
    return;
  }
  stopMain = window.requestAnimationFrame(main);
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (event.key === "Enter" && !gameStart) {
    gameStart = true;
    loadLevel(1);
    return;
  }

  if (!gameStart || gameScreen.hidden || !completionMenu.hidden) return;

  if (["w", "a", "s", "d"].includes(key)) {
    pressedKeys.add(key);
    moveCharacterWASD(pressedKeys);
  }

  if (key === "e") {
    pcInteract();
  } else if (key === "c") {
    respawn();
  }

  if (key === " ") {
    return;
  }
});

window.addEventListener("keyup", (event) => {
  pressedKeys.delete(event.key.toLowerCase());
});

window.addEventListener("echolalia:alternate-player-response", onAlternatePlayerResponse);
window.levelCompleted = levelCompleted;
window.onAlternatePlayerResponse = onAlternatePlayerResponse;
window.levelSelectDisplay = levelSelectDisplay;

beginGameButton.addEventListener("click", () => {
  levelSelectDisplay();
});

document.querySelectorAll(".level[data-level]").forEach((button) => {
  button.addEventListener("click", () => onLevelSelected(Number(button.dataset.level)));
});

completionMenu.querySelectorAll("[data-completion-option]").forEach((button) => {
  button.addEventListener("click", () => onOptionPressed(button.dataset.completionOption));
});

offerSurrenderButton.addEventListener("click", onOfferSurrender);
cancelSurrenderOfferButton.addEventListener("click", () => {
  if (!surrenderOfferPending) return;
  surrenderOfferPending = false;
  surrenderMenu.hidden = true;
  alertPartnerPlayer("surrender-offer-cancelled");
});

document.addEventListener("keydown", onSetupKeyDown);

let levelSelectShown = false;
updateLevelSelectButtons();
initialSetupScreen.hidden = true;
levelSelectScreen.hidden = false;
start();
