import {
  isContactChannel,
  type ActivityEventInput,
  type ContactChannel,
} from "@/lib/activity/types";

const SIGNATURE = "Via maishamabati.co.ke";

export function normalisePhone(raw: string) {
  return raw.replace(/[\s()-]/g, "").replace(/^\+/, "");
}

export function alertRecipients() {
  const raw =
    process.env.MAISHA_ALERT_PHONES ?? process.env.DEVKI_ALERT_PHONES ?? "";
  return raw
    .split(",")
    .map((entry) => normalisePhone(entry.trim()))
    .filter(Boolean);
}

function truncate(value: string, max: number) {
  const trimmed = value.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

export function enquiryAlert(event: ActivityEventInput) {
  const name = event.name?.trim() || "Someone";
  const contact = [event.phone?.trim(), event.email?.trim()]
    .filter(Boolean)
    .join(" / ");
  const contactPart = contact ? ` (${contact})` : "";
  const messagePart = event.message?.trim()
    ? ` Message: ${truncate(event.message, 220)}`
    : "";

  return `New Maisha website enquiry from ${name}${contactPart}.${messagePart} ${SIGNATURE}`;
}

export function quoteAlert(event: ActivityEventInput) {
  const product = event.productName?.trim() || event.productSlug?.trim();
  const productPart = product ? ` for ${product}` : "";
  const categoryPart = event.categorySlug?.trim()
    ? ` (${event.categorySlug.trim()})`
    : "";

  return `Maisha website visitor started a WhatsApp quote/order${productPart}${categoryPart}. Expect a chat shortly. ${SIGNATURE}`;
}

const CONTACT_CHANNEL_LABELS: Record<ContactChannel, string> = {
  whatsapp: "WhatsApp",
  phone: "Phone",
  email: "Email",
};

export function contactClickAlert(event: ActivityEventInput) {
  const channel =
    event.channel && isContactChannel(event.channel)
      ? CONTACT_CHANNEL_LABELS[event.channel]
      : "Contact";
  const placement = event.label?.trim()
    ? ` (${truncate(event.label.trim(), 40)})`
    : "";
  const path = event.path?.trim()
    ? ` on ${truncate(event.path.trim(), 72)}`
    : "";

  return `Maisha website ${channel} click${placement}${path}. ${SIGNATURE}`;
}

export function alertFor(event: ActivityEventInput) {
  if (event.type === "enquiry_submitted") return enquiryAlert(event);
  if (event.type === "quote_requested") return quoteAlert(event);
  if (event.type === "contact_click") return contactClickAlert(event);
  return null;
}
