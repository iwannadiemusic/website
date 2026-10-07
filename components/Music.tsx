import { site } from "@/lib/site";

/** Spotify's own artist player: it updates itself with every release, so the site never has to. */
export function Music() {
  return (
    <section id="music" aria-labelledby="music-title" className="border-t border-hairline">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 id="music-title" className="display text-5xl">
          Music
        </h2>
        <iframe
          title={`${site.name} on Spotify`}
          src={site.embeds.spotifyArtist}
          width="100%"
          height="452"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="mt-8 w-full rounded-2xl bg-card"
        />
      </div>
    </section>
  );
}
