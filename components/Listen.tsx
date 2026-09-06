import { site } from "@/lib/site";
import { latest } from "@/lib/releases";
import { Section } from "./Container";

export function Listen() {
  return (
    <Section id="listen" title="Listen" kicker="Follow on Spotify or add the single on Apple Music.">
      <div className="grid gap-6 lg:grid-cols-2">
        <iframe
          title={`${site.name} on Spotify`}
          src={site.embeds.spotifyArtist}
          width="100%"
          height="352"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="w-full rounded-xl bg-surface"
        />
        {latest.appleEmbed ? (
          <iframe
            title={`${latest.title} on Apple Music`}
            src={latest.appleEmbed}
            width="100%"
            height="175"
            loading="lazy"
            allow="autoplay *; encrypted-media *;"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            className="w-full rounded-xl bg-surface"
          />
        ) : null}
      </div>
    </Section>
  );
}
