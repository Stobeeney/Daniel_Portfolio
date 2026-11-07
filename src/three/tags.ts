/** Scene labels: world-space anchor + text. The DOM pills are positioned from these every frame. */
export type SceneTag = { n: string; label: string; at: [number, number, number] };

export const TAGS: SceneTag[] = [
  { n: '05', label: 'Prototype Design', at: [22, 44, -22] },
  { n: '03', label: '3D Printing', at: [-27, 27, -10] },
  { n: '04', label: 'Desmos Art', at: [33, 24, -22] },
  { n: '02', label: 'Embedded Systems', at: [30, 6, 21] },
  { n: '01', label: 'Sumobot', at: [-20, 2, 26] },
];
