export type LyricBlock = { kind: "verse" | "chorus" | "bridge"; lines: string[] };

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
  links: { spotify?: string; appleMusic?: string };
  appleEmbed?: string;
  lyrics?: LyricBlock[];
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
    appleEmbed: "https://embed.music.apple.com/tr/album/cut-it-shorter-single/6808525707",
    lyrics: [
      {
        kind: "verse",
        lines: [
          "backwards on the kitchen chair, towel on my neck",
          "she's telling me about the guy from work again",
          "and I say nothing",
          "she puts two fingers on my jaw and turns my head",
          "says hold still",
          "so I hold still",
          "she asks me how short I want it",
        ],
      },
      {
        kind: "chorus",
        lines: [
          "cut it shorter, I've got time",
          "nowhere I have to be tonight",
          "that's a lie, I said it anyway",
          "take it down to nothing if you want",
          "your hands are already in my hair",
          "cut it shorter, I've got time",
        ],
      },
      {
        kind: "verse",
        lines: [
          "eleven days, and I'm back on the kitchen chair",
          "she says that grew fast, and she doesn't look up",
          "and I say a month",
          "she turns my head with two fingers, and I let her",
          "she knows",
          "and she lets me",
          "then she asks me again, how short",
        ],
      },
      {
        kind: "chorus",
        lines: [
          "cut it shorter, I've got time",
          "nowhere I have to be tonight",
          "that's a lie, I said it anyway",
          "take it down to nothing if you want",
          "your hands are already in my hair",
          "cut it shorter, I've got time",
        ],
      },
    ],
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
