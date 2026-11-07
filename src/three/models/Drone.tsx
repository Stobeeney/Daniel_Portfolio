import { useRef } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { C } from '../palette';
import { mat } from '../materials';
import { LOOP, useLoop } from '../timeline';

const ARM_ANGLES = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];

/** One three-blade prop with a faint translucent blur disc. Spins around Y. */
function Prop({ spin }: { spin: (g: THREE.Group | null) => void }) {
  return (
    <group position={[0, 1.15, 0]}>
      <group ref={spin}>
        <mesh material={mat(C.steel)}>
          <cylinderGeometry args={[0.34, 0.34, 0.34, 16]} />
        </mesh>
        {[0, 1, 2].map((k) => (
          <group key={k} rotation-y={(k * Math.PI * 2) / 3}>
            <mesh position={[1.75, 0.02, 0]} material={mat(C.darker)}>
              <boxGeometry args={[3.5, 0.08, 0.5]} />
            </mesh>
          </group>
        ))}
      </group>
      {/* blur disc */}
      <mesh position={[0, -0.05, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[3.6, 40]} />
        <meshBasicMaterial color={C.dark} transparent opacity={0.1} depthWrite={false} />
      </mesh>
    </group>
  );
}

/**
 * Quadcopter: egg-shaped white canopy with a dark slot window, grey truss arms in an X,
 * dark motors, 3-blade props, landing legs, a GPS puck on a mast and a yellow battery
 * plug. Hovers (bobs ±0.55) and casts no shadow.
 */
export function Drone({
  position,
  rotationY = Math.PI / 4,
  reduced,
}: {
  position: [number, number, number];
  rotationY?: number;
  reduced: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const props = useRef<(THREE.Group | null)[]>([]);
  const spinAngle = useRef(0);

  useLoop(reduced, (t, delta) => {
    const phase = (t / LOOP) * Math.PI * 4; // two bobs per loop so it tiles seamlessly
    if (root.current) {
      root.current.position.y = position[1] + Math.sin(phase) * 0.55;
      root.current.rotation.x = Math.sin(phase + 0.8) * 0.05;
      root.current.rotation.z = Math.cos(phase) * 0.06;
    }
    if (!reduced) spinAngle.current += delta * 55;
    props.current.forEach((p, i) => {
      if (p) p.rotation.y = spinAngle.current * (i % 2 ? -1 : 1) + i;
    });
  });

  return (
    <group position={[position[0], 0, position[2]]} rotation-y={rotationY}>
      <group ref={root} position={[0, position[1], 0]} scale={1.3}>
        {/* egg-shaped canopy */}
        <mesh scale={[2.2, 1.55, 2.9]} material={mat(C.plinth)}>
          <sphereGeometry args={[1, 40, 28]} />
        </mesh>
        {/* dark slot window */}
        <RoundedBox args={[2.6, 0.5, 0.2]} radius={0.15} smoothness={3} position={[0, 0.78, 2.22]} rotation-x={-0.78} material={mat(C.darker)} />
        {/* top vent slot */}
        <RoundedBox args={[1.9, 0.12, 0.5]} radius={0.05} smoothness={2} position={[0, 1.5, -0.4]} material={mat(C.darker)} />
        {/* yellow battery plug under the tail */}
        <RoundedBox args={[1.2, 0.55, 0.8]} radius={0.15} smoothness={2} position={[0, -1.35, -1.9]} material={mat(C.yellow)} />
        {/* dark belly */}
        <mesh position={[0, -0.95, 0]} scale={[1.9, 0.55, 2.4]} material={mat(C.dark)}>
          <sphereGeometry args={[1, 28, 16]} />
        </mesh>

        {/* GPS mast + puck */}
        <mesh position={[0, 2.35, -1.3]} material={mat(C.darker)}>
          <cylinderGeometry args={[0.09, 0.09, 1.6, 8]} />
        </mesh>
        <mesh position={[0, 3.25, -1.3]} material={mat(C.dark)}>
          <cylinderGeometry args={[0.65, 0.7, 0.3, 24]} />
        </mesh>
        <mesh position={[0, 3.43, -1.3]} material={mat(C.mint)}>
          <cylinderGeometry args={[0.3, 0.3, 0.08, 16]} />
        </mesh>

        {/* truss arms in an X: alternating grey / dark segments */}
        {ARM_ANGLES.map((a, i) => (
          <group key={i} rotation-y={a}>
            {[0, 1, 2, 3, 4].map((s) => (
              <mesh key={s} position={[1.6 + s * 1.0, 0.1, 0]} material={mat(s % 2 ? C.dark : C.aluDark)}>
                <boxGeometry args={[1.02, 0.62, 0.62]} />
              </mesh>
            ))}
            {/* motor */}
            <mesh position={[7.1, 0.35, 0]} material={mat(C.dark)}>
              <cylinderGeometry args={[0.95, 1.05, 1.3, 24]} />
            </mesh>
            <group position={[7.1, 0.35, 0]}>
              <Prop spin={(g) => { props.current[i] = g; }} />
            </group>
          </group>
        ))}

        {/* landing legs + skids */}
        {[-1, 1].map((sx) => (
          <group key={sx}>
            {[-1, 1].map((sz) => (
              <mesh key={sz} position={[sx * 1.95, -2.35, sz * 1.5]} rotation-z={-sx * 0.3} material={mat(C.darker)}>
                <cylinderGeometry args={[0.13, 0.13, 3.3, 8]} />
              </mesh>
            ))}
            <mesh position={[sx * 2.55, -3.95, 0]} rotation-x={Math.PI / 2} material={mat(C.darker)}>
              <cylinderGeometry args={[0.16, 0.16, 5.4, 8]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
