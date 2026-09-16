class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private warpOsc1: OscillatorNode | null = null;
  private warpOsc2: OscillatorNode | null = null;
  private warpGain: GainNode | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("singularity_sound_enabled");
      // Default to unmuted once user triggers interaction
      this.isMuted = saved === "false";
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("singularity_sound_enabled", (!this.isMuted).toString());
    }
    if (this.isMuted) {
      this.stopWarpDrone();
    } else {
      this.initContext();
      this.playHover();
      this.startWarpDrone();
    }
    return !this.isMuted;
  }

  public getSoundEnabled(): boolean {
    return !this.isMuted;
  }

  public playHover() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2600, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext state gracefully handled
    }
  }

  public playLock() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Low sub-bass impact
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();

      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(120, now);
      subOsc.frequency.exponentialRampToValueAtTime(38, now + 0.18);

      subGain.gain.setValueAtTime(0.25, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);

      // Metallic high transient
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();

      clickOsc.type = "triangle";
      clickOsc.frequency.setValueAtTime(950, now);
      clickOsc.frequency.exponentialRampToValueAtTime(240, now + 0.06);

      clickGain.gain.setValueAtTime(0.08, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      clickOsc.connect(clickGain);
      clickGain.connect(this.ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + 0.25);
      clickOsc.start(now);
      clickOsc.stop(now + 0.08);
    } catch {
      // Ignore
    }
  }

  public startWarpDrone() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || this.warpOsc1) return;

    try {
      const now = this.ctx.currentTime;
      this.warpGain = this.ctx.createGain();
      this.warpGain.gain.setValueAtTime(0.001, now);
      this.warpGain.gain.linearRampToValueAtTime(0.015, now + 2.0);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(160, now);

      this.warpOsc1 = this.ctx.createOscillator();
      this.warpOsc1.type = "sawtooth";
      this.warpOsc1.frequency.setValueAtTime(42, now);

      this.warpOsc2 = this.ctx.createOscillator();
      this.warpOsc2.type = "sine";
      this.warpOsc2.frequency.setValueAtTime(42.6, now); // 0.6Hz binaural beat

      this.warpOsc1.connect(filter);
      this.warpOsc2.connect(filter);
      filter.connect(this.warpGain);
      this.warpGain.connect(this.ctx.destination);

      this.warpOsc1.start();
      this.warpOsc2.start();
    } catch {
      // Ignore
    }
  }

  public stopWarpDrone() {
    if (this.warpGain && this.ctx) {
      try {
        this.warpGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.warpOsc1?.stop();
          this.warpOsc2?.stop();
          this.warpOsc1 = null;
          this.warpOsc2 = null;
          this.warpGain = null;
        }, 550);
      } catch {
        this.warpOsc1 = null;
        this.warpOsc2 = null;
        this.warpGain = null;
      }
    }
  }

  public playTransmission() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [587.33, 880.0, 1174.66, 1760.0]; // D5, A5, D6, A6

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.05, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.15);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = new SoundEngine();
