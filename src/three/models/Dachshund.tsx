import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { C } from '../palette';
import { mat } from '../materials';
import { LOOP, useLoop } from '../timeline';

const BALL_R = 2;
const BALL_X = 13; // centre of the ball's roll
const BALL_AMP = 5;
const BALL_Z = 27;
const DOG_Z = 31.2;

/**
 * A dachshund playing fetch-ish: the teal ball rolls back and forth and the dog trots after it,
 * turning round (towards the viewer) at each end, play-bowing and wagging. Everything runs on whole
 * numbers of cycles per loop so it tiles seamlessly. Faces +x, built from primitives.
 */
export function Dachshund({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Group>(null);
  const ball = useRef<THREE.Mesh>(null);
  const legs = useRef<(THREE.Group | null)[]>([]);

  const bodyGeo = useMemo(() => new THREE.CapsuleGeometry(1.7, 6.2, 8, 20), []);
  const snoutGeo = useMemo(() => new THREE.CapsuleGeometry(0.72, 1.7, 6, 14), []);
  const tailGeo = useMemo(() => new THREE.CapsuleGeometry(0.3, 2.6, 4, 8), []);

  useLoop(reduced, (t) => {
    const phase = (t / LOOP) * Math.PI * 2;
    const bx = BALL_X + BALL_AMP * Math.sin(phase);
    const s = Math.tanh(Math.cos(phase) * 4); // +1 chasing right, -1 chasing left, ~0 while turning
    const run = Math.abs(s);

    if (ball.current) {
      ball.current.position.set(bx, BALL_R, BALL_Z);
      ball.current.rotation.z = -bx / BALL_R; // rolls without slipping
    }
    if (root.current) {
      root.current.position.set(bx - s * 4, 0, DOG_Z);
      root.current.rotation.y = -(1 - s) * (Math.PI / 2); // turns through "facing the camera"
    }
    const stride = phase * 8; // 8 steps per loop
    if (body.current) {
      body.current.position.y = Math.abs(Math.sin(stride)) * 0.28 * run;
      body.current.rotation.z = -(1 - run) * 0.2; // play bow when it turns
    }
    if (head.current) head.current.rotation.z = Math.sin(stride * 0.5) * 0.08 + (1 - run) * 0.12;
    if (tail.current) tail.current.rotation.y = Math.sin(phase * 16) * (0.45 + 0.4 * (1 - run));
    legs.current.forEach((leg, i) => {
      if (leg) leg.rotation.z = Math.sin(stride + (i === 0 || i === 3 ? 0 : Math.PI)) * (0.25 + 0.5 * run);
    });
  });

  return (
    <group>
      {/* the ball */}
      <mesh ref={ball} castShadow material={mat(C.turquoise)}>
        <sphereGeometry args={[BALL_R, 32, 24]} />
      </mesh>

      <group ref={root}>
        <group ref={body}>
          {/* long low body + chest */}
          <mesh geometry={bodyGeo} position={[0, 3.6, 0]} rotation-z={Math.PI / 2} scale={[1, 1, 0.95]} castShadow material={mat(C.wood)} />
          <mesh position={[2.6, 3.8, 0]} castShadow material={mat(C.wood)}>
            <sphereGeometry args={[1.95, 24, 18]} />
          </mesh>
          {/* belly patch */}
          <mesh position={[0.2, 2.3, 0]} scale={[3.6, 0.5, 1.2]} material={mat(C.tan)}>
            <sphereGeometry args={[1, 20, 12]} />
          </mesh>

          {/* collar */}
          <mesh position={[4.2, 4.35, 0]} rotation-y={Math.PI / 2} rotation-x={0.25} material={mat(C.mint)}>
            <torusGeometry args={[1.25, 0.2, 8, 24]} />
          </mesh>
          <mesh position={[4.9, 3.2, 0]} material={mat(C.yellow)}>
            <sphereGeometry args={[0.32, 12, 10]} />
          </mesh>

          {/* head */}
          <group ref={head} position={[5.5, 4.9, 0]}>
            <mesh castShadow material={mat(C.wood)}>
              <sphereGeometry args={[1.45, 24, 18]} />
            </mesh>
            <mesh geometry={snoutGeo} position={[1.9, -0.4, 0]} rotation-z={Math.PI / 2} castShadow material={mat(C.tan)} />
            <mesh position={[2.95, -0.15, 0]} material={mat(C.darker)}>
              <sphereGeometry args={[0.42, 14, 10]} />
            </mesh>
            {[-1, 1].map((z) => (
              <group key={z}>
                <mesh position={[0.95, 0.4, z * 0.95]} material={mat(C.darker)}>
                  <sphereGeometry args={[0.2, 10, 8]} />
                </mesh>
                {/* floppy ear */}
                <mesh position={[-0.35, -0.75, z * 1.35]} rotation-x={z * 0.25} scale={[0.5, 1.35, 0.8]} castShadow material={mat(C.brown)}>
                  <sphereGeometry args={[0.95, 16, 12]} />
                </mesh>
              </group>
            ))}
          </group>

          {/* tail */}
          <group ref={tail} position={[-4.5, 4.0, 0]}>
            <mesh geometry={tailGeo} position={[-0.8, 0.7, 0]} rotation-z={-0.9} castShadow material={mat(C.brown)} />
          </group>

          {/* four short legs, hinged at the hips */}
          {([
            [3.3, 1.05],
            [3.3, -1.05],
            [-3.5, 1.05],
            [-3.5, -1.05],
          ] as [number, number][]).map(([x, z], i) => (
            <group key={i} position={[x, 2.6, z]} ref={(el) => { legs.current[i] = el; }}>
              <mesh position={[0, -0.85, 0]} castShadow material={mat(C.wood)}>
                <cylinderGeometry args={[0.5, 0.42, 1.8, 12]} />
              </mesh>
              <mesh position={[0.15, -1.8, 0]} scale={[1.3, 0.7, 1]} castShadow material={mat(C.brown)}>
                <sphereGeometry args={[0.5, 12, 10]} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
}
