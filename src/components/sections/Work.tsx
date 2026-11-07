import { LINKS, PROJECTS } from '../../data';
import { ArrowRight } from '../icons';

function Intro({ headingId }: { headingId?: string }) {
  return (
    <>
      <p className="eyebrow">01 — Work</p>
      <h2 id={headingId} className="sec-title">
        {PROJECTS.length} projects, built <span className="dot-end">end&nbsp;to&nbsp;end</span>
      </h2>
      <p className="work-hint">
        Robots, boards, firmware and the software around them. Scroll or swipe
        <ArrowRight className="work-hint-arrow" width={18} height={18} />
      </p>
    </>
  );
}

/**
 * Work — eleven projects on a horizontal track. On desktop the section pins and the
 * track travels sideways as you scroll (see motion/scroll.ts); elsewhere it is a plain grid.
 */
export function Work() {
  const total = String(PROJECTS.length).padStart(2, '0');
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      {/* phones: the heading sits above the swipeable cards instead of being a slide */}
      <div className="work-intro-m"><Intro /></div>

      <div className="work-stage">
        <ol className="work-track">
          <li className="work-intro">
            <Intro headingId="work-title" />
          </li>

          {PROJECTS.map((p) => (
            <li key={p.num} className="work-card">
              <div className="wc-top">
                <span className="wc-num">{p.num}</span>
                <span className="wc-type">{p.type}</span>
              </div>
              <h3 className="wc-title">{p.title}</h3>
              <p className="wc-mission">{p.mission}</p>
              <ul className="wc-tech" aria-label="Tech">
                {p.tech.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <div className="wc-loot">
                <p className="wc-loot-label">Highlights</p>
                <ul>
                  {p.loot.map((l) => <li key={l}>{l}</li>)}
                </ul>
              </div>
            </li>
          ))}

          <li className="work-end">
            <p className="eyebrow">That&rsquo;s the reel</p>
            <p className="work-end-title">More on GitHub.</p>
            <a className="btn btn-solid" href={LINKS.github} target="_blank" rel="noopener noreferrer">
              Browse the code <ArrowRight />
            </a>
          </li>
        </ol>
      </div>

      {/* live readout, driven by the horizontal scroll */}
      <div className="work-hud" aria-hidden="true">
        <span className="work-count"><b className="work-cur">01</b> / {total}</span>
        <span className="work-progress"><span className="work-bar" /></span>
      </div>
    </section>
  );
}
