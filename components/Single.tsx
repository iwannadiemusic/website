import Image from "next/image";
import { earlier, formatDate, formatDuration, latest } from "@/lib/releases";
import { AppleIcon, SpotifyIcon } from "./Icons";
import { PreviewPlayer } from "./PreviewPlayer";

export function Single() {
  return (
    <section id="music" aria-labelledby="music-title" className="border-t border-hairline">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 id="music-title" className="display text-5xl">
          Music
        </h2>
        <div className="mt-8 grid items-center gap-8 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-12">
          <Image
            src={latest.cover}
            alt={`${latest.title} cover art`}
            width={640}
            height={640}
            sizes="(min-width: 768px) 22rem, 100vw"
            className="w-full max-w-sm rounded-2xl shadow-[0_40px_90px_-30px_rgba(255,176,58,0.35)]"
          />
          <div>
            <h3 className="display text-4xl">{latest.title}</h3>
            <p className="mt-2 text-ink-dim">
              {latest.kind}. {formatDate(latest.date)}. {formatDuration(latest.durationSeconds)}.
            </p>
            {latest.tracks ? (
              <ol className="mt-5 space-y-1 text-ink-dim">
                {latest.tracks.map((t, i) => (
                  <li key={t}>
                    <span className="mr-3 tabular-nums text-ink-dim/60">{i + 1}</span>
                    <span className="text-ink">{t}</span>
                  </li>
                ))}
              </ol>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {latest.preview ? <PreviewPlayer src={latest.preview} title={latest.title} /> : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={latest.links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#1ED760] px-6 font-semibold text-[#060607] transition-[filter] hover:brightness-110"
              >
                <SpotifyIcon className="size-5" />
                Spotify
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={latest.links.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#E0203A] px-6 font-semibold text-white transition-[filter] hover:brightness-110"
              >
                <AppleIcon className="size-5" />
                Apple Music
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
        <iframe
          title={`${latest.title} on Spotify`}
          src={`https://open.spotify.com/embed/album/${latest.spotifyId}`}
          width="100%"
          height="352"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="mt-12 w-full rounded-2xl bg-card"
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:max-w-md">
          {earlier.map((r) => (
            <li key={r.slug}>
              <a href={r.links.spotify} target="_blank" rel="noopener noreferrer" className="group block">
                <Image
                  src={r.coverThumb}
                  alt={`${r.title} cover art`}
                  width={640}
                  height={640}
                  sizes="12rem"
                  className="w-full rounded-xl transition-[filter] group-hover:brightness-110"
                />
                <p className="mt-2 font-semibold text-ink">{r.title}</p>
                <p className="text-sm text-ink-dim">
                  {r.kind}. {formatDate(r.date)}.
                </p>
                <span className="sr-only"> (opens Spotify in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
