"use client";

import { track } from "@/lib/activity/client";
import type { ContactChannel } from "@/lib/activity/types";

export function ContactLink({
  href,
  channel,
  label,
  className,
  external = true,
  children,
}: {
  href: string;
  channel: ContactChannel;
  label: string;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => track({ type: "contact_click", channel, label })}
    >
      {children}
    </a>
  );
}
