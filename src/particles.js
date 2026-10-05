import * as THREE from 'three';

const geo = new THREE.SphereGeometry(0.12, 6, 6);

export class Particles {
  constructor(scene) { this.scene = scene; this.list = []; }

  burst(position, color) {
    for (let i = 0; i < 14; i++) {
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, transparent: true }));
      m.position.copy(position);
      m.userData.v = new THREE.Vector3(
        (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10
      );
      m.userData.life = 1;
      this.scene.add(m);
      this.list.push(m);
    }
  }

  update(dt) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const p = this.list[i];
      p.position.addScaledVector(p.userData.v, dt);
      p.userData.life -= dt * 2;
      p.material.opacity = Math.max(0, p.userData.life);
      if (p.userData.life <= 0) {
        this.scene.remove(p);
        p.material.dispose();
        this.list.splice(i, 1);
      }
    }
  }
}