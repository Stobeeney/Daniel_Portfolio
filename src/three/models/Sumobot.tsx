import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { C } from '../palette';
import { mat } from '../materials';
import { lunge, useLoop } from '../timeline';

const WHEEL_R = 1.9;
const WHEELS: [number, number][] = [
  [3.7, 5.25],
  [3.7, -5.25],
  [-3.7, 5.25],
  [-3.7, -5.25],
];

/**
 * Competition sumobot: turquoise chassis, grey wedge blade up front, dark deck,
 * yellow battery, mint mini-PCB, two glowing IR "eyes" and four wheels with yellow
 * spokes. Faces +x and lunges forward twice per loop.
 */
export function Sumobot({
  position,
  reduced,
}: {
  position: [number, number, number];
  reduced: boolean;
}) {
  const body = useRef<THREE.Group>(null);
  const wheels = useRef<(THREE.Group | null)[]>([]);

  const blade = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(3.4, 0);
    s.lineTo(0, 3.1);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 8.6,
      bevelEnabled: true,
      bevelSize: 0.15,
      bevelThickness: 0.15,
      bevelSegments: 2,
    });
    g.translate(0, 0, -4.3);
    return g;
  }, []);

  useLoop(reduced, (t) => {
    const { x, jolt } = lunge(t);
    if (body.current) {
      body.current.position.x = x;
      body.current.position.y = jolt * 0.28 * Math.abs(Math.sin(t * 55));
      body.current.rotation.z = jolt * 0.05 * Math.sin(t * 70);
    }
    wheels.current.forEach((w) => {
      if (w) w.rotation.z = -x / WHEEL_R;
    });
  });

  return (
    <group position={position}>
      <group ref={body}>
        {/* turquoise chassis */}
        <RoundedBox args={[11, 2.6, 9]} radius={0.7} smoothness={4} position={[0, 2.5, 0]} castShadow receiveShadow material={mat(C.turquoise)} />
        {/* dark deck */}
        <RoundedBox args={[8.8, 0.7, 7.4]} radius={0.3} smoothness={3} position={[-0.3, 4.1, 0]} castShadow receiveShadow material={mat(C.dark)} />
        {/* yellow battery */}
        <RoundedBox args={[4.4, 2.1, 5.2]} radius={0.5} smoothness={3} position={[-1.9, 5.5, 0]} castShadow material={mat(C.yellow)} />
        <mesh position={[-1.9, 6.6, 1.6]} material={mat(C.brown)}>
          <boxGeometry args={[1, 0.18, 0.5]} />
        </mesh>
        {/* mint mini-PCB with a chip */}
        <RoundedBox args={[3.2, 0.35, 2.9]} radius={0.12} smoothness={2} position={[2.5, 4.65, 0]} castShadow material={mat(C.mint)} />
        <mesh position={[2.6, 4.98, 0]} castShadow material={mat(C.darker)}>
          <boxGeometry args={[1.1, 0.3, 1.1]} />
        </mesh>
        <mesh position={[3.4, 4.9, 1.1]} material={mat(C.yellow)}>
          <boxGeometry args={[0.35, 0.22, 0.35]} />
        </mesh>

        {/* grey wedge blade */}
        <mesh geometry={blade} position={[5.4, 0.2, 0]} castShadow receiveShadow material={mat(C.steel)} />

        {/* IR sensor eyes with glowing mint lenses */}
        {[-2.5, 2.5].map((z) => (
          <group key={z} position={[5.6, 3.35, z]}>
            <mesh rotation-z={Math.PI / 2} castShadow material={mat(C.darker)}>
              <cylinderGeometry args={[0.62, 0.62, 0.9, 24]} />
            </mesh>
            <mesh position={[0.5, 0, 0]} scale={[0.5, 1, 1]}>
              <sphereGeometry args={[0.4, 20, 14]} />
              <meshBasicMaterial color={C.mint} toneMapped={false} />
            </mesh>
          </group>
        ))}

        {/* wheels: dark tyre + yellow spokes */}
        {WHEELS.map(([x, z], i) => (
          <group key={i} position={[x, WHEEL_R, z]}>
            <group ref={(el) => { wheels.current[i] = el; }}>
              <mesh rotation-x={Math.PI / 2} castShadow receiveShadow material={mat(C.darker)}>
                <cylinderGeometry args={[WHEEL_R, WHEEL_R, 1.5, 36]} />
              </mesh>
              {[0, 1, 2].map((k) => (
                <mesh key={k} position={[0, 0, Math.sign(z) * 0.78]} rotation-z={(k * Math.PI) / 3} material={mat(C.yellow)}>
                  <boxGeometry args={[2.9, 0.3, 0.12]} />
                </mesh>
              ))}
              <mesh position={[0, 0, Math.sign(z) * 0.78]} rotation-x={Math.PI / 2} material={mat(C.yellow)}>
                <cylinderGeometry args={[0.38, 0.38, 0.14, 16]} />
              </mesh>
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}
