import Image from "next/image";
import { site } from "@/lib/site";
import { PlatformCards } from "./Platforms";

export function Hero() {
  return (
    <section aria-label="I WANNA DIE" className="relative">
      <div className="hero-bleed relative flex min-h-[100svh] w-full items-end overflow-hidden">
        <Image
          src="/photo/hero.webp"
          alt="I WANNA DIE on a red velvet sofa in a lamplit room"
          fill
          priority
          sizes="100vw"
          className="appear select-none object-cover object-[50%_40%] lg:object-[50%_44%]"
        />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-10 text-center sm:px-8 sm:pb-14 lg:max-w-none lg:px-14 lg:text-right">
          <h1
            className="wordmark rise text-[clamp(4.25rem,17vw,10.5rem)] lg:text-[clamp(6rem,9vw,9rem)] drop-shadow-[0_6px_40px_rgba(6,6,7,0.85)]"
            style={{ animationDelay: "0.15s" }}
          >
            {site.name}
          </h1>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8 lg:pb-24">
        <PlatformCards className="mt-6 sm:mt-10" />
      </div>
    </section>
  );
}
