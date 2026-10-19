"use client";

import type { ActivityEventInput } from "@/lib/activity/types";

const ENDPOINT = "/api/activity";
const SESSION_KEY = "maisha.sid";

function readSessionId() {
  if (typeof window === "undefined") return undefined;
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const created =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
    window.sessionStorage.setItem(SESSION_KEY, created);
    return created;
  } catch {
    return undefined;
  }
}

function withContext(event: ActivityEventInput): ActivityEventInput {
  const params = new URLSearchParams(window.location.search);
  return {
    ...event,
    path: event.path ?? window.location.pathname,
    sessionId: event.sessionId ?? readSessionId(),
    referrer: event.referrer ?? document.referrer ?? undefined,
    utmSource: event.utmSource ?? params.get("utm_source") ?? undefined,
    utmMedium: event.utmMedium ?? params.get("utm_medium") ?? undefined,
    utmCampaign: event.utmCampaign ?? params.get("utm_campaign") ?? undefined,
  };
}

export function track(event: ActivityEventInput) {
  if (typeof window === "undefined") return;

  try {
    const body = JSON.stringify(withContext(event));
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon?.(ENDPOINT, blob)) return;

    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Tracking must never break the page.
  }
}

export async function submitEnquiry(
  event: ActivityEventInput,
): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(withContext({ ...event, type: "enquiry_submitted" })),
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}
