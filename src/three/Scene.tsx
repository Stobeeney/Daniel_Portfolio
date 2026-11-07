import { useEffect, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Landscape, TOP } from './models/Landscape';
import { Printer } from './models/Printer';
import { Sumobot } from './models/Sumobot';
import { Easel } from './models/Easel';
import { Pcb } from './models/Pcb';
import { Drone } from './models/Drone';
import { TAGS } from './tags';
import { scrollState } from './scrollState';

/** World units visible across the canvas width (the camera zoom follows the canvas size). */
const WORLD_W = 82;
/** On phones the scene is zoomed in so the models aren't tiny (label pills are clamped to the canvas). */
const WORLD_W_PHONE = 66;
const COARSE = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
const LOOK_AT = new THREE.Vector3(4.5, 10.5, -1);

/** Isometric camera: fixed angle, zoom tracks the canvas width so the scene always fits. */
function IsoCamera() {
  const camera = useThree((s) => s.camera) as THREE.OrthographicCamera;
  const width = useThree((s) => s.size.width);
  useEffect(() => {
    camera.position.set(60, 54, 60);
    camera.zoom = width / (width < 600 ? WORLD_W_PHONE : WORLD_W);
    camera.near = 0.1;
    camera.far = 500;
    camera.lookAt(LOOK_AT);
    camera.updateProjectionMatrix();
  }, [camera, width]);
  return null;
}

/** In reduced-motion mode the loop is off, so ask for exactly one frame once everything is mounted. */
function StaticFrame({ reduced }: { reduced: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!reduced) return;
    const id = requestAnimationFrame(() => invalidate());
    return () => cancelAnimationFrame(id);
  }, [reduced, invalidate]);
  return null;
}

/**
 * Keeps the DOM label pills glued to their 3D anchors: projects each anchor to the canvas
 * every frame and writes a transform. (Plain DOM — no drei <Html> — so React 19 stays happy.)
 */
function TagProjector({ tagRefs, rig, onReady }: { tagRefs: MutableRefObject<(HTMLElement | null)[]>; rig: MutableRefObject<THREE.Group | null>; onReady?: () => void }) {
  const v = useRef(new THREE.Vector3());
  const announced = useRef(false);
  useFrame(({ camera, size }) => {
    rig.current?.updateMatrixWorld();
    TAGS.forEach((t, i) => {
      const el = tagRefs.current[i];
      if (!el) return;
      v.current.set(...t.at);
      rig.current?.localToWorld(v.current); // anchors travel with the rig
      v.current.project(camera);
      const half = el.offsetWidth / 2 + 2;
      const x = Math.min(size.width - half, Math.max(half, (v.current.x * 0.5 + 0.5) * size.width));
      const y = (-v.current.y * 0.5 + 0.5) * size.height;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
    });
    if (!announced.current) {
      announced.current = true;
      onReady?.();
    }
  });
  return null;
}

/**
 * Everything in the scene hangs off this group. While the hero scrolls out, the group turns,
 * sinks and shrinks a little (scrollState.hero is driven by ScrollTrigger in motion/scroll.ts).
 */
function ScrollRig({ rig }: { rig: MutableRefObject<THREE.Group | null> }) {
  const cur = useRef(0);
  useFrame(() => {
    const g = rig.current;
    if (!g) return;
    cur.current += (scrollState.hero - cur.current) * 0.12; // ease toward the target
    const p = cur.current;
    g.rotation.y = -p * 0.7;
    g.position.y = -p * 7;
    g.scale.setScalar(1 - p * 0.1);
  });
  return null;
}

export type SceneProps = {
  /** false while off-screen: the render loop stops */
  running: boolean;
  /** prefers-reduced-motion: render a single static frame */
  reduced: boolean;
  /** the label pills the scene should keep positioned */
  tagRefs: MutableRefObject<(HTMLElement | null)[]>;
  /** called once the first frame (and label positions) exist */
  onReady?: () => void;
};

export default function Scene({ running, reduced, tagRefs, onReady }: SceneProps) {
  const frameloop = reduced ? 'demand' : running ? 'always' : 'never';
  const rig = useRef<THREE.Group>(null);
  return (
    <Canvas
      orthographic
      shadows="percentage"
      flat
      dpr={[1, COARSE ? 1.5 : 2]}
      frameloop={frameloop}
      gl={{ alpha: true, antialias: true, localClippingEnabled: true }}
      camera={{ position: [60, 54, 60], zoom: 10, near: 0.1, far: 500 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      role="img"
      aria-label="Interactive isometric scene: a 3D printer printing a bust, a hovering drone, a sumobot lunging forward, an easel with the Mona Lisa drawn as a graph, and a circuit board with its schematic."
    >
      <IsoCamera />
      <StaticFrame reduced={reduced} />
      <ScrollRig rig={rig} />
      <TagProjector tagRefs={tagRefs} rig={rig} onReady={onReady} />

      <hemisphereLight args={['#ffffff', '#ECE8E0', 1.75]} />
      <directionalLight
        position={[-11, 44, 16]}
        intensity={1.55}
        castShadow
        shadow-mapSize={COARSE ? [1024, 1024] : [2048, 2048]}
        shadow-camera-left={-55}
        shadow-camera-right={55}
        shadow-camera-top={55}
        shadow-camera-bottom={-55}
        shadow-camera-near={1}
        shadow-camera-far={160}
        shadow-bias={-0.0002}
        shadow-normalBias={0.06}
        shadow-radius={5}
      />

      <group ref={rig}>
      <Landscape />
      <Printer position={[-5, TOP.printer, -5]} reduced={reduced} />
      <Sumobot position={[-7, TOP.sumobot, 17]} reduced={reduced} />
      <Easel position={[15, TOP.easel, -19]} rotationY={Math.PI / 4 - 0.15} />
      <Pcb position={[21, TOP.pcb, 9]} rotationY={0} reduced={reduced} />
      <Drone position={[7, 38, -13]} reduced={reduced} />
      </group>

    </Canvas>
  );
}
