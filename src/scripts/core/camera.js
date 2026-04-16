import { WIDTH, HEIGHT } from "../utils/global_vars";

function createCamera() {
  const canvas = document.getElementById("display");

  const camera = {
    x: 0,
    y: 0,
    viewWidth: canvas.width,
    viewHeight: canvas.height,
  };

  camera.update = (player) => {
    camera.viewWidth = canvas.width;
    camera.viewHeight = canvas.height;

    const centerX = player.pos[0] + player.width / 2;
    const centerY = player.pos[1] + player.height / 2;

    camera.x = centerX - camera.viewWidth / 2;
    camera.y = centerY - camera.viewHeight / 2;

    if (camera.x < 0) camera.x = 0;
    if (camera.y < 0) camera.y = 0;
    if (camera.x > WIDTH - camera.viewWidth) camera.x = WIDTH - camera.viewWidth;
    if (camera.y > HEIGHT - camera.viewHeight) camera.y = HEIGHT - camera.viewHeight;
  };

  return camera;
}

export default createCamera;
