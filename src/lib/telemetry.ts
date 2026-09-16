export interface SystemTelemetryState {
  fps: number;
  utcTime: string;
  latitude: string;
  longitude: string;
  radius: string;
  singularityFlux: number;
  activeProjectIndex: number;
  soundEnabled: boolean;
  menuOpen: boolean;
  dossierOpen: boolean;
}

export class TelemetryMonitor {
  private lastFrameTime = performance.now();
  private frameCount = 0;
  private fpsBuffer: number[] = [];
  public currentFps = 60;

  public tick(): number {
    const now = performance.now();
    const delta = now - this.lastFrameTime;
    this.lastFrameTime = now;

    if (delta > 0) {
      const instantFps = 1000 / delta;
      this.fpsBuffer.push(instantFps);
      if (this.fpsBuffer.length > 30) {
        this.fpsBuffer.shift();
      }
      const sum = this.fpsBuffer.reduce((a, b) => a + b, 0);
      this.currentFps = Math.min(120, Math.round(sum / this.fpsBuffer.length));
    }

    return this.currentFps;
  }

  public static getUtcString(): string {
    const now = new Date();
    return now.toTimeString().split(" ")[0] + "." + Math.floor(now.getMilliseconds() / 100);
  }
}
