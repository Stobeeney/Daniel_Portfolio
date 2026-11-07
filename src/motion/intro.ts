import gsap from 'gsap';

/** Hero intro timeline + gentle idle loops. Call inside a gsap.matchMedia() / useGSAP context. */
export function intro() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.pat-row', { autoAlpha: 0, duration: 1.2, stagger: 0.04, ease: 'power2.out' }, 0)
    .from('.brand, .nav-pill', { autoAlpha: 0, y: -18, duration: 0.7, stagger: 0.1 }, 0.1)
    .fromTo(
      '.portrait-clip',
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut', clearProps: 'clipPath' },
      0.2,
    )
    .from('.portrait-img', { scale: 1.2, yPercent: 8, transformOrigin: '50% 100%', duration: 1.4 }, '<')
    .from('.rule', { scaleX: 0, transformOrigin: '0% 50%', duration: 0.9, ease: 'power3.inOut' }, '-=0.55')
    .from('.h1-char', { yPercent: 115, duration: 0.9, stagger: 0.035, ease: 'power4.out' }, '-=0.55')
    .from('.h1-dot', { scale: 0, transformOrigin: '50% 80%', duration: 0.6, ease: 'back.out(3)' }, '-=0.3')
    .from('.role', { autoAlpha: 0, y: 14, duration: 0.7 }, '-=0.45')
    .from('.role-slash', { scale: 0, rotate: -90, duration: 0.5, stagger: 0.12, ease: 'back.out(2.4)' }, '<0.1')
    .from('.cta > *', { autoAlpha: 0, y: 18, scale: 0.94, duration: 0.6, stagger: 0.07, ease: 'back.out(1.6)' }, '-=0.4')
    .from('.scene-wrap', { autoAlpha: 0, scale: 0.94, y: 24, duration: 1.1 }, 0.3)
    .from('.foot-pill', { autoAlpha: 0, y: 16, duration: 0.6 }, '-=0.6');

  // Idle: background rows drift in alternating directions (skipped on touch screens to save battery).
  if (!window.matchMedia('(pointer: coarse)').matches) {
    gsap.utils.toArray<HTMLElement>('.pat-row').forEach((row, i) => {
      gsap.to(row, {
        x: (i % 2 ? 1 : -1) * 70,
        duration: 16 + (i % 4) * 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });
  }
  // The arrow nudges down.
  gsap.to('.foot-arrow', { y: 4, duration: 0.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
}
