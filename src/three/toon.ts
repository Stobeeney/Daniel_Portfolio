import * as THREE from 'three';

/**
 * Hybrid cel-shading ramp: five brightness steps (120, 175, 215, 240, 255).
 * LinearFilter keeps the band edges soft instead of hard-stepped.
 */
function makeGradientMap(): THREE.DataTexture {
  const data = new Uint8Array([120, 175, 215, 240, 255]);
  const tex = new THREE.DataTexture(data, data.length, 1, THREE.RedFormat);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

export const gradientMap = makeGradientMap();

/** A toon material with the shared ramp. Extra props (map, clippingPlanes, …) pass straight through. */
export function toonMaterial(
  color: string,
  extra: THREE.MeshToonMaterialParameters = {},
): THREE.MeshToonMaterial {
  return new THREE.MeshToonMaterial({ color, gradientMap, ...extra });
}
