import type { ReactNode } from "react";
import { AppleIcon, SpotifyIcon } from "./Icons";

const services = {
  spotify: { label: "Spotify", Icon: SpotifyIcon },
  appleMusic: { label: "Apple Music", Icon: AppleIcon },
} as const;

export type Service = keyof typeof services;

export function ServiceLink({
  service,
  href,
  children,
  variant = "outline",
}: {
  service: Service;
  href: string;
  children?: ReactNode;
  variant?: "outline" | "quiet";
}) {
  const { label, Icon } = services[service];
  const base =
    "inline-flex items-center gap-2 rounded-full text-sm font-medium transition-colors";
  const look =
    variant === "outline"
      ? "h-11 px-5 border border-line hover:border-fg/60 hover:bg-surface"
      : "h-9 px-1 text-muted hover:text-fg";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${look}`}>
      <Icon className="size-[1.1em]" />
      <span>{children ?? label}</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
