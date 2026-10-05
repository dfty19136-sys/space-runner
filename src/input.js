import { CFG } from './config.js';

export class Input {
  constructor() {
    this.keys = {};
    this.tx = 0;
    this.ty = 1;
    this.drag = false;

    addEventListener('keydown', (e) => (this.keys[e.key.toLowerCase()] = true));
    addEventListener('keyup', (e) => (this.keys[e.key.toLowerCase()] = false));
    addEventListener('pointerdown', (e) => { this.drag = true; this.#point(e); });
    addEventListener('pointermove', (e) => { if (this.drag) this.#point(e); });
    addEventListener('pointerup', () => (this.drag = false));
  }

  #point(e) {
    this.tx = ((e.clientX / innerWidth) * 2 - 1) * CFG.bounds.x;
    this.ty = (1 - e.clientY / innerHeight) * 5.5 - 0.5;
  }

  reset() { this.tx = 0; this.ty = 1; }

  update(dt) {
    const k = this.keys, mv = 14 * dt, b = CFG.bounds;
    if (k['arrowleft'] || k['a']) this.tx -= mv;
    if (k['arrowright'] || k['d']) this.tx += mv;
    if (k['arrowup'] || k['w']) this.ty += mv * 0.7;
    if (k['arrowdown'] || k['s']) this.ty -= mv * 0.7;
    this.tx = Math.max(-b.x, Math.min(b.x, this.tx));
    this.ty = Math.max(b.yMin, Math.min(b.yMax, this.ty));
  }
}