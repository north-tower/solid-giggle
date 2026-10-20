export const WHATSAPP_E164 = "254781220004";
export const WHATSAPP_DISPLAY = "+254 781 220 004";

export const SALES_EMAIL = "mabatikenyamaisha@gmail.com";
export const SALES_EMAIL_MAILTO = `mailto:${SALES_EMAIL}`;

/** Same number used for voice calls and WhatsApp. */
export const SALES_PHONE_TEL = `tel:+${WHATSAPP_E164}`;

export type WhatsAppEnquiryKind = "quote" | "order" | "feedback";

export function whatsAppUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(text: string): void {
  window.open(whatsAppUrl(text), "_blank", "noopener,noreferrer");
}

export function buildWhatsAppMessage(
  kind: WhatsAppEnquiryKind,
  options: { product?: string; notes?: string } = {},
): string {
  const product = options.product?.trim();
  const notes = options.notes?.trim();
  const productLine = product ? `\nProduct: ${product}` : "";
  const notesBlock = notes ? `\n\nDetails:\n${notes}` : "\n\n[Add your location, quantities, colours, or questions here]";

  if (kind === "order") {
    return `Hello Maisha Mabati 👋

I would like to place a roofing order.${productLine}${notesBlock}

Thank you.`;
  }
  if (kind === "feedback") {
    return `Hello Maisha Mabati 👋

I would like to share feedback about my experience.${notesBlock}

Thank you.`;
  }
  return `Hello Maisha Mabati 👋

I would like a roofing quotation.${productLine}${notesBlock}

Thank you.`;
}
