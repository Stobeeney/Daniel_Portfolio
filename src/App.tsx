import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Pattern } from './components/Pattern';
import { Work } from './components/sections/Work';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { intro } from './motion/intro';
import { buildScroll } from './motion/scroll';

gsap.registerPlugin(useGSAP);

export default function App() {
  const page = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Hero entrance (full motion only).
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        intro();
      });

      // Smooth scroll + every scroll-linked animation. Pins / horizontal travel only on desktop;
      // with reduced motion nothing here runs and the page is a normal, fully visible document.
      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 900px)' },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
          if (!motion) return;
          return buildScroll({ desktop });
        },
      );
    },
    { scope: page },
  );

  return (
    <div className="page" ref={page}>
      {/* fixed layers live outside the smooth-scroll wrapper */}
      <Pattern />
      <a className="skip-link" href="#work">Skip to content</a>
      <Header />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero />
            <Work />
            <About />
            <Contact />
          </main>
        </div>
      </div>
    </div>
  );
}
