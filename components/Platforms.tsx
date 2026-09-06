import type { ComponentType } from "react";
import { site } from "@/lib/site";
import { AppleIcon, ArrowIcon, InstagramIcon, SpotifyIcon, TikTokIcon } from "./Icons";

type Platform = {
  key: keyof typeof site.links;
  name: string;
  action: string;
  color: string;
  Icon: ComponentType<{ className?: string }>;
};

export const platforms: Platform[] = [
  { key: "spotify", name: "Spotify", action: "Listen", color: "#1ED760", Icon: SpotifyIcon },
  { key: "appleMusic", name: "Apple Music", action: "Listen", color: "#FA243C", Icon: AppleIcon },
  { key: "tiktok", name: "TikTok", action: `@${site.handle}`, color: "#69C9D0", Icon: TikTokIcon },
  { key: "instagram", name: "Instagram", action: `@${site.handle}`, color: "#E1306C", Icon: InstagramIcon },
];

export function PlatformCards({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 sm:gap-4 ${className}`}>
      {platforms.map((p, i) => (
        <li key={p.key} className="rise" style={{ animationDelay: `${0.35 + i * 0.08}s` }}>
          <a
            href={site.links[p.key]}
            target="_blank"
            rel="noopener noreferrer"
            className="plat flex min-h-[7.5rem] items-center gap-5 rounded-3xl p-5 sm:min-h-[9.5rem] sm:p-7"
            style={{ "--plat": p.color } as React.CSSProperties}
          >
            <p.Icon className="plat-icon size-11 shrink-0 sm:size-14" />
            <span className="min-w-0 flex-1">
              <span className="display block text-4xl">{p.name}</span>
              <span className="mt-1 block truncate text-ink-faint">{p.action}</span>
            </span>
            <span className="plat-go grid size-10 shrink-0 place-items-center rounded-full">
              <ArrowIcon className="size-4" />
            </span>
            <span className="sr-only">
              {p.name}, opens in a new tab
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function PlatformRow() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-3">
      {platforms.map((p) => (
        <li key={p.key}>
          <a
            href={site.links[p.key]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-1 text-ink-dim transition-colors hover:text-ink"
          >
            <p.Icon className="size-[1.1em]" />
            <span>{p.name}</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
