import { useFrame, type RootState } from '@react-three/fiber';

/** Everything in the scene loops on one 4-second clock. */
export const LOOP = 4;
/** Time shown when motion is reduced: the print is finished, bot mid-rest. */
export const STATIC_T = 3.2;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const easeOutCubic = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
export const easeInOutCubic = (x: number) => {
  const t = clamp01(x);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
export const easeInOutSine = (x: number) => -(Math.cos(Math.PI * clamp01(x)) - 1) / 2;

/** Triangle wave in [-1, 1] with period 1 — used for the zig-zag gantry moves. */
export const tri = (u: number) => (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * u));

/**
 * Print progress 0 → 1 over the loop:
 * 0.15–2.9 s printing, 2.9–3.7 s hold, 3.7–4.0 s quick rewind so it can restart.
 */
export function printProgress(t: number): number {
  if (t < 0.15) return 0;
  if (t < 2.9) return easeInOutSine((t - 0.15) / 2.75) * 0.15 + ((t - 0.15) / 2.75) * 0.85;
  if (t < 3.7) return 1;
  return 1 - easeInOutCubic((t - 3.7) / 0.3);
}

/** 1 while the nozzle is actually laying filament (fades in/out at the edges). */
export function printActivity(t: number): number {
  if (t < 0.15 || t > 3.0) return 0;
  const fadeIn = clamp01((t - 0.15) / 0.2);
  const fadeOut = clamp01((3.0 - t) / 0.25);
  return Math.min(fadeIn, fadeOut);
}

const LUNGES = [0.45, 2.25]; // two lunges per loop
const OUT = 0.2; // fast out
const BACK = 0.85; // eased return

/** Sumobot lunge: x travel (world units) and an impact "jolt" 0–1 right after each hit. */
export function lunge(t: number, distance = 4.4): { x: number; jolt: number } {
  for (const start of LUNGES) {
    const d = t - start;
    if (d >= 0 && d < OUT) return { x: distance * easeOutCubic(d / OUT), jolt: 0 };
    if (d >= OUT && d < OUT + BACK) {
      const k = (d - OUT) / BACK;
      return { x: distance * (1 - easeInOutCubic(k)), jolt: Math.exp(-k * 9) * (1 - k) };
    }
  }
  return { x: 0, jolt: 0 };
}

/** Subscribe to the shared loop clock. `reduced` freezes it at STATIC_T. */
export function useLoop(
  reduced: boolean,
  cb: (t: number, delta: number, state: RootState) => void,
) {
  useFrame((state, delta) => {
    const t = reduced ? STATIC_T : state.clock.elapsedTime % LOOP;
    cb(t, delta, state);
  });
}
