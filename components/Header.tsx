import Image from "next/image";
import { site } from "@/lib/site";
import { SpotifyIcon } from "./Icons";

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-20 flex justify-center px-3 sm:top-5">
      <nav
        aria-label="Site"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-hairline bg-[rgba(9,9,11,0.6)] p-1.5 pl-3 backdrop-blur-xl"
      >
        <a href="#top" className="flex items-center gap-2 pr-2">
          <Image src="/brand/ouroboros.png" alt="" width={24} height={24} className="size-6" priority />
          <span className="display text-base">{site.name}</span>
          <span className="sr-only">, back to top</span>
        </a>
        <a href="#music" className="hidden px-3 py-2 text-sm text-ink-dim transition-colors hover:text-ink sm:inline">
          Music
        </a>
        <a href="#bio" className="hidden px-3 py-2 text-sm text-ink-dim transition-colors hover:text-ink sm:inline">
          Bio
        </a>
        <a
          href={site.links.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 inline-flex h-9 items-center gap-2 rounded-full bg-[#1ED760] px-4 text-sm font-semibold text-[#060607] transition-[filter] hover:brightness-110"
        >
          <SpotifyIcon className="size-4" />
          Listen
          <span className="sr-only"> on Spotify (opens in a new tab)</span>
        </a>
      </nav>
    </header>
  );
}
