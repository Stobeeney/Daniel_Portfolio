import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { C } from '../palette';
import { mat } from '../materials';
import { printActivity, printProgress, tri, useLoop } from '../timeline';
import { Bust, BUST_H } from './Bust';

/* Local layout (units ≈ cm). The printer faces +z. */
const BASE_H = 2.8;
const POST_X = 11.6;
const POST_Z = -4;
const POST_H = 25;
const BED_TOP = 4.9; // top of the dark bed plate
const NOZZLE_TIP = 3.6; // distance from the rail centre down to the nozzle tip
const HEAD_Z = -0.8;
const TOP_Y = BASE_H + POST_H; // top of the posts

/**
 * Bambu-A1-style bed-slinger (no logos): white base, two aluminium posts + top beam,
 * an X-rail that rises with the print, a toolhead that zig-zags along X, a dark bed
 * that slides along Z, a tilted touchscreen, and a PTFE tube from toolhead to post.
 * It prints the turquoise bust, revealed bottom-up with a clipping plane.
 */
export function Printer({
  position,
  reduced,
}: {
  position: [number, number, number];
  reduced: boolean;
}) {
  const rail = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const bed = useRef<THREE.Group>(null);
  const tube = useRef<THREE.Mesh>(null);

  // World-space plane: everything above `constant` is clipped.
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0), []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3()], false, 'catmullrom', 0.5), []);

  // Placeholder geometry; replaced every frame by the animated tube.
  const tubeGeo = useMemo(
    () => new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(), new THREE.Vector3(0, 1, 0)), 2, 0.26, 4),
    [],
  );

  useLoop(reduced, (t) => {
    const p = printProgress(t);
    const act = printActivity(t);

    const tipY = BED_TOP + 0.2 + p * BUST_H;
    const railY = tipY + NOZZLE_TIP;
    const headX = tri(t * 1.7) * 4.4 * act;
    const bedZ = HEAD_Z + tri(t * 1.05 + 0.25) * 2.4 * act;

    if (rail.current) rail.current.position.y = railY;
    if (head.current) head.current.position.x = headX;
    if (bed.current) bed.current.position.z = bedZ;
    plane.constant = position[1] + BED_TOP + p * BUST_H + 0.05;

    // PTFE tube: toolhead top → arch → top of the right post
    if (tube.current) {
      const a = new THREE.Vector3(headX + 0.8, railY + 2.2, HEAD_Z - 1);
      const d = new THREE.Vector3(POST_X, TOP_Y + 0.1, POST_Z);
      const peak = Math.max(a.y, d.y) + 4.2;
      curve.points = [
        a,
        new THREE.Vector3(a.x + 0.4, a.y + 2.2, a.z - 0.6),
        new THREE.Vector3((a.x + d.x) / 2 + 1, Math.max(peak - 0.6, a.y + 3), (a.z + d.z) / 2),
        new THREE.Vector3(d.x - 1.6, d.y + 3.2, d.z),
        new THREE.Vector3(d.x - 0.5, d.y + 1, d.z),
        d,
      ];
      tube.current.geometry.dispose();
      tube.current.geometry = new THREE.TubeGeometry(curve, 40, 0.26, 8, false);
    }
  });

  return (
    <group position={position}>
      {/* base */}
      <RoundedBox args={[26, BASE_H, 24]} radius={0.9} smoothness={4} position={[0, BASE_H / 2, 0]} castShadow receiveShadow material={mat(C.plinth)} />

      {/* two-post arch + top beam */}
      {[-POST_X, POST_X].map((x) => (
        <RoundedBox key={x} args={[2.6, POST_H, 3.2]} radius={0.5} smoothness={3} position={[x, BASE_H + POST_H / 2, POST_Z]} castShadow receiveShadow material={mat(C.alu)} />
      ))}
      <RoundedBox args={[25.6, 2.4, 3.2]} radius={0.55} smoothness={3} position={[0, TOP_Y - 1.2, POST_Z]} castShadow receiveShadow material={mat(C.alu)} />

      {/* X-rail + toolhead (rises with the print) */}
      <group ref={rail} position={[0, BED_TOP + 3.8, 0]}>
        <RoundedBox args={[21, 1.6, 2.2]} radius={0.4} smoothness={3} position={[0, 0, POST_Z]} castShadow receiveShadow material={mat(C.aluDark)} />
        <group ref={head} position={[0, 0, HEAD_Z]}>
          <RoundedBox args={[6, 3, 1]} radius={0.3} smoothness={2} position={[0, 0, -2.9]} castShadow material={mat(C.dark)} />
          <RoundedBox args={[5.4, 4.2, 4.6]} radius={0.8} smoothness={4} position={[0, 0, 0]} castShadow receiveShadow material={mat(C.alu)} />
          {/* round dark fan + yellow hub */}
          <mesh position={[0, -0.2, 2.35]} rotation-x={Math.PI / 2} castShadow material={mat(C.dark)}>
            <cylinderGeometry args={[1.55, 1.55, 0.5, 32]} />
          </mesh>
          <mesh position={[0, -0.2, 2.7]} rotation-x={Math.PI / 2} material={mat(C.yellow)}>
            <cylinderGeometry args={[0.62, 0.62, 0.3, 24]} />
          </mesh>
          {/* nozzle */}
          <mesh position={[0, -2.9, 0]} castShadow material={mat(C.steel)}>
            <cylinderGeometry args={[0.6, 0.14, 1.4, 16]} />
          </mesh>
        </group>
      </group>

      {/* PTFE tube (geometry rebuilt each frame) */}
      <mesh ref={tube} geometry={tubeGeo} castShadow material={mat(C.darker)} />

      {/* bed: sliding carriage + dark plate, with the bust on top */}
      <group ref={bed} position={[0, 0, HEAD_Z]}>
        <RoundedBox args={[14, 1.4, 14]} radius={0.4} smoothness={3} position={[0, BASE_H + 0.7, 0]} castShadow receiveShadow material={mat(C.alu)} />
        <RoundedBox args={[16.5, 0.7, 16.5]} radius={0.3} smoothness={3} position={[0, BED_TOP - 0.35, 0]} castShadow receiveShadow material={mat(C.dark)} />
        <group position={[0, BED_TOP, 0]} rotation-y={Math.PI / 4}>
          <Bust plane={plane} />
        </group>
      </group>

      {/* tilted touchscreen, front-right of the base */}
      <group position={[8.6, BASE_H + 0.3, 10]} rotation-x={0.5}>
        <RoundedBox args={[7.4, 0.8, 4.6]} radius={0.3} smoothness={3} castShadow receiveShadow material={mat(C.plinth)} />
        <mesh position={[0, 0.41, 0]} receiveShadow material={mat(C.darker)}>
          <boxGeometry args={[6.5, 0.06, 3.8]} />
        </mesh>
        <mesh position={[-1.5, 0.46, 0]} rotation-x={-Math.PI / 2} material={mat(C.mint)}>
          <torusGeometry args={[0.95, 0.14, 8, 32]} />
        </mesh>
        <mesh position={[1.4, 0.46, -0.45]} material={mat(C.turquoise)}>
          <boxGeometry args={[2.2, 0.05, 0.28]} />
        </mesh>
        <mesh position={[1.4, 0.46, 0.35]} material={mat(C.steel)}>
          <boxGeometry args={[1.5, 0.05, 0.22]} />
        </mesh>
      </group>
    </group>
  );
}
