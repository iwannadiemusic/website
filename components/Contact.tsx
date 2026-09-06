import { site } from "@/lib/site";
import { Section } from "./Container";
import { ServiceLink } from "./ServiceLink";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="max-w-prose text-lg leading-relaxed">
        <p>Booking, press, or anything else:</p>
        <a
          href={`mailto:${site.contactEmail}`}
          className="mt-2 inline-block break-all text-2xl font-semibold text-accent underline decoration-accent/40 underline-offset-[6px] hover:decoration-accent"
        >
          {site.contactEmail}
        </a>
        <p className="mt-10">Day to day, it&rsquo;s here:</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <ServiceLink service="instagram" href={site.links.instagram} />
          <ServiceLink service="tiktok" href={site.links.tiktok} />
        </div>
      </div>
    </Section>
  );
}
