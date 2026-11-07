import { LINKS, RESUME_URL, ROLES } from '../data';
import { ArrowDown, ArrowRight, Download, GitHub, LinkedIn, Mail } from './icons';
import { SceneStage } from './SceneStage';

/** "Daniel" / "Cosare" split into masked letters so GSAP can reveal them one by one. */
function Letters({ word }: { word: string }) {
  return (
    <span className="h1-word" aria-hidden="true">
      {[...word].map((ch, i) => (
        <span className="h1-char" key={i}>{ch}</span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <div id="home" className="hero-block wrap">
      <section className="hero" aria-label="Introduction">
        <div className="hero-copy">
          <div className="portrait" data-speed="0.93">
            <div className="portrait-clip">
              <img
                className="portrait-img"
                src="/daniel-cutout.webp"
                alt="Portrait of Daniel Cosare"
                width={822}
                height={1000}
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="identity" data-lag="0.12">
            <span className="rule" aria-hidden="true" />
            <h1 aria-label="Daniel Cosare.">
              <Letters word="Daniel" /> <Letters word="Cosare" />
              <span className="h1-dot" aria-hidden="true">.</span>
            </h1>
            <p className="role">
              {ROLES.map((r, i) => (
                <span key={r}>
                  {i > 0 && <> <span className="role-slash" aria-hidden="true">/</span> </>}
                  {r}
                </span>
              ))}
            </p>
          </div>

          <div className="cta" data-lag="0.25">
            <a className="btn btn-solid" href="#work">
              View projects <ArrowRight />
            </a>
            <a className="btn btn-outline" href={RESUME_URL} download>
              <Download /> Download résumé
            </a>
            <div className="icon-row">
              <a className="icon-btn" href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHub />
              </a>
              <a className="icon-btn" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedIn />
              </a>
              <a className="icon-btn" href={LINKS.email} aria-label="Email">
                <Mail />
              </a>
            </div>
          </div>
        </div>

        <div className="scene-wrap">
          <SceneStage />
        </div>
      </section>

      <div className="hero-foot">
        <a className="foot-pill" href="#work">
          <ArrowDown className="foot-arrow" width={16} height={16} /> Selected work
        </a>
      </div>
    </div>
  );
}
