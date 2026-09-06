import { Atmosphere } from "@/components/Atmosphere";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Single } from "@/components/Single";
import { Bio } from "@/components/Bio";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import { latest, releases } from "@/lib/releases";

function jsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: site.name,
    alternateName: site.handle,
    url: site.url,
    image: `${site.url}${latest.cover}`,
    sameAs: Object.values(site.links),
    album: releases.map((r) => ({
      "@type": "MusicAlbum",
      name: r.title,
      albumReleaseType: `https://schema.org/${r.kind}Release`,
      datePublished: r.date,
      image: `${site.url}${r.cover}`,
      byArtist: { "@type": "MusicGroup", name: site.name },
      url: r.links.appleMusic,
    })),
  });
}

export default function Home() {
  return (
    <>
      <Atmosphere />
      <Header />
      <main id="top" className="relative flex-1">
        <Hero />
        <Single />
        <Bio />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
    </>
  );
}
