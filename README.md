# Daniel Rein Cosare — Player One

Personal portfolio of **Daniel Rein M. Cosare**, a Computer Engineering student at PUP Manila who works in robotics, embedded systems, PCB design, AI and full stack development.

It's a simple one-page site with a light arcade feel: bold black-and-lime design, plus a few game touches.

Repository: [github.com/Stobeeney/Daniel_Portfolio](https://github.com/Stobeeney/Daniel_Portfolio)

---

## What's on the page

| Section | Theme |
|---|---|
| Hero | **Player 1 — Ready.** Name, class, stats |
| 01 Character | About me + character sheet |
| 02 Skill Tree | Skills with level bars + tool inventory |
| 03 Quest Log | 11 projects, with expandable "loot" (highlights) |
| 04 Save Files | Career timeline |
| 05 Arcade | **Bug Run**, a playable mini game |
| 06 Continue? | Contact links |

**Game touches**
- **Bug Run** arcade game: jump bugs, dodge drones, collect chips, beat your high score
- Lime progress line under the header fills as you scroll
- "Area discovered" pop-ups as you reach each section
- Achievement for opening 3 loot drops
- Konami code (↑ ↑ ↓ ↓ ← → ← → B A) toggles **God Mode** (in Bug Run you smash bugs instead of crashing)

Animations turn off automatically for visitors with *reduce motion* enabled.

---

## Editing content

All content lives in arrays at the top of `index.php`: `$stats`, `$skills`, `$projects`, `$career`, `$tools`, `$socials`. Edit those and the page updates.

Colors and fonts are CSS variables at the top of `style.css` (`--acc` is the lime accent).

## Tech

PHP · HTML · CSS · vanilla JavaScript. No build step. Deployed on Vercel via `vercel-php`.

## Run locally

```bash
git clone https://github.com/Stobeeney/Daniel_Portfolio.git
cd Daniel_Portfolio
php -S localhost:3000
```

Then open <http://localhost:3000>.

## Contact

- **Email:** reincosare07@gmail.com
- **GitHub:** [Stobeeney](https://github.com/Stobeeney)
- **Facebook:** [rein.cosare.7](https://www.facebook.com/rein.cosare.7/)
- **Instagram:** [@rein_cosare](https://www.instagram.com/rein_cosare/)
