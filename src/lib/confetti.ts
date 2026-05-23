import confetti from "canvas-confetti";

export function fireCelebration() {
  const defaults = {
    spread: 90,
    ticks: 120,
    gravity: 0.9,
    decay: 0.93,
    startVelocity: 35,
    colors: ["#6B1E1E", "#C8A24B", "#E0C07A", "#F8F1E4", "#8A2A2A"],
  } as const;

  const burst = (originX: number) => {
    confetti({
      ...defaults,
      particleCount: 80,
      origin: { x: originX, y: 0.6 },
    });
  };

  burst(0.2);
  burst(0.5);
  burst(0.8);

  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 120,
      spread: 160,
      origin: { x: 0.5, y: 0.7 },
    });
  }, 200);
}
