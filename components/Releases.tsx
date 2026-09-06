import Image from "next/image";
import { formatDate, formatDuration, releases } from "@/lib/releases";
import { Section } from "./Container";
import { ServiceLink } from "./ServiceLink";

export function Releases() {
  return (
    <Section id="music" title="Music">
      <ul className="divide-y divide-line border-y border-line">
        {releases.map((r) => (
          <li key={r.slug} className="grid grid-cols-[6rem_1fr] gap-5 py-7 sm:grid-cols-[9rem_1fr] sm:gap-8">
            <Image
              src={r.coverThumb}
              alt=""
              width={640}
              height={640}
              sizes="(min-width: 640px) 9rem, 6rem"
              className="w-full rounded-sm"
            />
            <div className="min-w-0">
              <h3 className="text-2xl font-semibold leading-tight">{r.title}</h3>
              <p className="mt-1 text-muted">
                {r.kind}, released {formatDate(r.date)}. {formatDuration(r.durationSeconds)}.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                {r.links.spotify ? <ServiceLink service="spotify" href={r.links.spotify} variant="quiet" /> : null}
                {r.links.appleMusic ? (
                  <ServiceLink service="appleMusic" href={r.links.appleMusic} variant="quiet" />
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
