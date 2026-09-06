import Image from "next/image";
import { site } from "@/lib/site";
import { Container } from "./Container";

const nav = [
  { href: "#music", label: "Music" },
  { href: "#lyrics", label: "Lyrics" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-bg/85 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <Image src="/brand/ouroboros.png" alt="" width={28} height={28} className="mark size-7" priority />
          <span className="display hidden text-xl sm:inline">{site.name}</span>
          <span className="sr-only">{site.name}, back to top</span>
        </a>
        <nav aria-label="Sections">
          <ul className="flex items-center gap-5 text-sm sm:gap-7">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="py-2 text-muted transition-colors hover:text-fg">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
