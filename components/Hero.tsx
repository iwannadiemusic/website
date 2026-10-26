import Image from "next/image";
import { site } from "@/lib/site";
import { PlatformCards } from "./Platforms";

export function Hero() {
  return (
    <section aria-label="I WANNA DIE" className="relative overflow-x-clip">
      <div className="mx-auto w-full max-w-5xl px-5 pb-16 pt-24 sm:px-8 sm:pt-32 lg:pb-24 lg:pt-36">
        <div className="flex flex-col items-center text-center">
          <figure className="hero-photo appear relative w-full max-w-[26rem] sm:max-w-[30rem]">
            <Image
              src="/photo/hero.webp"
              alt="I WANNA DIE on a red velvet sofa in a lamplit room"
              width={896}
              height={1195}
              priority
              sizes="(min-width: 640px) 30rem, 100vw"
              className="block h-auto w-full select-none"
            />
          </figure>
          <h1
            className="wordmark rise relative -mt-[clamp(3.5rem,13vw,7.5rem)] text-[clamp(4.25rem,17vw,10.5rem)] drop-shadow-[0_6px_40px_rgba(6,6,7,0.9)]"
            style={{ animationDelay: "0.15s" }}
          >
            {site.name}
          </h1>
        </div>
        <PlatformCards className="mt-12 sm:mt-16" />
      </div>
    </section>
  );
}
