import type { SVGProps } from 'react';

/** Simple 2px-stroke icons. All decorative: the parent link/button carries the label. */
const base = (p: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> => ({
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
  ...p,
});

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);
export const ArrowDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 5v14" /><path d="M6 13l6 6 6-6" /></svg>
);
export const ArrowUp = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 19V5" /><path d="M6 11l6-6 6 6" /></svg>
);
export const Download = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 4v11" /><path d="M7 10l5 5 5-5" /><path d="M5 20h14" /></svg>
);
export const Document = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 16, height: 16, ...p })}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" />
  </svg>
);
export const GitHub = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" /><path d="M14 5l-4 14" /></svg>
);
export const LinkedIn = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v6" /><path d="M8 7.5v.01" /><path d="M12 17v-6" /><path d="M12 13.5c0-1.4 1-2.5 2.5-2.5S17 12 17 13.5V17" />
  </svg>
);
export const Mail = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);

/** The 3-face isometric cube logo: mint top, turquoise left, wood right. */
export const CubeLogo = () => (
  <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true" focusable="false">
    <polygon points="11,1 21,6.5 11,12 1,6.5" fill="#7EE7DA" />
    <polygon points="1,6.5 11,12 11,23 1,17.5" fill="#1FBFB8" />
    <polygon points="11,12 21,6.5 21,17.5 11,23" fill="#B98460" />
  </svg>
);
