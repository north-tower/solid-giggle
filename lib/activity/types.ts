export const ACTIVITY_TYPES = [
  "enquiry_submitted",
  "quote_requested",
  "contact_click",
  "page_view",
] as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const CONTACT_CHANNELS = ["whatsapp", "phone", "email"] as const;

export type ContactChannel = (typeof CONTACT_CHANNELS)[number];

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  enquiry_submitted: "Enquiry",
  quote_requested: "Quote request",
  contact_click: "Contact click",
  page_view: "Page view",
};

/** Types that trigger an SMS alert. The database has the final say. */
export const ALERTING_TYPES: readonly ActivityType[] = [
  "enquiry_submitted",
  "quote_requested",
  "contact_click",
];

/** What the browser posts to /api/activity. */
export type ActivityEventInput = {
  type: ActivityType;
  path?: string;
  categorySlug?: string;
  productSlug?: string;
  productName?: string;
  channel?: ContactChannel;

  name?: string;
  email?: string;
  phone?: string;
  message?: string;

  sessionId?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;

  /** Where on the page the interaction happened, e.g. "float" or "footer". */
  label?: string;

  company?: string;
  elapsedMs?: number;
};

export type ActivityEvent = {
  id: number;
  created_at: string;
  type: ActivityType;
  path: string | null;
  category_slug: string | null;
  product_slug: string | null;
  channel: ContactChannel | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  session_id: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  country: string | null;
  city: string | null;
  user_agent: string | null;
  ip_hash: string | null;
  notified_at: string | null;
  notify_error: string | null;
  metadata: Record<string, unknown>;
};

export function isActivityType(value: unknown): value is ActivityType {
  return (
    typeof value === "string" &&
    (ACTIVITY_TYPES as readonly string[]).includes(value)
  );
}

export function isContactChannel(value: unknown): value is ContactChannel {
  return (
    typeof value === "string" &&
    (CONTACT_CHANNELS as readonly string[]).includes(value)
  );
}
