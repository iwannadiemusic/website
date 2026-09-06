import { latest, formatDate } from "@/lib/releases";
import { site } from "@/lib/site";
import { Section } from "./Container";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-prose space-y-5 text-lg leading-relaxed">
        <p>
          {site.name} is a rock project with a noir streak: a live band over a half-time backbeat, clean guitars
          with a little tremolo, and a voice that stays low and close to the microphone. The songs are about small
          rooms and the things people don&rsquo;t say in them.
        </p>
        <p>
          <em className="font-semibold not-italic">{latest.title}</em>, released {formatDate(latest.date)}, opens
          the new chapter. More is on the way.
        </p>
      </div>
    </Section>
  );
}
