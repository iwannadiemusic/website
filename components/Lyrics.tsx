import { latest } from "@/lib/releases";
import { Section } from "./Container";

export function Lyrics() {
  const blocks = latest.lyrics;
  if (!blocks?.length) return null;
  return (
    <Section id="lyrics" title="Lyrics" kicker={latest.title}>
      <div className="grid gap-10 text-lg leading-relaxed md:grid-cols-2 md:gap-x-12">
        {blocks.map((b, i) => (
          <div key={i} className={b.kind === "chorus" ? "border-l-2 border-accent pl-5 text-fg" : "text-fg/85"}>
            {b.lines.map((line, j) => (
              <p key={j}>{line}</p>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
