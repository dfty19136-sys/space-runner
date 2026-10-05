import * as THREE from 'three';
import { CFG } from './config.js';

const orbGeo = new THREE.IcosahedronGeometry(0.6, 1);
const orbMat = new THREE.MeshStandardMaterial({ color: 0xffd23d, emissive: 0xff9a00, emissiveIntensity: 0.9 });
const obGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
const obMat = new THREE.MeshStandardMaterial({ color: 0xff3d81, emissive: 0x8a0a30, roughness: 0.4 });

export class Items {
  constructor(scene) { this.scene = scene; this.list = []; this.timer = 0; }

  clear() {
    this.list.forEach((m) => this.scene.remove(m));
    this.list = [];
    this.timer = 0;
  }

  #spawn() {
    const isOrb = Math.random() < 0.45;
    const m = new THREE.Mesh(isOrb ? orbGeo : obGeo, isOrb ? orbMat : obMat);
    m.position.set((Math.random() - 0.5) * 14, Math.random() * 4.5 - 0.5, CFG.spawnZ);
    m.userData.orb = isOrb;
    this.scene.add(m);
    this.list.push(m);
  }

  // يستدعي onOrb(pos) عند التقاط كرة، و onHit(pos) عند الاصطدام بمكعب
  update(dt, speed, time, ship, invincible, onOrb, onHit) {
    this.timer -= dt;
    if (this.timer <= 0) {
      this.#spawn();
      this.timer = Math.max(0.22, 0.7 - time * 0.01);
    }

    for (let i = this.list.length - 1; i >= 0; i--) {
      const m = this.list[i];
      m.position.z += speed * dt;
      m.rotation.x += dt * 2;
      m.rotation.y += dt * 3;

      let remove = m.position.z > CFG.despawnZ;

      if (!remove && Math.abs(m.position.z - ship.position.z) < 1.3) {
        const d = Math.hypot(m.position.x - ship.position.x, m.position.y - ship.position.y);
        if (m.userData.orb && d < 1.5) { onOrb(m.position); remove = true; }
        else if (!m.userData.orb && d < 1.4 && !invincible) { onHit(m.position); remove = true; }
      }

      if (remove) { this.scene.remove(m); this.list.splice(i, 1); }
    }
  }
}