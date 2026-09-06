import { site } from "@/lib/site";
import { Container } from "./Container";
import { ServiceLink } from "./ServiceLink";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex gap-5">
          <ServiceLink service="spotify" href={site.links.spotify} variant="quiet" />
          <ServiceLink service="appleMusic" href={site.links.appleMusic} variant="quiet" />
        </div>
      </Container>
    </footer>
  );
}
