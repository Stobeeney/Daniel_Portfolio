import { ABOUT_STATEMENT, CAREER, SHEET, SKILLS, STATS, TOOLS } from '../../data';

/**
 * About — three scroll-driven parts:
 *  1. a pinned statement whose words light up as you scroll, with the character sheet and stats
 *  2. the skill set, with bars that fill as each card passes through the viewport
 *  3. an experience timeline whose line draws itself
 */
export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      {/* 1 — statement + sheet + stats (pinned on desktop) */}
      <div className="about-pin">
        <div className="wrap about-grid">
          <div className="about-copy">
            <p className="eyebrow">02 — About</p>
            <h2 id="about-title" className="visually-hidden">About Daniel</h2>
            <p className="statement">{ABOUT_STATEMENT}</p>
          </div>

          <div className="about-side">
            <aside className="sheet" aria-label="Quick facts">
              <div className="sheet-head"><span>Quick facts</span><span className="sheet-id">#0001</span></div>
              <dl>
                {SHEET.map((r) => (
                  <div key={r.k}>
                    <dt>{r.k}</dt>
                    <dd className={r.k === 'Status' ? 'is-open' : undefined}>{r.v}</dd>
                  </div>
                ))}
              </dl>
            </aside>

            <ul className="stats">
              {STATS.map((s) => (
                <li className="stat" key={s.label}>
                  <span className="stat-num">
                    <span className="stat-val" data-count={s.value}>{s.value.toLocaleString()}</span>
                    <span className="stat-plus">+</span>
                  </span>
                  <span className="stat-lbl">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2 — skills */}
      <div className="wrap skills">
        <p className="eyebrow">Skill set</p>
        <h3 className="sec-title sec-title-sm">Where the hours <span className="acc dot-end">went</span></h3>

        <div className="skill-groups">
          {Object.entries(SKILLS).map(([group, list]) => (
            <div className="skill-group" key={group}>
              <h4 className="group-name">{group}</h4>
              <ul>
                {list.map(([name, kit, lvl]) => (
                  <li className="skill" key={name}>
                    <div className="skill-top">
                      <span className="skill-name">{name}</span>
                      <span className="skill-lv" data-lv={lvl}>{lvl}%</span>
                    </div>
                    <div className="bar" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={lvl} aria-label={`${name} proficiency`}>
                      <span style={{ width: `${lvl}%` }} />
                    </div>
                    <div className="skill-tools">{kit}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ul className="inventory" aria-label="Tools">
          {TOOLS.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>

      {/* 3 — experience */}
      <div className="wrap exp">
        <p className="eyebrow">Experience</p>
        <h3 className="sec-title sec-title-sm">The road <span className="acc dot-end">so far</span></h3>

        <ol className="timeline">
          <span className="tl-line" aria-hidden="true"><span className="tl-fill" /></span>
          {CAREER.map((c, i) => (
            <li className={`tl-item${c.active ? ' is-active' : ''}`} key={i}>
              <span className="tl-year">{c.year}</span>
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-body">
                <h4 className="tl-role">{c.role}</h4>
                {c.org && <p className="tl-org">{c.org}</p>}
                <p className="tl-desc">{c.desc}</p>
              </div>
              <span className="tl-state">{c.active ? 'Now' : 'Done'}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
