import Random from "@utils/random";
import BAT_CONFIG from "./config";

function createErraticFlight(config = BAT_CONFIG.flight) {
  const flightConfig = { ...BAT_CONFIG.flight, ...config };
  let jitter = { timer: 0, x: 0, y: 0 };

  return (nx, ny, speed) => {
    jitter.timer--;
    if (jitter.timer <= 0) {
      const angle = Random.range(0, 2 * Math.PI);
      const magnitude = Random.range(flightConfig.minStrength, flightConfig.maxStrength) * speed;
      jitter = {
        timer: Random.int(flightConfig.minFrames, flightConfig.maxFrames),
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude,
      };
    }

    const adjustedX = nx + jitter.x;
    const adjustedY = ny + jitter.y;
    const adjustedSpeed = Math.sqrt((adjustedX * adjustedX) + (adjustedY * adjustedY));
    const maxSpeed = speed * flightConfig.maxSpeedMultiplier;
    if (adjustedSpeed <= maxSpeed) return [adjustedX, adjustedY];

    return [
      (adjustedX / adjustedSpeed) * maxSpeed,
      (adjustedY / adjustedSpeed) * maxSpeed,
    ];
  };
}

export default createErraticFlight;
