import { RoundedBox } from '@react-three/drei';
import { C } from '../palette';
import { mat } from '../materials';

/** Plinth top heights — the models sit on these. */
export const TOP = {
  printer: 2.6,
  easel: 6.4,
  pcb: 3.8,
  sumobot: 0.9,
} as const;

type Block = { p: [number, number, number]; s: [number, number, number]; r?: number };

/** White rounded "landscape" blocks at different heights, one per model. */
const BLOCKS: Block[] = [
  { p: [-5, TOP.printer / 2, -5], s: [36, TOP.printer, 31], r: 1.1 }, // printer
  { p: [15, TOP.easel / 2, -19], s: [19, TOP.easel, 14], r: 1.1 }, // easel
  { p: [21, TOP.pcb / 2, 9], s: [29, TOP.pcb, 24], r: 1.1 }, // PCB + clipboard
  { p: [19.5, 4.5, -2.6], s: [14, 9, 3.4], r: 0.8 }, // block the clipboard leans on
  // scenery
  { p: [34, 3.2, -8], s: [9, 6.4, 9], r: 1.2 },
  { p: [31, 1.8, -17], s: [8, 3.6, 8], r: 1.2 },
];

export function Landscape() {
  return (
    <group>
      {/* very faint ground shadow catcher */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <shadowMaterial opacity={0.08} />
      </mesh>

      {BLOCKS.map((b, i) => (
        <RoundedBox
          key={i}
          args={b.s}
          radius={b.r ?? 1}
          smoothness={4}
          position={b.p}
          castShadow
          receiveShadow
          material={mat(C.plinth)}
        />
      ))}

      {/* low round disc under the sumobot */}
      <mesh position={[-7, TOP.sumobot / 2, 17]} castShadow receiveShadow material={mat(C.plinth)}>
        <cylinderGeometry args={[12.5, 12.5, TOP.sumobot, 64]} />
      </mesh>

      {/* little scenery props in palette colours */}
      <mesh position={[16, 2, 27.5]} castShadow material={mat(C.turquoise)}>
        <sphereGeometry args={[2, 32, 24]} />
      </mesh>
      <RoundedBox args={[3, 3, 3]} radius={0.5} smoothness={3} position={[24, 1.5, 28.5]} rotation-y={0.5} castShadow material={mat(C.yellow)} />
      <group position={[-28.5, 0, -1]}>
        <mesh position={[0, 2.6, 0]} castShadow receiveShadow material={mat(C.plinth)}>
          <cylinderGeometry args={[2.6, 2.6, 5.2, 40]} />
        </mesh>
        <mesh position={[0, 5.5, 0]} rotation-x={Math.PI / 2} castShadow material={mat(C.tan)}>
          <torusGeometry args={[1.8, 0.8, 18, 40]} />
        </mesh>
      </group>
    </group>
  );
}
