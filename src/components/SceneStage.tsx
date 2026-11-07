import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TAGS } from '../three/tags';

gsap.registerPlugin(useGSAP);

// The whole three.js bundle loads on demand, after the text has painted.
const Scene = lazy(() => import('../three/Scene'));

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/**
 * Wrapper for the live 3D canvas.
 * - mounts the scene lazily (idle callback) and shows a light placeholder meanwhile
 * - stops the render loop while scrolled out of view (IntersectionObserver)
 * - renders one static frame when prefers-reduced-motion is set
 */
export function SceneStage() {
  const box = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);
  const reduced = usePrefersReducedMotion();
  const tagRefs = useRef<(HTMLElement | null)[]>([]);

  // Labels pop in one by one once the first frame has been drawn.
  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.scene-tag', { scale: 0, autoAlpha: 0, duration: 0.55, stagger: 0.1, delay: 0.1, ease: 'back.out(2.2)' });
      });
    },
    { scope: box, dependencies: [ready] },
  );

  useEffect(() => {
    const hasIdle = 'requestIdleCallback' in window;
    const idle = hasIdle
      ? window.requestIdleCallback(() => setMounted(true), { timeout: 600 })
      : window.setTimeout(() => setMounted(true), 150);
    return () => {
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className={`scene${ready ? ' is-ready' : ''}`} data-speed="1.06">
      <div className="scene-placeholder" aria-hidden="true" />
      {mounted && (
        <Suspense fallback={null}>
          <Scene running={inView} reduced={reduced} tagRefs={tagRefs} onReady={() => setReady(true)} />
        </Suspense>
      )}
      {/* DOM label pills; Scene moves them to sit on their 3D anchors */}
      {TAGS.map((t, i) => (
        <div key={t.n} className="scene-tag-anchor" ref={(el) => { tagRefs.current[i] = el; }}>
          <span className="scene-tag">
            <b>{t.n}</b>
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}
