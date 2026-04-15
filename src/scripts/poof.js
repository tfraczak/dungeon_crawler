import GAME_CONFIG from "./game_config";

function createPoof(x, y) {
  const cfg = GAME_CONFIG.poof;
  const particles = [];

  for (let i = 0; i < cfg.particleCount; i++) {
    const angle = (Math.PI * 2 * i) / cfg.particleCount + (Math.random() - 0.5) * 0.5;
    const speed = cfg.speedMin + Math.random() * (cfg.speedMax - cfg.speedMin);
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: cfg.radiusMin + Math.random() * (cfg.radiusMax - cfg.radiusMin),
      life: cfg.lifetime,
    });
  }

  const poof = { particles, done: false };

  poof.update = () => {
    let allDead = true;
    for (const p of poof.particles) {
      if (p.life <= 0) continue;
      allDead = false;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.9;
      p.vy *= 0.9;
      p.life--;
    }
    poof.done = allDead;
  };

  poof.draw = (ctx) => {
    const [r, g, b] = cfg.color;
    for (const p of poof.particles) {
      if (p.life <= 0) continue;
      const alpha = p.life / cfg.lifetime;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * alpha, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();
    }
  };

  return poof;
}

export default createPoof;
