import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { scrollState } from '../three/scrollState';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

/* ───────────── tiny DOM helpers ───────────── */
const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));
const pad2 = (n: number) => String(n).padStart(2, '0');

/** Mask-reveal a heading word by word the moment it scrolls into view. */
function revealWords(el: HTMLElement | null, trigger: gsap.DOMTarget = el as HTMLElement, start = 'top 85%') {
  if (!el) return;
  const split = SplitText.create(el, { type: 'words', mask: 'words', wordsClass: 'w' });
  gsap.from(split.words, {
    yPercent: 115,
    duration: 1,
    stagger: 0.07,
    ease: 'power4.out',
    scrollTrigger: { trigger, start, once: true },
  });
}

/**
 * Builds every scroll-linked animation. Call it inside gsap.matchMedia() so that it is reverted
 * automatically when the media query stops matching. Order matters: ScrollSmoother first, then
 * ScrollTriggers top-to-bottom through the page so pin spacing is measured correctly.
 */
export function buildScroll({ desktop }: { desktop: boolean }): () => void {
  const cleanups: Array<() => void> = [];

  const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.1,
    effects: true, // data-speed / data-lag on elements
    smoothTouch: 0.1,
  });

  anchors(smoother, cleanups);
  chrome(cleanups);
  work(desktop, cleanups);
  about(desktop, cleanups);
  skills(cleanups);
  experience();
  contact();

  // Web fonts change text metrics; re-measure every trigger once they land.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => cleanups.forEach((fn) => fn());
}

/* ───────────── in-page links go through the smoother ───────────── */
function anchors(smoother: ScrollSmoother, cleanups: Array<() => void>) {
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')!.slice(1);
    const target = id && id !== 'home' ? document.getElementById(id) : null;
    if (id && id !== 'home' && !target) return;
    e.preventDefault();
    smoother.scrollTo(target ?? 0, true, 'top top');
  };
  document.addEventListener('click', onClick);
  cleanups.push(() => document.removeEventListener('click', onClick));
}

/* ───────────── header, progress line, hero → 3D scene ───────────── */
function chrome(cleanups: Array<() => void>) {
  ScrollTrigger.create({
    start: 24,
    end: 'max',
    toggleClass: { targets: '.site-header', className: 'is-stuck' },
  });

  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.body, start: 0, end: 'max', scrub: 0.3 },
  });

  // The 3D scene turns as the hero scrolls away (read every frame in Scene.tsx).
  ScrollTrigger.create({
    trigger: '#home',
    start: 'top top',
    end: 'bottom top',
    onUpdate: (self) => { scrollState.hero = self.progress; },
  });
  cleanups.push(() => { scrollState.hero = 0; });
}

/* ───────────── WORK: pinned horizontal scroll ───────────── */
function work(desktop: boolean, cleanups: Array<() => void>) {
  const section = $('#work');
  const track = $('.work-track');
  if (!section || !track) return;
  const cards = $$('.work-card', section);

  if (!desktop) {
    // Small screens: a normal grid whose cards rise in.
    revealWords($('.work-intro .sec-title', section));
    ScrollTrigger.batch(cards, {
      start: 'top 92%',
      once: true,
      onEnter: (els) =>
        gsap.fromTo(els, { autoAlpha: 0, y: 50, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', overwrite: true }),
    });
    return;
  }

  section.classList.add('is-horizontal');
  cleanups.push(() => section.classList.remove('is-horizontal'));

  revealWords($('.work-intro .sec-title', section), section, 'top 60%');

  const cur = $('.work-cur', section)!;
  const setBar = gsap.quickSetter($('.work-bar', section)!, 'scaleX');
  const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);

  // The pin + scrubbed sideways travel. ease "none" keeps scroll and position 1:1.
  const slide = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => '+=' + distance(),
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setBar(self.progress);
        // the card nearest the centre of the screen is "current"
        const mid = window.innerWidth / 2;
        let best = 0, bestD = Infinity;
        cards.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - mid);
          if (d < bestD) { bestD = d; best = i; }
        });
        cur.textContent = pad2(best + 1);
      },
    },
  });

  // Each card is driven by its own horizontal position: it tilts + scales in, then eases out.
  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { scale: 0.86, rotate: 3, yPercent: 6, opacity: 0.4 },
      {
        scale: 1, rotate: 0, yPercent: 0, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: card, containerAnimation: slide, start: 'left 96%', end: 'left 58%', scrub: true },
      },
    );
    gsap.to(card, {
      scale: 0.93, opacity: 0.5, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: card, containerAnimation: slide, start: 'right 36%', end: 'right 4%', scrub: true },
    });
  });

  gsap.to('.work-hint-arrow', { x: 8, duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: -1 });
}

/* ───────────── ABOUT 1/3: pinned statement, sheet, stats ───────────── */
function about(desktop: boolean, cleanups: Array<() => void>) {
  const pin = $('.about-pin');
  const statement = $('.statement');
  if (!pin || !statement) return;

  const split = SplitText.create(statement, { type: 'words', wordsClass: 'sw' });
  const words = split.words;
  const stats = $$('.stat');
  const vals = $$('.stat-val');

  // numbers start at 0 and climb; restore the real text if this gets reverted
  vals.forEach((el) => {
    const final = el.textContent ?? '';
    el.textContent = '0';
    cleanups.push(() => { el.textContent = final; });
  });
  const countTo = (el: HTMLElement, o: { v: number }) => () => { el.textContent = Math.round(o.v).toLocaleString(); };

  if (desktop) {
    const each = 0.1;
    const span = each * (words.length - 1) + 0.4; // timeline length of the word fill
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: pin, start: 'top top', end: '+=240%', pin: true, scrub: 0.5, anticipatePin: 1 },
    });

    tl.fromTo(words, { opacity: 0.14 }, { opacity: 1, stagger: each, duration: 0.4 }, 0)
      .fromTo('.sheet', { xPercent: 16, rotate: 4, autoAlpha: 0 }, { xPercent: 0, rotate: 0, autoAlpha: 1, duration: span * 0.3, ease: 'power3.out' }, span * 0.08)
      .fromTo(stats, { y: 70, autoAlpha: 0, scale: 0.92 }, { y: 0, autoAlpha: 1, scale: 1, duration: span * 0.18, stagger: span * 0.07, ease: 'back.out(1.5)' }, span * 0.42);

    vals.forEach((el, i) => {
      const o = { v: 0 };
      tl.to(o, { v: Number(el.dataset.count), duration: span * 0.3, ease: 'power1.out', onUpdate: countTo(el, o) }, span * 0.46 + i * span * 0.07);
    });
    tl.to({}, { duration: span * 0.12 }); // short hold before the pin releases
  } else {
    gsap.fromTo(words, { opacity: 0.14 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: statement, start: 'top 82%', end: 'bottom 48%', scrub: true },
    });
    gsap.from('.sheet', { y: 60, autoAlpha: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.sheet', start: 'top 88%', once: true } });
    ScrollTrigger.batch(stats, {
      start: 'top 92%',
      once: true,
      onEnter: (els) => gsap.fromTo(els, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', overwrite: true }),
    });
    vals.forEach((el) => {
      const o = { v: 0 };
      gsap.to(o, { v: Number(el.dataset.count), duration: 1.6, ease: 'power2.out', onUpdate: countTo(el, o), scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });
  }
}

/* ───────────── ABOUT 2/3: skills (everything scrubbed to scroll position) ───────────── */
function skills(cleanups: Array<() => void>) {
  revealWords($('.skills .sec-title'));

  $$('.skill-group').forEach((card, i) => {
    gsap.from(card, {
      y: 100, autoAlpha: 0, rotate: i % 2 ? 2.5 : -2.5, ease: 'none',
      scrollTrigger: { trigger: card, start: 'top 96%', end: 'top 62%', scrub: true },
    });
  });

  $$('.skill').forEach((sk) => {
    const bar = $('.bar span', sk)!;
    const lv = $('.skill-lv', sk)!;
    const final = lv.textContent ?? '';
    const o = { v: 0 };
    lv.textContent = '0%';
    cleanups.push(() => { lv.textContent = final; });

    const st = { trigger: sk, start: 'top 92%', end: 'top 60%', scrub: true };
    gsap.fromTo(bar, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, ease: 'none', scrollTrigger: st });
    gsap.to(o, { v: Number(lv.dataset.lv), ease: 'none', onUpdate: () => { lv.textContent = Math.round(o.v) + '%'; }, scrollTrigger: st });
  });

  gsap.from('.inventory li', {
    y: 40, autoAlpha: 0, scale: 0.9, stagger: 0.05, ease: 'none',
    scrollTrigger: { trigger: '.inventory', start: 'top 96%', end: 'top 66%', scrub: true },
  });
}

/* ───────────── ABOUT 3/3: the timeline draws itself ───────────── */
function experience() {
  revealWords($('.exp .sec-title'));

  gsap.fromTo('.tl-fill', { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '.timeline', start: 'top 62%', end: 'bottom 62%', scrub: true },
  });

  $$('.tl-item').forEach((item) => {
    gsap.fromTo(item, { autoAlpha: 0.2, x: -36 }, {
      autoAlpha: 1, x: 0, ease: 'none',
      scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 62%', scrub: true },
    });
    // the dot lights up once the line has reached it and stays lit
    ScrollTrigger.create({ trigger: item, start: 'top 62%', end: 'max', toggleClass: { targets: item, className: 'is-on' } });
  });
}

/* ───────────── CONTACT ───────────── */
function contact() {
  const section = $('#contact');
  if (!section) return;

  // the dark panel opens up from a rounded card to a full-bleed sheet
  gsap.fromTo('.contact-panel',
    { clipPath: 'inset(14% 6% 0% 6% round 72px)' },
    {
      clipPath: 'inset(0% 0% 0% 0% round 48px 48px 0px 0px)', ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 25%', scrub: true },
    },
  );

  const title = $('.contact-title');
  if (title) {
    const split = SplitText.create(title, { type: 'words', mask: 'words', wordsClass: 'w' });
    gsap.from(split.words, {
      yPercent: 115, stagger: 0.12, ease: 'none',
      scrollTrigger: { trigger: title, start: 'top 90%', end: 'top 50%', scrub: true },
    });
  }

  gsap.from(['.contact-lead', '.contact-mail'], {
    y: 50, autoAlpha: 0, stagger: 0.2, ease: 'none',
    scrollTrigger: { trigger: '.contact-lead', start: 'top 94%', end: 'top 62%', scrub: true },
  });
  gsap.from('.contact-links li', {
    y: 40, autoAlpha: 0, stagger: 0.12, ease: 'none',
    scrollTrigger: { trigger: '.contact-links', start: 'top 96%', end: 'top 66%', scrub: true },
  });

  // marquee: loops forever, speeds up and flips direction with scroll velocity
  const loop = gsap.to('.marquee-track', { xPercent: -50, ease: 'none', duration: 32, repeat: -1 });
  ScrollTrigger.create({
    trigger: '.marquee',
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? loop.resume() : loop.pause()),
    onUpdate: (self) => {
      const dir = self.direction;
      const boost = Math.min(Math.abs(self.getVelocity()) / 220, 7);
      gsap.to(loop, {
        timeScale: dir * (1 + boost), duration: 0.25, overwrite: true,
        onComplete: () => { gsap.to(loop, { timeScale: dir, duration: 1.2 }); },
      });
    },
  });
}
