import { site } from "@/lib/site";

export function Bio() {
  return (
    <section id="bio" aria-labelledby="bio-title" className="border-t border-hairline">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 id="bio-title" className="display text-5xl">
          Bio
        </h2>
        <div className="mt-8 max-w-[52ch] space-y-5 text-lg leading-relaxed text-ink-dim">
          {site.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="display pt-2 text-4xl leading-tight text-ink">{site.bioClose}</p>
        </div>
      </div>
    </section>
  );
}
