export type Release = {
  slug: string;
  title: string;
  kind: "Single" | "EP" | "Album";
  /** ISO date, e.g. 2026-09-03 */
  date: string;
  durationSeconds: number;
  cover: string;
  coverThumb: string;
  /** 30-second clip served from this site */
  preview?: string;
  links: { spotify: string; appleMusic: string };
};

export const releases: Release[] = [
  {
    slug: "cut-it-shorter",
    title: "Cut It Shorter",
    kind: "Single",
    date: "2026-09-03",
    durationSeconds: 168,
    cover: "/releases/cut-it-shorter.jpg",
    coverThumb: "/releases/cut-it-shorter-640.jpg",
    preview: "/audio/cut-it-shorter-preview.mp3",
    links: {
      spotify: "https://open.spotify.com/artist/6zax970B9VZBUVe1574g7S",
      appleMusic: "https://music.apple.com/tr/album/cut-it-shorter-single/6808525707",
    },
  },
];

export const latest = releases[0];

export function formatDuration(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
