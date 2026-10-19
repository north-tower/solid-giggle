import type { ActivityType } from "@/lib/activity/types";

/**
 * Server-side activity ingest via shared Supabase RPCs (same project as Devki POS).
 */

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable ${name}`);
  return value;
}

function supabaseConfig() {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey =
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase credentials (SUPABASE_URL and SUPABASE_ANON_KEY, or NEXT_PUBLIC_* equivalents)",
    );
  }

  return { url: url.replace(/\/$/, ""), anonKey };
}

async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const { url, anonKey } = supabaseConfig();

  const res = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`${fn} failed (${res.status}): ${detail.slice(0, 300)}`);
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

export type LogEventArgs = {
  type: ActivityType;
  path?: string | null;
  categorySlug?: string | null;
  productSlug?: string | null;
  channel?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  sessionId?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  country?: string | null;
  city?: string | null;
  userAgent?: string | null;
  ipHash?: string | null;
  metadata?: Record<string, unknown>;
};

export type LogEventResult = {
  id: number | null;
  should_notify: boolean;
  throttled: boolean;
};

export function logEvent(args: LogEventArgs) {
  return rpc<LogEventResult>("devki_log_event", {
    p_type: args.type,
    p_path: args.path ?? null,
    p_category_slug: args.categorySlug ?? null,
    p_product_slug: args.productSlug ?? null,
    p_channel: args.channel ?? null,
    p_name: args.name ?? null,
    p_email: args.email ?? null,
    p_phone: args.phone ?? null,
    p_message: args.message ?? null,
    p_session_id: args.sessionId ?? null,
    p_referrer: args.referrer ?? null,
    p_utm_source: args.utmSource ?? null,
    p_utm_medium: args.utmMedium ?? null,
    p_utm_campaign: args.utmCampaign ?? null,
    p_country: args.country ?? null,
    p_city: args.city ?? null,
    p_user_agent: args.userAgent ?? null,
    p_ip_hash: args.ipHash ?? null,
    p_metadata: { site: "maisha", ...args.metadata },
  });
}

export function markNotified(id: number, error?: string | null) {
  return rpc<null>("devki_mark_notified", {
    p_id: id,
    p_error: error ?? null,
  });
}

export async function sendAlert(mobile: string, message: string) {
  const { url, anonKey } = supabaseConfig();

  const res = await fetch(`${url}/functions/v1/send-sms`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobile,
      message,
      shortcode:
        process.env.MAISHA_SMS_SHORTCODE ??
        process.env.DEVKI_SMS_SHORTCODE ??
        undefined,
    }),
    cache: "no-store",
  });

  const body = await res.text().catch(() => "");
  if (!res.ok) {
    throw new Error(`send-sms failed (${res.status}): ${body.slice(0, 300)}`);
  }
  return body;
}
