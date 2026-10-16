// Lightweight zero-dependency canvas confetti explosion

export function fireConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const colors = ['#ba4949', '#38858a', '#397097', '#fbbf24', '#f43f5e', '#10b981', '#ffffff', '#8b5cf6'];
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    rotSpeed: number;
    opacity: number;
  }> = [];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: width * (0.35 + Math.random() * 0.3),
      y: height * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 14 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
    });
  }

  let animationId: number;
  const startTime = performance.now();

  function animate(now: number) {
    const elapsed = now - startTime;
    if (elapsed > 2400) {
      cancelAnimationFrame(animationId);
      canvas.remove();
      return;
    }

    ctx?.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // gravity
      p.vx *= 0.985; // drag
      p.rotation += p.rotSpeed;
      p.opacity = Math.max(0, 1 - elapsed / 2400);

      if (ctx) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    animationId = requestAnimationFrame(animate);
  }

  animationId = requestAnimationFrame(animate);
}
