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
  /** Spotify album id, for the embed player */
  spotifyId: string;
  tracks?: string[];
  links: { spotify: string; appleMusic: string };
};

export const releases: Release[] = [
  {
    slug: "the-obsession",
    title: "The Obsession",
    kind: "EP",
    date: "2026-10-04",
    durationSeconds: 922,
    cover: "/releases/the-obsession.jpg",
    coverThumb: "/releases/the-obsession.jpg",
    spotifyId: "05qMzRIND9nTgFOacS9qhD",
    tracks: ["Keyring", "Withdrawal", "With Your Friends", "Bad For You", "Every City"],
    links: {
      spotify: "https://open.spotify.com/album/05qMzRIND9nTgFOacS9qhD",
      // not on Apple Music yet (5 Oct 2026): the artist page until it lands
      appleMusic: "https://music.apple.com/tr/artist/i-wanna-die/6808376735",
    },
  },
  {
    slug: "two-seconds-dark",
    title: "Two Seconds Dark",
    kind: "Single",
    date: "2026-09-17",
    durationSeconds: 177,
    cover: "/releases/two-seconds-dark.jpg",
    coverThumb: "/releases/two-seconds-dark-640.jpg",
    spotifyId: "7LU1X6xwmSd2neDFfJ0hSa",
    links: {
      spotify: "https://open.spotify.com/album/7LU1X6xwmSd2neDFfJ0hSa",
      appleMusic: "https://music.apple.com/tr/album/two-seconds-dark-single/6813823403",
    },
  },
  {
    slug: "nobody-made-you",
    title: "Nobody Made You",
    kind: "Single",
    date: "2026-09-14",
    durationSeconds: 140,
    cover: "/releases/nobody-made-you.jpg",
    coverThumb: "/releases/nobody-made-you-640.jpg",
    preview: "/audio/nobody-made-you-preview.mp3",
    spotifyId: "4OWJGjbNlRrUEJyOIZp7El",
    links: {
      spotify: "https://open.spotify.com/album/4OWJGjbNlRrUEJyOIZp7El",
      appleMusic: "https://music.apple.com/tr/album/nobody-made-you-single/6812222211",
    },
  },
];

export const latest = releases[0];
export const earlier = releases.slice(1);

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
