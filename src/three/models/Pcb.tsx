import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { C } from '../palette';
import { mat } from '../materials';
import { gradientMap } from '../toon';
import { drawPcb, drawSchematic, makeTexture } from '../textures';
import { useLoop } from '../timeline';

const TOP = 0.72; // top surface of the board

/** Turquoise PCB with a blinking LED, plus a wooden clipboard carrying its schematic. */
export function Pcb({
  position,
  rotationY = 0,
  reduced,
}: {
  position: [number, number, number];
  rotationY?: number;
  reduced: boolean;
}) {
  const traces = useMemo(() => makeTexture(700, 500, drawPcb), []);
  const schematic = useMemo(() => makeTexture(780, 1005, drawSchematic), []);
  const boardTop = useMemo(() => new THREE.MeshToonMaterial({ map: traces, gradientMap, color: '#ffffff' }), [traces]);
  const paper = useMemo(() => new THREE.MeshBasicMaterial({ map: schematic, toneMapped: false }), [schematic]);
  useEffect(() => () => { traces.dispose(); schematic.dispose(); boardTop.dispose(); paper.dispose(); }, [traces, schematic, boardTop, paper]);

  // blinking LED: bright yellow ↔ dim
  const led = useRef<THREE.MeshBasicMaterial>(null);
  useLoop(reduced, (t) => {
    const on = Math.floor(t * 4) % 2 === 0;
    led.current?.color.set(on ? '#FFE27A' : '#8C6A1E');
  });

  // MCU pins: 8 per side
  const pins = useMemo(() => {
    const out: { p: [number, number, number]; r: boolean }[] = [];
    for (let i = 0; i < 8; i++) {
      const o = -1.4 + i * 0.4;
      out.push({ p: [1.2 + o, 0, 0.4 - 1.95], r: false }, { p: [1.2 + o, 0, 0.4 + 1.95], r: false });
      out.push({ p: [1.2 - 1.95, 0, 0.4 + o], r: true }, { p: [1.2 + 1.95, 0, 0.4 + o], r: true });
    }
    return out;
  }, []);

  return (
    <group position={position} rotation-y={rotationY}>
      {/* board */}
      <RoundedBox args={[14, 0.7, 10]} radius={0.25} smoothness={3} position={[0, 0.35, 0]} castShadow receiveShadow material={mat(C.turquoise)} />
      <mesh position={[0, TOP, 0]} rotation-x={-Math.PI / 2} receiveShadow material={boardTop}>
        <planeGeometry args={[13.7, 9.7]} />
      </mesh>

      {/* MCU + pins */}
      <RoundedBox args={[3.4, 0.55, 3.4]} radius={0.15} smoothness={2} position={[1.2, TOP + 0.27, 0.4]} castShadow material={mat(C.dark)} />
      <mesh position={[0.2, TOP + 0.56, -0.6]} rotation-x={-Math.PI / 2} material={mat(C.steel)}>
        <circleGeometry args={[0.18, 12]} />
      </mesh>
      {pins.map((pin, i) => (
        <mesh key={i} position={[pin.p[0], TOP + 0.08, pin.p[2]]} material={mat(C.steel)}>
          <boxGeometry args={pin.r ? [0.5, 0.1, 0.14] : [0.14, 0.1, 0.5]} />
        </mesh>
      ))}

      {/* gold header pins */}
      <RoundedBox args={[8.4, 0.7, 0.95]} radius={0.12} smoothness={2} position={[-2.2, TOP + 0.35, -3.7]} castShadow material={mat(C.darker)} />
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[-6 + i * 0.95, TOP + 1.25, -3.7]} castShadow material={mat(C.gold)}>
          <boxGeometry args={[0.24, 1.6, 0.24]} />
        </mesh>
      ))}

      {/* USB-C */}
      <RoundedBox args={[2.5, 1, 2.1]} radius={0.3} smoothness={3} position={[6.0, TOP + 0.5, 0.2]} castShadow material={mat(C.steel)} />
      <mesh position={[7.27, TOP + 0.5, 0.2]} material={mat(C.darker)}>
        <boxGeometry args={[0.12, 0.45, 1.3]} />
      </mesh>

      {/* capacitors, crystal, resistors, reset button */}
      {([
        [-1.8, 1.6, C.yellow, 0.42],
        [-3.1, 2.4, C.tan, 0.42],
        [4.0, -2.5, C.dark, 0.5],
        [2.9, 3.1, C.yellow, 0.34],
      ] as [number, number, string, number][]).map(([x, z, color, r], i) => (
        <mesh key={i} position={[x, TOP + 0.45, z]} castShadow material={mat(color)}>
          <cylinderGeometry args={[r, r, 0.9, 20]} />
        </mesh>
      ))}
      <RoundedBox args={[1.5, 0.55, 0.8]} radius={0.2} smoothness={2} position={[-3.6, TOP + 0.28, -0.9]} castShadow material={mat(C.steel)} />
      {([[-5.4, 0.6], [-5.4, 1.4], [-4.6, 3.5], [5.2, -3.4]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, TOP + 0.12, z]} material={mat(C.tan)}>
          <boxGeometry args={[0.55, 0.22, 0.3]} />
        </mesh>
      ))}
      <group position={[-5.6, TOP, 3.2]}>
        <RoundedBox args={[1.2, 0.6, 1.2]} radius={0.15} smoothness={2} position={[0, 0.3, 0]} material={mat(C.dark)} />
        <mesh position={[0, 0.7, 0]} material={mat(C.mint)}>
          <cylinderGeometry args={[0.32, 0.32, 0.3, 16]} />
        </mesh>
      </group>

      {/* blinking LED */}
      <mesh position={[4.6, TOP + 0.18, 3.1]}>
        <boxGeometry args={[0.8, 0.36, 0.55]} />
        <meshBasicMaterial ref={led} color="#FFE27A" toneMapped={false} />
      </mesh>

      {/* wooden clipboard leaning back, schematic attached */}
      <group position={[-1, 0, -7.9]} rotation-x={-0.3}>
        <RoundedBox args={[10.4, 13.6, 0.6]} radius={0.3} smoothness={3} position={[0, 6.8, 0]} castShadow receiveShadow material={mat(C.wood)} />
        <mesh position={[0, 6.3, 0.31]} receiveShadow material={paper}>
          <planeGeometry args={[9.1, 11.7]} />
        </mesh>
        <RoundedBox args={[3.8, 1.5, 1]} radius={0.3} smoothness={3} position={[0, 13.2, 0.5]} castShadow material={mat(C.steel)} />
        <mesh position={[0, 13.2, 1.02]} material={mat(C.dark)}>
          <boxGeometry args={[2.4, 0.5, 0.1]} />
        </mesh>
      </group>
    </group>
  );
}
