import Image from "next/image";
import { site } from "@/lib/site";
import { PlatformCards } from "./Platforms";

export function Hero() {
  return (
    <section aria-label="I WANNA DIE" className="relative">
      <div className="mx-auto w-full max-w-5xl px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:pb-24 lg:pt-40">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/brand/logo.png"
            alt=""
            width={400}
            height={640}
            priority
            className="appear h-40 w-auto select-none drop-shadow-[0_0_40px_rgba(255,176,58,0.28)] sm:h-56"
          />
          <h1 className="wordmark rise mt-8 text-[clamp(4.25rem,17vw,10.5rem)]" style={{ animationDelay: "0.15s" }}>
            {site.name}
          </h1>
        </div>
        <PlatformCards className="mt-12 sm:mt-16" />
      </div>
    </section>
  );
}
