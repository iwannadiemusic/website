import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  title,
  kicker,
  children,
}: {
  id: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line">
      <Container className="py-16 sm:py-24">
        <div className="grid gap-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-12">
          <div>
            <h2 id={`${id}-title`} className="display text-6xl">
              {title}
            </h2>
            {kicker ? <p className="mt-2 text-muted">{kicker}</p> : null}
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </section>
  );
}
