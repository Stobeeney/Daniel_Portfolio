import * as THREE from 'three';
import { toonMaterial } from './toon';

/** Shared toon materials, one per colour, so the scene stays light on GPU state. */
const cache = new Map<string, THREE.MeshToonMaterial>();

export function mat(color: string): THREE.MeshToonMaterial {
  let m = cache.get(color);
  if (!m) {
    m = toonMaterial(color);
    cache.set(color, m);
  }
  return m;
}
