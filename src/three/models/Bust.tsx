import { useMemo } from 'react';
import * as THREE from 'three';
import { C } from '../palette';
import { toonMaterial } from '../toon';

/** Height of the printed bust (world units, bed top → hair tip). */
export const BUST_H = 10.6;

/** Tiny deterministic PRNG so the hair is identical on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Curl = { p: [number, number, number]; r: number };

function makeCurls(): Curl[] {
  const rnd = mulberry32(42);
  const curls: Curl[] = [];
  const HEAD_Y = 6.9;
  // golden-spiral points over the upper / back / side of the head
  const N = 34;
  for (let i = 0; i < N; i++) {
    const k = (i + 0.5) / N;
    const phi = Math.acos(1 - k * 1.25); // 0 = straight up
    const theta = i * 2.399963;
    const dx = Math.sin(phi) * Math.cos(theta);
    const dy = Math.cos(phi);
    const dz = Math.sin(phi) * Math.sin(theta);
    if (dy < 0.12 && dz > 0.2) continue; // keep the face clear
    const rad = 2.1 + rnd() * 0.15;
    curls.push({
      p: [dx * rad * 0.95, HEAD_Y + dy * rad * 1.05, dz * rad],
      r: 0.55 + rnd() * 0.35,
    });
  }
  // fringe curls across the forehead
  for (let i = 0; i < 6; i++) {
    const a = (i / 5 - 0.5) * 2.2;
    curls.push({ p: [Math.sin(a) * 1.9, 8.75 + Math.cos(a * 1.4) * 0.35, 1.25 + Math.cos(a) * 0.45], r: 0.52 + rnd() * 0.2 });
  }
  return curls;
}

/**
 * The stylised bust the printer is "printing". One filament colour (turquoise),
 * with glasses and smile in the darker teal. All materials share the same
 * clipping plane, which `Printer` raises bottom-up to reveal the print.
 */
export function Bust({ plane }: { plane: THREE.Plane }) {
  const [body, accent] = useMemo(() => {
    const opts = { clippingPlanes: [plane], clipShadows: true };
    return [toonMaterial(C.turquoise, opts), toonMaterial(C.tealText, opts)];
  }, [plane]);
  const curls = useMemo(() => makeCurls(), []);

  return (
    <group>
      {/* small plinth */}
      <mesh position={[0, 0.4, 0]} castShadow material={body}>
        <cylinderGeometry args={[3.4, 3.7, 0.8, 40]} />
      </mesh>
      {/* shoulders / chest */}
      <mesh position={[0, 2.1, 0]} scale={[3.1, 1.9, 1.9]} castShadow material={body}>
        <sphereGeometry args={[1, 36, 24]} />
      </mesh>
      {/* neck */}
      <mesh position={[0, 4.3, 0]} castShadow material={body}>
        <cylinderGeometry args={[0.95, 1.1, 1.8, 24]} />
      </mesh>
      {/* head */}
      <mesh position={[0, 6.9, 0]} scale={[0.95, 1.08, 1]} castShadow material={body}>
        <sphereGeometry args={[2.1, 40, 32]} />
      </mesh>
      {/* ears */}
      <mesh position={[-2.0, 6.7, 0]} scale={[0.5, 1, 0.7]} castShadow material={body}>
        <sphereGeometry args={[0.55, 16, 12]} />
      </mesh>
      <mesh position={[2.0, 6.7, 0]} scale={[0.5, 1, 0.7]} castShadow material={body}>
        <sphereGeometry args={[0.55, 16, 12]} />
      </mesh>
      {/* nose */}
      <mesh position={[0, 6.55, 2.05]} castShadow material={body}>
        <sphereGeometry args={[0.3, 16, 12]} />
      </mesh>
      {/* round glasses */}
      <mesh position={[-0.95, 7.2, 1.95]} castShadow material={accent}>
        <torusGeometry args={[0.62, 0.085, 10, 32]} />
      </mesh>
      <mesh position={[0.95, 7.2, 1.95]} castShadow material={accent}>
        <torusGeometry args={[0.62, 0.085, 10, 32]} />
      </mesh>
      <mesh position={[0, 7.3, 1.98]} castShadow material={accent}>
        <boxGeometry args={[0.5, 0.1, 0.1]} />
      </mesh>
      {/* smile */}
      <mesh position={[0, 6.05, 1.98]} rotation-z={Math.PI} castShadow material={accent}>
        <torusGeometry args={[0.72, 0.07, 8, 20, Math.PI * 0.9]} />
      </mesh>
      {/* curly hair: clustered spheres */}
      {curls.map((c, i) => (
        <mesh key={i} position={c.p} castShadow material={body}>
          <sphereGeometry args={[c.r, 16, 12]} />
        </mesh>
      ))}
    </group>
  );
}
