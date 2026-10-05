import * as THREE from 'three';

export function createPlayer(scene) {
  const ship = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.ConeGeometry(0.6, 2, 4),
    new THREE.MeshStandardMaterial({ color: 0x22e6ff, emissive: 0x0a6a80, metalness: 0.6, roughness: 0.3 })
  );
  body.rotation.x = -Math.PI / 2;
  ship.add(body);

  const wing = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.08, 0.7),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x224466 })
  );
  wing.position.z = 0.5;
  ship.add(wing);

  const glow = new THREE.PointLight(0x22e6ff, 40, 12);
  glow.position.z = 1;
  ship.add(glow);

  ship.position.set(0, 1, 2);
  scene.add(ship);
  return ship;
}