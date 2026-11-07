# Daniel Cosare — portfolio hero

Vite + React + TypeScript. The right-hand scene is live 3D (three.js via `@react-three/fiber` + `@react-three/drei`);
page motion is GSAP (`gsap` + `@gsap/react`). Plain CSS variables, no UI framework.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

## Before you ship

- **Résumé:** drop your PDF at `public/daniel-cosare-resume.pdf` (both Résumé buttons link to it).
- **LinkedIn:** set your profile URL in `src/data.ts` (`LINKS.linkedin`).

## Scroll choreography (GSAP)

Everything lives in `src/motion/scroll.ts`, built inside `gsap.matchMedia()` so it is reverted when the media query stops matching.

| Section | What scroll controls |
|---|---|
| Whole page | **ScrollSmoother** (smooth scroll, `data-speed` / `data-lag` parallax), a progress line in the header, solid header once scrolled, in-page links go through `smoother.scrollTo` |
| Hero | the 3D scene turns, sinks and shrinks as the hero leaves (`scrollState.hero` → `ScrollRig` in `Scene.tsx`) |
| Work | section **pins** and the track of 11 cards travels sideways (`containerAnimation`, `ease: "none"`); each card tilts/scales in by its horizontal position; live `04 / 11` counter + progress bar |
| About | pinned statement: words light up, the fact sheet slides in, stats count up — all scrubbed. Then skill cards + bars + `%` scrubbed to position, and a timeline whose line draws itself |
| Contact | dark panel opens from a rounded card to full-bleed, title reveals, marquee speeds up / reverses with scroll velocity |

Below 900px the pins are dropped (Work becomes a card grid, About stacks); with `prefers-reduced-motion` no scroll animation runs at all and the page is a normal document.

## Where things are

| Path | What |
|---|---|
| `src/styles.css` | design tokens (`:root`) and all layout |
| `src/App.tsx` | page shell + `gsap.matchMedia` wiring (intro, scroll) |
| `src/motion/` | `intro.ts` (hero entrance + idle loops), `scroll.ts` (all scroll-linked animation) |
| `src/data.ts` | every piece of content: projects, skills, career, stats, links |
| `src/components/` | `Header` (sliding nav underline, section-aware), `Hero`, `Pattern`, `SceneStage` (lazy canvas + labels), `sections/` (`Work`, `About`, `Contact`) |
| `src/three/Scene.tsx` | canvas, isometric camera, lights, label projection |
| `src/three/models/` | `Printer`, `Bust`, `Sumobot`, `Easel`, `Pcb`, `Drone`, `Landscape` — all built from primitives |
| `src/three/textures.ts` | canvas-drawn textures: Mona Lisa graph, schematic, PCB traces |
| `src/three/timeline.ts` | the 4-second loop (print progress, sumobot lunges) |
| `src/three/toon.ts` | 5-step toon gradient map (120, 175, 215, 240, 255), linear-filtered |

## Performance & motion

- The whole 3D bundle is a lazy chunk, mounted on idle behind a light placeholder.
- DPR is capped at 2; the render loop runs only while the canvas is in view (IntersectionObserver).
- `prefers-reduced-motion`: GSAP intros are skipped and the scene renders a single static frame (print finished).
