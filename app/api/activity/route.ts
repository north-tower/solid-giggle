import { createHash } from "node:crypto";
import { after } from "next/server";
import type { NextRequest } from "next/server";
import {
  logEvent,
  markNotified,
  sendAlert,
  type LogEventArgs,
} from "@/lib/activity/server";
import { alertFor, alertRecipients } from "@/lib/activity/messages";
import {
  isActivityType,
  isContactChannel,
  type ActivityEventInput,
} from "@/lib/activity/types";

const MIN_FORM_FILL_MS = 2000;

function str(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

function hashIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip");
  if (!ip) return null;
  const salt =
    process.env.MAISHA_IP_SALT ?? process.env.DEVKI_IP_SALT ?? "maisha";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  let input: ActivityEventInput;
  try {
    input = (await request.json()) as ActivityEventInput;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isActivityType(input?.type)) {
    return Response.json({ error: "Unknown event type" }, { status: 400 });
  }

  const trippedHoneypot = Boolean(str(input.company, 200));
  const tooFast =
    typeof input.elapsedMs === "number" &&
    input.elapsedMs >= 0 &&
    input.elapsedMs < MIN_FORM_FILL_MS;

  if (trippedHoneypot || tooFast) {
    return Response.json({ ok: true }, { status: 202 });
  }

  if (input.type === "enquiry_submitted" && !str(input.message, 4000)) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  const label = str(input.label, 64);
  const productName = str(input.productName, 200);

  const args: LogEventArgs = {
    type: input.type,
    path: str(input.path, 512),
    categorySlug: str(input.categorySlug, 128),
    productSlug: str(input.productSlug, 128),
    channel: isContactChannel(input.channel) ? input.channel : null,
    name: str(input.name, 200),
    email: str(input.email, 320),
    phone: str(input.phone, 40),
    message: str(input.message, 4000),
    sessionId: str(input.sessionId, 64),
    referrer: str(input.referrer, 1024),
    utmSource: str(input.utmSource, 128),
    utmMedium: str(input.utmMedium, 128),
    utmCampaign: str(input.utmCampaign, 128),
    country: str(request.headers.get("x-vercel-ip-country"), 8),
    city: str(
      request.headers.get("x-vercel-ip-city")
        ? decodeURIComponent(request.headers.get("x-vercel-ip-city") as string)
        : null,
      128,
    ),
    userAgent: str(request.headers.get("user-agent"), 512),
    ipHash: hashIp(request),
    metadata: {
      ...(label ? { label } : {}),
      ...(productName ? { product_name: productName } : {}),
    },
  };

  let result;
  try {
    result = await logEvent(args);
  } catch (error) {
    console.error("Activity log write failed:", error);
    return Response.json({ error: "Could not record event" }, { status: 500 });
  }

  if (result.id && result.should_notify) {
    const message = alertFor({ ...input, productName: productName ?? undefined });
    const recipients = alertRecipients();

    if (message && recipients.length > 0) {
      const eventId = result.id;
      after(async () => {
        const failures: string[] = [];
        for (const recipient of recipients) {
          try {
            await sendAlert(recipient, message);
          } catch (error) {
            failures.push(
              `${recipient}: ${error instanceof Error ? error.message : String(error)}`,
            );
          }
        }

        try {
          await markNotified(
            eventId,
            failures.length ? failures.join(" | ") : null,
          );
        } catch (error) {
          console.error("Could not record notification outcome:", error);
        }
      });
    }
  }

  return Response.json({ ok: true, id: result.id }, { status: 202 });
}
