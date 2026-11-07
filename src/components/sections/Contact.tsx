import { EMAIL, NAME, SOCIALS } from '../../data';
import { ArrowRight, ArrowUp } from '../icons';

const MARQUEE = Array.from({ length: 6 }, () => NAME);

/** Contact — a dark panel that opens up as you arrive, a velocity-reactive marquee, and the footer. */
export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact-panel">
        <div className="wrap contact-inner">
          <p className="eyebrow eyebrow-light">03 — Contact</p>
          <h2 id="contact-title" className="contact-title">
            Let&rsquo;s build <span className="dot-end">something</span>
          </h2>
          <p className="contact-lead">
            Have a robot, a board or a product that needs to exist? Send a note — I reply fast.
          </p>

          <a className="contact-mail" href={`mailto:${EMAIL}`}>
            <span>{EMAIL}</span>
            <ArrowRight width={34} height={34} />
          </a>

          <ul className="contact-links">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  <span className="cl-label">{s.label}</span>
                  <span className="cl-handle">{s.handle}</span>
                  <ArrowRight className="cl-arrow" width={20} height={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <div className="marquee-set" key={k}>
                {MARQUEE.map((w, i) => (
                  <span key={i} className={i % 2 ? 'is-outline' : undefined}>
                    {w} <i>✦</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <footer className="wrap site-footer">
          <span>© {new Date().getFullYear()} {NAME}</span>
          <a className="to-top" href="#home">
            Back to top <ArrowUp width={16} height={16} />
          </a>
        </footer>
      </div>
    </section>
  );
}
