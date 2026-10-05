import { scene, camera, renderer, scrollGrid } from './scene.js';
import { createPlayer } from './player.js';
import { Input } from './input.js';
import { Items } from './items.js';
import { Particles } from './particles.js';
import { ui } from './ui.js';
import { getBest, setBest } from './storage.js';
import { CFG } from './config.js';

const ship = createPlayer(scene);
const input = new Input();
const items = new Items(scene);
const particles = new Particles(scene);

let best = getBest();
ui.setBest(best);

const S = { on: false, score: 0, lives: CFG.lives, speed: CFG.startSpeed, t: 0, inv: 0 };

function start() {
  items.clear();
  input.reset();
  Object.assign(S, { on: true, score: 0, lives: CFG.lives, speed: CFG.startSpeed, t: 0, inv: 0 });
  ship.position.set(0, 1, 2);
  ui.setHud(S.score, S.lives);
  ui.showGame();
}

function gameOver() {
  S.on = false;
  if (S.score > best) { best = S.score; setBest(best); }
  ui.setBest(best);
  ui.showMenu(S.score, best);
}

ui.go.onclick = start;

let last = performance.now(), gridOffset = 0;

function loop(now) {
  requestAnimationFrame(loop);
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;

  gridOffset = (gridOffset + (S.on ? S.speed : 12) * dt) % 3;
  scrollGrid(gridOffset);

  if (S.on) {
    S.t += dt;
    S.speed = CFG.startSpeed + S.t * CFG.accel;
    S.inv = Math.max(0, S.inv - dt);

    input.update(dt);
    ship.position.x += (input.tx - ship.position.x) * Math.min(1, dt * 10);
    ship.position.y += (input.ty - ship.position.y) * Math.min(1, dt * 10);
    ship.rotation.z = (ship.position.x - input.tx) * 0.15;
    ship.visible = S.inv <= 0 || Math.floor(S.t * 14) % 2 === 0;

    items.update(
      dt, S.speed, S.t, ship, S.inv > 0,
      (pos) => { S.score += CFG.orbScore; particles.burst(pos, 0xffd23d); ui.setHud(S.score, S.lives); },
      (pos) => {
        S.lives--; S.inv = CFG.invTime; particles.burst(pos, 0xff3d81);
        ui.setHud(S.score, S.lives);
        if (S.lives <= 0) gameOver();
      }
    );

    camera.position.x += (ship.position.x * 0.5 - camera.position.x) * dt * 4;
    camera.position.y += (3 + ship.position.y * 0.3 - camera.position.y) * dt * 4;
    camera.lookAt(ship.position.x * 0.3, 1, -12);
  } else {
    ship.visible = true;
    ship.position.y = 1 + Math.sin(now / 500) * 0.3;
    ship.rotation.z = Math.sin(now / 900) * 0.3;
    camera.lookAt(0, 1, -12);
  }

  particles.update(dt);
  renderer.render(scene, camera);
}
requestAnimationFrame(loop);