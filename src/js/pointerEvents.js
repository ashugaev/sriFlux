const deltaPxBeforeScroll = 30;
const deltaDegBeforePinch = 5;
const deltaPxBeforeRotate = 1;

const zoomSensitivity = 0.3;
const rotateSensitivity = 0.008;

let events = {};
let temp = {};

const eventsObject = document.querySelector(".itemImage__img");

function init() {
  eventsObject.addEventListener("pointerdown", handleStart, false);
  eventsObject.addEventListener("pointermove", handleMove, false);
  eventsObject.addEventListener("pointerup", handleEnd, false);
  eventsObject.addEventListener("pointercancel", handleEnd, false);
}

window.addEventListener(
  "load",
  function() {
    // В гайде через setTimeout чинили какой-то фикс загрузки
    setTimeout(init, 100);
  },
  false
);

function handleStart(e) {
  const onePointer = (events[e.pointerId] = {});

  onePointer.deltaX = 0;
  onePointer.deltaY = 0;
  onePointer.prevX = e.clientX;
  onePointer.prevY = e.clientY;
}

function handleMove(e) {
  if (!events[e.pointerId]) return;

  switch (Object.keys(events).length) {
    case 1:
      handleScroll(e);
      break;
    case 2:
      handleTwoPointers(e);
      break;
  }
}

function handleEnd(e) {
  delete events[e.pointerId];

  if (e.isPrimary) temp = {};
}

// Horizontal one finger scroll
function handleScroll(e) {
  const id = e.pointerId;
  const onePointer = events[id];

  onePointer.oneStepDeltaX = onePointer.prevX - e.clientX;
  onePointer.oneStepDeltaY = onePointer.prevY - e.clientY;
  onePointer.deltaX -= onePointer.oneStepDeltaX;
  onePointer.deltaY += onePointer.oneStepDeltaY;
  onePointer.prevX = e.clientX;
  onePointer.prevY = e.clientY;

  if (
    Math.abs(events[id].deltaX) < deltaPxBeforeScroll &&
    !events[id].freeToScroll
  )
    return;

  if (!events[id].freeToScroll) {
    events[id].deltaX = parseFloat(eventsObject.style.backgroundPositionX) || 0;
    events[id].freeToScroll = true;
  }

  eventsObject.style.backgroundPositionX = `${events[id].deltaX}px`;
}

function handleTwoPointers(e) {
  if (!Object.keys(temp).length) {
    temp = {
      firstPointerCoordinates: {},
      secondPointerCoordinates: {},
      prevFirstPointerCoordinates: {},
      prevSecondPointerCoordinates: {},
      prevPointersDist: 0,
      initialDist: 0,
      freeToPinch: false,
      freeToRotate: false,
      prevAngle: 0,
      initialAngle: 0
    };
  }

  e.isPrimary
    ? (temp.firstPointerCoordinates = {
        x: e.clientX,
        y: e.clientY
      })
    : (temp.secondPointerCoordinates = {
        x: e.clientX,
        y: e.clientY
      });

  if (!temp.firstPointerCoordinates.x || !temp.secondPointerCoordinates.x)
    return;

  pinchIndicate();
  rotateIndicate();
}

function rotateIndicate() {
    if (temp.freeToPinch) return;

    if (!Object.keys(temp.prevFirstPointerCoordinates).length) {
      temp.prevFirstPointerCoordinates = temp.firstPointerCoordinates;
      temp.prevSecondPointerCoordinates = temp.secondPointerCoordinates;
    }

    const xDiff =
      temp.firstPointerCoordinates.x - temp.prevSecondPointerCoordinates.x;
    const yDiff =
      temp.firstPointerCoordinates.y - temp.prevSecondPointerCoordinates.y;

    var rad2deg = 180 / Math.PI;
    var angle = Math.atan(Math.abs(xDiff) / Math.abs(yDiff)) * rad2deg;

    if (!temp.initialAngle) temp.initialAngle = angle;

    const diff = temp.prevAngle - angle;
    temp.prevAngle = angle;

    const absoluteDiff = temp.initialAngle - angle;

    console.log(temp.initialAngle);

    if (Math.abs(absoluteDiff) < deltaPxBeforeRotate && !temp.freeToRotate)
      return;

    if (!temp.freeToRotate) {
      temp.freeToRotate = true;
    }

    handleRotate(diff);
}

function pinchIndicate() {
  if (temp.freeToRotate) return;

  const xDiff =
    temp.firstPointerCoordinates.x - temp.secondPointerCoordinates.x;
  const yDiff =
    temp.firstPointerCoordinates.y - temp.secondPointerCoordinates.y;

  const distBetweenPointers = Math.sqrt(
    Math.pow(xDiff, 2) + Math.pow(yDiff, 2)
  );

  if (!temp.prevPointersDist) {
    temp.prevPointersDist = distBetweenPointers;
    temp.initialDist = distBetweenPointers;
    return;
  }

  const stepDiff = temp.prevPointersDist - distBetweenPointers;
  temp.prevPointersDist = distBetweenPointers;

  absoluteDiff = temp.initialDist - distBetweenPointers;

  if (Math.abs(absoluteDiff) < deltaDegBeforePinch && !temp.freeToPinch) return;

  if (!temp.freeToPinch) {
    temp.freeToPinch = true;
  }

  handlePinch(stepDiff);
}

// Set styles
function handlePinch(dist) {
  const currentScale = parseFloat(eventsObject.style.backgroundSize) || 100;
  const newScale = currentScale - dist * zoomSensitivity;
  eventsObject.style.backgroundSize = `${newScale}%`;
}

function handleRotate(diff) {
  const currentBrightness =
    parseFloat(eventsObject.style.filter.replace(/[^\d.-]/g, "")) || 1;
  eventsObject.style.filter = `brightness(${currentBrightness +
    diff * rotateSensitivity})`;
}
