import Random from "@utils/random";

const DEFAULT_FLIGHT_CONFIG = Object.freeze({
  minFrames: 5,
  maxFrames: 12,
  minStrength: 0.25,
  maxStrength: 0.75,
  maxSpeedMultiplier: 1.4,
});

function createErraticFlight(config = DEFAULT_FLIGHT_CONFIG) {
  const flightConfig = { ...DEFAULT_FLIGHT_CONFIG, ...config };
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
