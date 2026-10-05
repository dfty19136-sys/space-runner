import * as THREE from 'three';

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
document.body.prepend(renderer.domElement);

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05060f);
scene.fog = new THREE.Fog(0x05060f, 30, 130);

export const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 300);
camera.position.set(0, 3, 9);

function resize() {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();

scene.add(new THREE.AmbientLight(0x6070a0, 2));
const sun = new THREE.DirectionalLight(0xffffff, 2.5);
sun.position.set(3, 8, 5);
scene.add(sun);

export const grid = new THREE.GridHelper(300, 100, 0x22e6ff, 0x1a3a66);
grid.position.y = -1.5;
scene.add(grid);

// نجوم
const pos = [];
for (let i = 0; i < 700; i++) {
  pos.push((Math.random() - 0.5) * 260, Math.random() * 90 - 5, -Math.random() * 250);
}
const sg = new THREE.BufferGeometry();
sg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 })));

export function scrollGrid(offset) { grid.position.z = offset; }