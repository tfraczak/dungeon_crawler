import * as Global from "./global_vars";
import Game from "../game";
import { newGame } from "../utils/func_utils";

export default (KEYS) => {
  document.addEventListener("keydown", e => {
    debugger
    if (e.key.toLowerCase() === "w" && !KEYS["w"]) KEYS[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "a" && !KEYS["a"]) KEYS[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "s" && !KEYS["s"]) KEYS[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "d" && !KEYS["d"]) KEYS[e.key.toLowerCase()] = true;
    if (e.key === "Shift" && !KEYS["Shift"]) KEYS[e.key] = true;
    if (e.key === "Enter" && !KEYS["Enter"]) KEYS[e.key] = true;

  });
  document.addEventListener("keyup", e => {
    if (e.key.toLowerCase() === "w" && KEYS["w"]) KEYS[e.key.toLowerCase()] = false;
    if (e.key.toLowerCase() === "a" && KEYS["a"]) KEYS[e.key.toLowerCase()] = false;
    if (e.key.toLowerCase() === "s" && KEYS["s"]) KEYS[e.key.toLowerCase()] = false;
    if (e.key.toLowerCase() === "d" && KEYS["d"]) KEYS[e.key.toLowerCase()] = false;
    if (e.key === "Shift" && KEYS["Shift"]) KEYS[e.key] = false;
    if (e.key === "Enter" && KEYS["Enter"]) KEYS[e.key] = false;
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
