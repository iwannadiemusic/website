import { Atmosphere } from "@/components/Atmosphere";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Music } from "@/components/Music";
import { Bio } from "@/components/Bio";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

function jsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: site.name,
    alternateName: site.handle,
    url: site.url,
    image: `${site.url}/opengraph-image.jpg`,
    sameAs: Object.values(site.links),
  });
}

export default function Home() {
  return (
    <>
      <Atmosphere />
      <Header />
      <main id="top" className="relative flex-1">
        <Hero />
        <Music />
        <Bio />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
    </>
  );
}
