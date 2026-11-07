import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { C } from '../palette';
import { mat } from '../materials';
import { toonMaterial } from '../toon';
import { LOOP, useLoop } from '../timeline';

const R = 3.6; // wheel radius
const HUB_Y = R + 1.2; // wheel centre above the pad
const TURNS = 3; // wheel turns per loop
const STEPS = 14; // little leg cycles per loop

/**
 * A hamster running in its wheel. The wheel spins (a whole number of turns per loop, so it tiles),
 * the hamster's legs patter and its body bobs. The wheel's axis points at the camera.
 */
export function Hamster({
  position,
  rotationY = Math.PI / 4,
  reduced,
}: {
  position: [number, number, number];
  rotationY?: number;
  reduced: boolean;
}) {
  const wheel = useRef<THREE.Group>(null);
  const pet = useRef<THREE.Group>(null);
  const ears = useRef<THREE.Group>(null);
  const legs = useRef<(THREE.Group | null)[]>([]);

  const band = useMemo(() => toonMaterial(C.mint, { side: THREE.DoubleSide }), []);

  useLoop(reduced, (t) => {
    const phase = (t / LOOP) * Math.PI * 2;
    if (wheel.current) wheel.current.rotation.z = -phase * TURNS; // bottom moves backwards while he runs forwards
    const step = phase * STEPS;
    if (pet.current) {
      pet.current.position.x = Math.sin(phase * 2) * 0.35; // drifts a little as he runs
      pet.current.position.y = HUB_Y - R + 0.35 + Math.abs(Math.sin(step)) * 0.1;
      pet.current.rotation.z = Math.sin(step) * 0.04;
    }
    if (ears.current) ears.current.rotation.z = Math.sin(step * 0.5) * 0.12;
    legs.current.forEach((leg, i) => {
      if (leg) leg.rotation.z = Math.sin(step + (i % 2 ? Math.PI : 0)) * 0.9;
    });
  });

  return (
    <group position={position} rotation-y={rotationY}>
      {/* pad */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow material={mat(C.plinth)}>
        <cylinderGeometry args={[6.4, 6.4, 0.8, 48]} />
      </mesh>
      <group position={[0, 0.8, 0]}>
        {/* base + A-frame holding the axle from the far side */}
        <RoundedBox args={[9.4, 0.7, 4.6]} radius={0.25} smoothness={3} position={[0, 0.35, 0]} castShadow receiveShadow material={mat(C.wood)} />
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 1.9, HUB_Y / 2 + 0.2, -2]} rotation-z={s * -0.5} castShadow material={mat(C.wood)}>
            <boxGeometry args={[0.45, HUB_Y + 0.6, 0.45]} />
          </mesh>
        ))}

        {/* the wheel */}
        <group position={[0, HUB_Y, 0]}>
          <group ref={wheel}>
            <mesh rotation-x={Math.PI / 2} castShadow material={band}>
              <cylinderGeometry args={[R, R, 2.4, 44, 1, true]} />
            </mesh>
            {[-1.2, 1.2].map((z) => (
              <mesh key={z} position={[0, 0, z]} castShadow material={mat(C.turquoise)}>
                <torusGeometry args={[R, 0.22, 10, 44]} />
              </mesh>
            ))}
            {/* spokes sit on the far side so the hamster stays visible */}
            {[0, 1, 2].map((k) => (
              <mesh key={k} position={[0, 0, -1.2]} rotation-z={(k * Math.PI) / 3} material={mat(C.turquoise)}>
                <boxGeometry args={[R * 2, 0.16, 0.16]} />
              </mesh>
            ))}
            <mesh position={[0, 0, -1.9]} rotation-x={Math.PI / 2} material={mat(C.steel)}>
              <cylinderGeometry args={[0.3, 0.3, 1.4, 12]} />
            </mesh>
          </group>
        </group>

        {/* the hamster, running on the inside bottom of the wheel (faces +x) */}
        <group ref={pet} position={[0, 0.9, 0]}>
          <mesh position={[0, 1.15, 0]} scale={[1.2, 0.95, 1]} castShadow material={mat(C.tan)}>
            <sphereGeometry args={[1.25, 24, 18]} />
          </mesh>
          <mesh position={[0.25, 0.8, 0]} scale={[1.05, 0.7, 0.9]} material={mat(C.plinth)}>
            <sphereGeometry args={[1.2, 20, 14]} />
          </mesh>
          {/* head, cheeks, ears, eyes, nose */}
          <group position={[1.55, 1.5, 0]}>
            <mesh castShadow material={mat(C.tan)}>
              <sphereGeometry args={[0.98, 22, 16]} />
            </mesh>
            {[-1, 1].map((z) => (
              <group key={z}>
                <mesh position={[0.35, -0.3, z * 0.55]} material={mat(C.plinth)}>
                  <sphereGeometry args={[0.52, 14, 10]} />
                </mesh>
                <mesh position={[0.78, 0.25, z * 0.42]} material={mat(C.darker)}>
                  <sphereGeometry args={[0.13, 10, 8]} />
                </mesh>
              </group>
            ))}
            <mesh position={[1.0, -0.05, 0]} material={mat(C.brown)}>
              <sphereGeometry args={[0.17, 10, 8]} />
            </mesh>
            <group ref={ears} position={[-0.2, 0.9, 0]}>
              {[-1, 1].map((z) => (
                <mesh key={z} position={[0, 0, z * 0.6]} scale={[0.7, 1, 0.5]} castShadow material={mat(C.wood)}>
                  <sphereGeometry args={[0.42, 12, 10]} />
                </mesh>
              ))}
            </group>
          </group>
          <mesh position={[-1.55, 1.0, 0]} material={mat(C.tan)}>
            <sphereGeometry args={[0.22, 10, 8]} />
          </mesh>
          {/* patter-patter legs */}
          {([
            [0.9, 0.55],
            [0.9, -0.55],
            [-0.8, 0.55],
            [-0.8, -0.55],
          ] as [number, number][]).map(([x, z], i) => (
            <group key={i} position={[x, 0.55, z]} ref={(el) => { legs.current[i] = el; }}>
              <mesh position={[0, -0.3, 0]} material={mat(C.wood)}>
                <cylinderGeometry args={[0.2, 0.17, 0.7, 8]} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
}
