import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { C } from '../palette';
import { mat } from '../materials';
import { drawMonaLisaGraph, makeTexture } from '../textures';

/** Wooden easel holding a canvas that shows the Mona Lisa drawn as a Desmos-style graph. */
export function Easel({
  position,
  rotationY = 0,
}: {
  position: [number, number, number];
  rotationY?: number;
}) {
  const tex = useMemo(() => makeTexture(600, 760, drawMonaLisaGraph), []);
  // Unlit so the graph stays crisp and readable at small sizes.
  const face = useMemo(() => new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }), [tex]);
  useEffect(() => () => { tex.dispose(); face.dispose(); }, [tex, face]);

  return (
    <group position={position} rotation-y={rotationY}>
      {/* front legs (lean back slightly) */}
      {[-6.2, 6.2].map((x) => (
        <RoundedBox key={x} args={[1.1, 20.5, 1.1]} radius={0.25} smoothness={2} position={[x, 10.2, 1.6]} rotation-x={-0.05} rotation-z={x > 0 ? -0.05 : 0.05} castShadow material={mat(C.wood)} />
      ))}
      {/* rear leg */}
      <RoundedBox args={[1.1, 19.5, 1.1]} radius={0.25} smoothness={2} position={[0, 9.6, -4.6]} rotation-x={0.3} castShadow material={mat(C.brown)} />
      {/* cross bar */}
      <RoundedBox args={[13, 0.9, 1]} radius={0.2} smoothness={2} position={[0, 6.2, 1.1]} castShadow material={mat(C.wood)} />
      {/* canvas tray */}
      <RoundedBox args={[14, 1, 3]} radius={0.25} smoothness={2} position={[0, 3.4, 1.6]} castShadow receiveShadow material={mat(C.wood)} />
      {/* canvas board */}
      <RoundedBox args={[12.6, 16, 0.8]} radius={0.2} smoothness={2} position={[0, 12.1, 0.7]} castShadow receiveShadow material={mat(C.plinth)} />
      <mesh position={[0, 12.1, 1.12]} receiveShadow material={face}>
        <planeGeometry args={[12, 15.2]} />
      </mesh>
      {/* top clamp */}
      <RoundedBox args={[13.2, 1.2, 1.7]} radius={0.3} smoothness={2} position={[0, 20.6, 0.8]} castShadow material={mat(C.wood)} />
      <RoundedBox args={[1.2, 1.6, 1.3]} radius={0.25} smoothness={2} position={[-3.2, 21.7, 0.8]} castShadow material={mat(C.brown)} />
      <RoundedBox args={[1.2, 1.6, 1.3]} radius={0.25} smoothness={2} position={[3.2, 21.7, 0.8]} castShadow material={mat(C.brown)} />
    </group>
  );
}
