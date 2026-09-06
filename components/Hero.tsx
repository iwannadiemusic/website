import Image from "next/image";
import { site } from "@/lib/site";
import { latest } from "@/lib/releases";
import { PlatformCards } from "./Platforms";

export function Hero() {
  return (
    <section aria-label="I WANNA DIE" className="relative">
      <div className="mx-auto w-full max-w-5xl px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:pb-24 lg:pt-40">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/brand/ouroboros.png"
            alt=""
            width={1023}
            height={1023}
            priority
            className="appear turning size-36 select-none drop-shadow-[0_0_40px_rgba(255,176,58,0.28)] sm:size-48"
          />
          <h1 className="wordmark rise mt-8 text-[clamp(4.25rem,17vw,10.5rem)]" style={{ animationDelay: "0.15s" }}>
            {site.name}
          </h1>
          <p className="rise mt-6 max-w-md text-lg text-ink-dim" style={{ animationDelay: "0.25s" }}>
            <a href="#music" className="text-ink underline decoration-tungsten/60 underline-offset-[6px] hover:decoration-tungsten">
              {latest.title}
            </a>{" "}
            is out now.
          </p>
        </div>
        <PlatformCards className="mt-12 sm:mt-16" />
      </div>
    </section>
  );
}
