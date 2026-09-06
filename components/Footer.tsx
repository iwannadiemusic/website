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
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <ServiceLink service="spotify" href={site.links.spotify} variant="quiet" />
          <ServiceLink service="appleMusic" href={site.links.appleMusic} variant="quiet" />
          <ServiceLink service="instagram" href={site.links.instagram} variant="quiet" />
          <ServiceLink service="tiktok" href={site.links.tiktok} variant="quiet" />
        </div>
      </Container>
    </footer>
  );
}
