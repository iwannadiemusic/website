import Image from "next/image";
import { site } from "@/lib/site";
import { latest } from "@/lib/releases";
import { Container } from "./Container";
import { PreviewPlayer } from "./PreviewPlayer";
import { ServiceLink } from "./ServiceLink";

export function Hero() {
  return (
    <section aria-label="Introduction" className="relative overflow-hidden">
      <Container className="grid items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pb-28 lg:pt-24">
        <div className="relative">
          <Image
            src="/brand/ouroboros.png"
            alt=""
            width={1023}
            height={1023}
            priority
            aria-hidden="true"
            className="mark turning pointer-events-none absolute left-0 -top-[18%] w-full max-w-none select-none opacity-[0.09] sm:-top-[28%] lg:-left-[14%] lg:w-[130%]"
          />
          <h1 className="wordmark relative text-[clamp(5.75rem,22vw,11rem)] lg:text-[clamp(8rem,13vw,11rem)]">
            I Wanna
            <br />
            Die
          </h1>
          <p className="relative mt-8 max-w-lg text-lg text-muted">{site.tagline}</p>
          <p className="relative mt-3 max-w-lg text-lg">
            The new single, <em className="font-semibold not-italic">{latest.title}</em>, is out now.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center gap-3">
            {latest.preview ? <PreviewPlayer src={latest.preview} title={latest.title} /> : null}
            <ServiceLink service="spotify" href={site.links.spotify} />
            <ServiceLink service="appleMusic" href={site.links.appleMusic} />
          </div>
        </div>
        <a
          href="#music"
          className="group relative mx-auto block w-full max-w-md lg:max-w-none"
          aria-label={`${latest.title}, the new single. See all music.`}
        >
          <Image
            src={latest.cover}
            alt={`${latest.title} cover art: a man on a kitchen chair with a towel round his neck, a woman's hand in his hair, a wall clock behind them.`}
            width={1400}
            height={1400}
            priority
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
            className="w-full rounded-sm shadow-[0_40px_90px_-30px_var(--glow)] transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </a>
      </Container>
    </section>
  );
}
