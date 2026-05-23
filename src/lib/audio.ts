const EVENT = "wedding:audio-state";

type AudioState = "playing" | "paused";

class AudioController {
  private el: HTMLAudioElement | null = null;
  private src = "";

  init(src: string, volume = 0.4) {
    if (this.el) return;
    this.src = src;
    this.el = new Audio(src);
    this.el.loop = true;
    this.el.volume = volume;
    this.el.preload = "auto";
    this.el.addEventListener("play", () => this.emit("playing"));
    this.el.addEventListener("pause", () => this.emit("paused"));
  }

  async play() {
    if (!this.el) return;
    try {
      await this.el.play();
    } catch {
      // Autoplay blocked; ignore — user can click the toggle.
    }
  }

  pause() {
    this.el?.pause();
  }

  async toggle() {
    if (!this.el) return;
    if (this.el.paused) await this.play();
    else this.pause();
  }

  isPlaying() {
    return !!this.el && !this.el.paused;
  }

  private emit(state: AudioState) {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: state }));
  }
}

export const audio = new AudioController();
export const AUDIO_EVENT = EVENT;
export type { AudioState };
