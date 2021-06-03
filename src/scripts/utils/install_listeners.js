import * as Global from "./global_vars";
import Game from "../game";
import { newGame } from "../utils/func_utils";

export default (KEYS) => {
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
    document.getElementById("how-to-pointer").classList.add("active");
    document.getElementById("how-to-sound").play();
    document.getElementById("how-to").classList.add("active");
    document.querySelector("#how-to > ul").classList.add("active");
  });
  howTo.addEventListener("mouseleave", e => {
    document.getElementById("how-to").classList.remove("active");
    document.getElementById("how-to-pointer").classList.remove("active");
    document.querySelector("#how-to > ul").classList.remove("active");
  });

  const restart = document.getElementById("restart");
  restart.addEventListener("mouseenter", e => {
    document.getElementById("restart-sound").play();
    document.getElementById("restart").classList.add("active");
    document.getElementById("restart-pointer").classList.add("active");
  });
  restart.addEventListener("mouseleave", e => {
    document.getElementById("restart").classList.remove("active");
    document.getElementById("restart-pointer").classList.remove("active");
  });
  restart.addEventListener("click", e => {
    e.preventDefault();
    newGame();
  });

}
