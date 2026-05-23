export interface ScratchOptions {
  threshold?: number;
  brushRadius?: number;
  imageSrc?: string;
  onReveal?: () => void;
  onProgress?: (ratio: number) => void;
}

const imageCache = new Map<string, Promise<HTMLImageElement>>();

function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(src);
  if (cached) return cached;
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
  imageCache.set(src, promise);
  return promise;
}

export function initScratch(canvas: HTMLCanvasElement, options: ScratchOptions = {}) {
  const {
    threshold = 0.6,
    brushRadius = 28,
    imageSrc = "/assets/scratch-gold.png",
    onReveal,
    onProgress,
  } = options;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let goldImage: HTMLImageElement | null = null;

  function paintSurface() {
    if (!ctx) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    width = w;
    height = h;
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    ctx.globalCompositeOperation = "source-over";

    if (goldImage) {
      // Clip to the disc so the image corners don't bleed outside.
      ctx.save();
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(goldImage, 0, 0, w, h);
      ctx.restore();
    }
  }

  let revealed = false;
  let checkAccumulator = 0;
  let hasUserScratched = false;

  function computeRatio() {
    if (!ctx) return 0;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imageData;
    const stride = 4 * 8;
    let cleared = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += stride) {
      total++;
      if (data[i] === 0) cleared++;
    }
    return total === 0 ? 0 : cleared / total;
  }

  function scratchAt(x: number, y: number) {
    if (!ctx || revealed) return;
    hasUserScratched = true;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "#000";
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    checkAccumulator++;
    if (checkAccumulator >= 3) {
      checkAccumulator = 0;
      const ratio = computeRatio();
      onProgress?.(ratio);
      if (ratio >= threshold) {
        revealed = true;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        onReveal?.();
      }
    }
  }

  let drawing = false;
  let lastX = 0;
  let lastY = 0;

  function pointFromEvent(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function lineTo(x: number, y: number) {
    const dx = x - lastX;
    const dy = y - lastY;
    const dist = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.ceil(dist / (brushRadius / 2)));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      scratchAt(lastX + dx * t, lastY + dy * t);
    }
    lastX = x;
    lastY = y;
  }

  function handlePointerDown(e: PointerEvent) {
    if (revealed) return;
    drawing = true;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // ignore — pointer capture may fail on synthetic events
    }
    const { x, y } = pointFromEvent(e);
    lastX = x;
    lastY = y;
    scratchAt(x, y);
  }

  function handlePointerMove(e: PointerEvent) {
    if (!drawing || revealed) return;
    const { x, y } = pointFromEvent(e);
    lineTo(x, y);
  }

  function handlePointerUp(e: PointerEvent) {
    drawing = false;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      // ignore — capture may not have been set
    }
  }

  canvas.addEventListener("pointerdown", handlePointerDown);
  canvas.addEventListener("pointermove", handlePointerMove);
  canvas.addEventListener("pointerup", handlePointerUp);
  canvas.addEventListener("pointercancel", handlePointerUp);
  canvas.addEventListener("pointerleave", handlePointerUp);

  const resizeObserver = new ResizeObserver(() => {
    if (revealed || hasUserScratched) return;
    paintSurface();
  });
  resizeObserver.observe(canvas);
  paintSurface();

  loadImage(imageSrc)
    .then((img) => {
      if (revealed || hasUserScratched) return;
      goldImage = img;
      paintSurface();
    })
    .catch((err) => {
      console.error("scratch: gold texture failed to load", err);
    });

  return function destroy() {
    resizeObserver.disconnect();
    canvas.removeEventListener("pointerdown", handlePointerDown);
    canvas.removeEventListener("pointermove", handlePointerMove);
    canvas.removeEventListener("pointerup", handlePointerUp);
    canvas.removeEventListener("pointercancel", handlePointerUp);
    canvas.removeEventListener("pointerleave", handlePointerUp);
  };
}
