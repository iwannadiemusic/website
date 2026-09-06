import { site } from "@/lib/site";
import { PlatformCards, PlatformRow } from "./Platforms";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="display text-5xl">Follow</h2>
        <PlatformCards className="mt-8" />
        <div className="mt-16 flex flex-col gap-6 border-t border-hairline pt-8 text-sm text-ink-faint sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-lg text-ink-dim underline decoration-hairline underline-offset-[6px] transition-colors hover:text-ink hover:decoration-tungsten"
            >
              {site.contactEmail}
            </a>
            <p className="mt-3">
              &copy; {new Date().getFullYear()} {site.name}
            </p>
          </div>
          <PlatformRow />
        </div>
      </div>
    </footer>
  );
}
