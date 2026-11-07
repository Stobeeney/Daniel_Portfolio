import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { NAV, NAME, RESUME_URL } from '../data';
import { CubeLogo, Document } from './icons';

gsap.registerPlugin(useGSAP);

/** Logo + white pill nav. A turquoise underline slides to the hovered / focused / active link. */
export function Header() {
  const nav = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [active, setActive] = useState<string>('home');
  const activeRef = useRef(active);
  useEffect(() => { activeRef.current = active; }, [active]);

  const { contextSafe } = useGSAP({ scope: nav });

  // The link for whichever section is in the middle of the screen becomes active.
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /** Slide the underline under a link's label. */
  const moveTo = contextSafe((id: string, instant = false) => {
    const link = links.current[id];
    const label = link?.querySelector<HTMLElement>('.nav-label');
    if (!label || !indicator.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.to(indicator.current, {
      x: label.offsetLeft,
      y: label.offsetTop + label.offsetHeight + 1,
      width: label.offsetWidth,
      duration: instant || reduce ? 0 : 0.45,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  });

  // slide the underline whenever the active link changes
  useEffect(() => { moveTo(active); }, [active, moveTo]);

  useGSAP(
    () => {
      const sync = () => moveTo(activeRef.current, true);
      sync();
      // label widths change once the web fonts arrive, and on resize
      document.fonts?.ready.then(sync);
      window.addEventListener('resize', sync);
      return () => window.removeEventListener('resize', sync);
    },
    { scope: nav },
  );

  return (
    <header className="site-header">
     <div className="header-inner">
      <a className="brand" href="#home" aria-label={`${NAME} — home`}>
        <CubeLogo />
        <span>{NAME}</span>
      </a>

      <nav ref={nav} className="nav-pill" aria-label="Primary" onMouseLeave={() => moveTo(active)}>
        {NAV.map((item) => (
          <a
            key={item.id}
            ref={(el) => { links.current[item.id] = el; }}
            className="nav-link"
            href={item.href}
            aria-current={active === item.id ? 'page' : undefined}
            onMouseEnter={() => moveTo(item.id)}
            onFocus={() => moveTo(item.id)}
            onBlur={() => moveTo(active)}
            onClick={() => { setActive(item.id); moveTo(item.id); }}
          >
            <span className="nav-label">{item.label}</span>
          </a>
        ))}
        <span ref={indicator} className="nav-indicator" aria-hidden="true" />
        <a className="nav-resume" href={RESUME_URL} download aria-label="Résumé">
          <Document />
          <span className="nav-resume-text">Résumé</span>
        </a>
      </nav>
     </div>
     <span className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
