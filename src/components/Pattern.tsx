import { PATTERN_ROWS, PATTERN_TEXT } from '../data';

/**
 * Background: "Daniel Cosare · " repeated in 12 rows. Rows alternate solid / outlined and
 * are offset -40, -210, -380px in a repeating cycle. Purely decorative.
 */
export function Pattern() {
  return (
    <div className="pattern" aria-hidden="true">
      {Array.from({ length: PATTERN_ROWS }, (_, i) => (
        <div
          key={i}
          className={`pat-row ${i % 2 ? 'outline' : 'fill'}`}
          style={{ marginLeft: -40 - (i % 3) * 170 }}
        >
          {PATTERN_TEXT}
        </div>
      ))}
    </div>
  );
}
