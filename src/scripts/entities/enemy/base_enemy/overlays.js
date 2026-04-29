import DEV_FLAGS from "@core/dev_flags";

export const setupDevOverlays = (enemy) => {
  const baseDraw = enemy.draw;
  enemy.draw = (ctx) => {
    baseDraw(ctx);
    enemy.drawHeadColBox(ctx);

    if (DEV_FLAGS.showEnemyDetectRadius) {
      ctx.beginPath();
      ctx.strokeStyle = enemy.chasingPlayer ? "#ff4444" : "#44ff44";
      ctx.lineWidth = 1;
      ctx.arc(enemy.center[0], enemy.center[1], enemy.detectDist, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (DEV_FLAGS.showEnemyHp) {
      const barW = 40;
      const barH = 4;
      const barX = Math.round(enemy.center[0] - barW / 2);
      const barY = Math.round(enemy.pos[1] - 10);
      const ratio = enemy.maxHp > 0 ? Math.max(0, enemy.hp / enemy.maxHp) : 0;

      ctx.fillStyle = "#111";
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = "#d42c2c";
      ctx.fillRect(barX, barY, Math.round(barW * ratio), barH);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.strokeRect(barX + 0.5, barY + 0.5, barW - 1, barH - 1);

      ctx.font = "10px arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      const label = `${enemy.hp}/${enemy.maxHp}`;
      const labelX = enemy.center[0];
      const labelY = barY - 2;
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#000";
      ctx.strokeText(label, labelX, labelY);
      ctx.fillStyle = "#fffaf4";
      ctx.fillText(label, labelX, labelY);
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";
    }
  };
};
