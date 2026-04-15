import { newGame } from "./func_utils";

export default (gameState) => {
  const keys = gameState.keys;

  document.addEventListener("keydown", e => {
    if (e.key.toLowerCase() === "w" && !keys["w"]) keys[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "a" && !keys["a"]) keys[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "s" && !keys["s"]) keys[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "d" && !keys["d"]) keys[e.key.toLowerCase()] = true;
    if (e.key === "Shift" && !keys["Shift"]) keys[e.key] = true;
    if (e.key === "Enter" && !keys["Enter"]) keys[e.key] = true;
  });

  document.addEventListener("keyup", e => {
    if (e.key.toLowerCase() === "w" && keys["w"]) keys[e.key.toLowerCase()] = false;
    if (e.key.toLowerCase() === "a" && keys["a"]) keys[e.key.toLowerCase()] = false;
    if (e.key.toLowerCase() === "s" && keys["s"]) keys[e.key.toLowerCase()] = false;
    if (e.key.toLowerCase() === "d" && keys["d"]) keys[e.key.toLowerCase()] = false;
    if (e.key === "Shift" && keys["Shift"]) keys[e.key] = false;
    if (e.key === "Enter" && keys["Enter"]) keys[e.key] = false;
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
    newGame(gameState);
  });
}
