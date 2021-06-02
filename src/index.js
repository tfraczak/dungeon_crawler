import "./styles/index.scss";
import Player from "./scripts/player";
import Wall from "./scripts/wall";

document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("display");
  const WIDTH = 720;
  const HEIGHT = 720;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");

  const SPRITE_DIMS = [48,48];
  const FPS = 1000/60;
  const KEYS = {
    87: false, // W
    65: false, // A
    83: false, // S
    68: false, // D
    16: false, // L-Shift
  };
  document.addEventListener("keydown", e => {
    if (e.keyCode === 87 && !KEYS[87]) KEYS[e.keyCode] = true;
    if (e.keyCode === 65 && !KEYS[65]) KEYS[e.keyCode] = true;
    if (e.keyCode === 83 && !KEYS[83]) KEYS[e.keyCode] = true;
    if (e.keyCode === 68 && !KEYS[68]) KEYS[e.keyCode] = true;
    if (e.keyCode === 16 && !KEYS[16]) KEYS[e.keyCode] = true;

  });
  document.addEventListener("keyup", e => {
    if (e.keyCode === 87 && KEYS[87]) KEYS[e.keyCode] = false;
    if (e.keyCode === 65 && KEYS[65]) KEYS[e.keyCode] = false;
    if (e.keyCode === 83 && KEYS[83]) KEYS[e.keyCode] = false;
    if (e.keyCode === 68 && KEYS[68]) KEYS[e.keyCode] = false;
    if (e.keyCode === 16 && KEYS[16]) KEYS[e.keyCode] = false;
  });

  const howTo = document.getElementById("how-to");
  howTo.addEventListener("mouseenter", e => {
    document.getElementById("how-to").classList.add("active");
    document.querySelector("#how-to > ul").classList.add("active");
  });
  howTo.addEventListener("mouseleave", e => {
    document.getElementById("how-to").classList.remove("active");
    document.querySelector("#how-to > ul").classList.remove("active");
  });

  

  let playerSprite = new Image();
  playerSprite.src = "../src/images/rogue/rogue_walk.png";
  
  let pos = [48*7, 48*7];
  playerSprite.onload = () => {
    


    let OBJECTS = [];
    let player = new Player(pos, ...SPRITE_DIMS, playerSprite);
    OBJECTS.push(new Wall([0,0], 48*6, 48));
    OBJECTS.push(new Wall([48*9,0], 48*6, 48));
    OBJECTS.push(new Wall([48*9,720-48], 48*6, 48));
    OBJECTS.push(new Wall([0,720-48], 48*6, 48));
    OBJECTS.push(new Wall([0,0], 48, 48*6));
    OBJECTS.push(new Wall([0,48*9], 48, 48*6));
    OBJECTS.push(new Wall([720-48,0], 48, 48*6));
    OBJECTS.push(new Wall([720-48,48*9], 48, 48*6));
    player.draw(ctx);
    setInterval(() => {
      ctx.clearRect(0,0, WIDTH, HEIGHT);
      player.move(KEYS, OBJECTS);
      OBJECTS.forEach(OBJECT => OBJECT.draw(ctx));
      player.draw(ctx);
    },FPS);
  }


  

});