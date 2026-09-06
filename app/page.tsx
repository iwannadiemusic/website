import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Releases } from "@/components/Releases";
import { Lyrics } from "@/components/Lyrics";
import { About } from "@/components/About";
import { Listen } from "@/components/Listen";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import { latest, releases } from "@/lib/releases";

function jsonLd() {
  const group = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: site.name,
    url: site.url,
    genre: "Rock",
    image: `${site.url}${latest.cover}`,
    sameAs: Object.values(site.links),
    album: releases.map((r) => ({
      "@type": "MusicAlbum",
      name: r.title,
      albumReleaseType: `https://schema.org/${r.kind}Release`,
      datePublished: r.date,
      image: `${site.url}${r.cover}`,
      byArtist: { "@type": "MusicGroup", name: site.name },
      url: r.links.appleMusic ?? r.links.spotify,
    })),
  };
  return JSON.stringify(group);
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <Releases />
        <Lyrics />
        <About />
        <Listen />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
    </>
  );
}
