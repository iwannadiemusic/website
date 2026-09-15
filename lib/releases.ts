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
    slug: "nobody-made-you",
    title: "Nobody Made You",
    kind: "Single",
    date: "2026-09-14",
    durationSeconds: 140,
    cover: "/releases/nobody-made-you.jpg",
    coverThumb: "/releases/nobody-made-you-640.jpg",
    preview: "/audio/nobody-made-you-preview.mp3",
    links: {
      spotify: "https://open.spotify.com/artist/6zax970B9VZBUVe1574g7S",
      appleMusic: "https://music.apple.com/tr/album/nobody-made-you-single/6812222211",
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
