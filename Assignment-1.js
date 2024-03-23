// Module code: CS5041
// Module: Interactive Software and Hardware
// Programming the Micro:bit to play Asteroids game

// Code for thrusting
input.onLogoEvent(TouchButtonEvent.Touched, function () {
  serial.writeLine("t:-1");
});
input.onLogoEvent(TouchButtonEvent.Released, function () {
  serial.writeLine("t:0");
});

// Code for moving left and right
loops.everyInterval(200, function () {
  let roll = input.rotation(Rotation.Roll);
  if (roll < -30 && roll > -160) {
    serial.writeLine("l:1");
  } else if (roll > 30 && roll < 160) {
    serial.writeLine("r:1");
  } else {
    serial.writeLine("r:0");
    serial.writeLine("l:0");
  }
});

// Code for primary weapon on and off
const weaponOn = "a:1";
const weaponOff = "a:0";

let isWeaponOn = false;
input.onButtonPressed(Button.A, function () {
  if (isWeaponOn) {
    serial.writeLine(weaponOff);
  } else {
    serial.writeLine(weaponOn);
  }
  isWeaponOn = !isWeaponOn;
});

// Code for secondary weapon on and off
const secWeaponOn = "b:1";
const secWeaponOff = "b:0";

let isSecWeaponOn = false;
input.onButtonPressed(Button.B, function () {
  if (isSecWeaponOn) {
    serial.writeLine(secWeaponOff);
  } else {
    serial.writeLine(secWeaponOn);
  }
  isSecWeaponOn = !isSecWeaponOn;
});

// Code for shield on and off
const shieldOn = "s:1";
const shieldOff = "s:0";

let isShieldOn = false;
input.onButtonPressed(Button.AB, function () {
  if (isShieldOn) {
    serial.writeLine(shieldOff);
  } else {
    serial.writeLine(shieldOn);
  }
  isShieldOn = !isShieldOn;
});

// Code for pausing and unpausing the game
let pauseGame = "p:1";
let unpauseGame = "p:0";

let isPaused = false;
input.onGesture(Gesture.Shake, function () {
  if (isPaused) {
    serial.writeLine(unpauseGame);
  } else {
    serial.writeLine(pauseGame);
  }
  isPaused = !isPaused;
});

// Beating heart when the user is alive
// Display game over when the user has used up all three lives
const gameOverTune = "A4:4 G4:4 F4:4 E4:4 F4:2 E4:2 D4:2 C4:2";
basic.forever(function () {
  serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let message = serial.readLine();
    if (message == "l:0" || message == "d:o") {
      basic.showString("GAME OVER");
      music.playMelody(gameOverTune, 150);
      basic.clearScreen();
    }
    if (message == "a:0") {
      basic.showIcon(IconNames.Skull, 2000);
      basic.clearScreen();
    }
  });
});
