import { convertToModelMessages, type UIMessage } from "ai";
import { z } from "zod";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp-contact";
import { createResponsesCall } from "./responses.server";

const schema = z.object({
  messages: z.array(z.object({
    id: z.string().min(1).max(200),
    role: z.enum(["user", "assistant"]),
    parts: z.array(z.object({ type: z.enum(["text", "reasoning"]), text: z.string().max(12000) }).passthrough()).max(30),
  }).passthrough()).min(1).max(100),
});

const instructions = `You are the Maisha roofing assistant, an AI guide on a Maisha Mabati website redesign concept. Be friendly, concise and practical. Reply in the visitor's language (English or Swahili). Help only with roofing and Maisha enquiries. Use short paragraphs and markdown lists where useful.
Verified catalogue: Maisha Colour Box Profile (box profile; clean lines for homes/commercial spaces), Maisha Premium Tile (tile profile; traditional tile appearance in steel), Maisha Roman Tile (tile profile; distinctive curved finish). All are steel roofing sheets. Product page: /products. Brand information page: /why-maisha. Orders, quotes and feedback go through WhatsApp on ${WHATSAPP_DISPLAY} (Order on WhatsApp button opens a short flow then WhatsApp; nothing is sent until the visitor sends the message). Sales telephone and WhatsApp: ${WHATSAPP_DISPLAY}.
Do not invent prices, stock, colours in stock, gauges, dimensions, warranties, certifications, delivery costs/times, dealer addresses, opening hours or technical engineering guarantees. Sales must confirm all of these. Never claim to have sent a quote, saved information, placed an order or contacted someone. No account or history saving exists. Avoid requesting personal contact details in chat; refer to Order on WhatsApp or the sales phone. For quantities, explain that an installer should measure roof planes, pitch, overlaps and wastage; do not calculate a binding sheet count from floor area alone. Ask at most one useful follow-up question. Keep responses usually under 130 words. Images on this concept site are illustrative, not verified completed Maisha projects.`;

export async function handleRoofingChat(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "This assistant is available through the Maisha website only." }, { status: 403 });
  const raw = await request.text();
  if (raw.length > 150000) return Response.json({ error: "This conversation is too long. Please start a fresh conversation." }, { status: 413 });
  try {
    const parsed = schema.safeParse(JSON.parse(raw));
    if (!parsed.success) return Response.json({ error: "Please send a shorter roofing question, or start a fresh conversation." }, { status: 400 });
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return Response.json({ error: `The assistant is not configured yet. Please contact sales on ${WHATSAPP_DISPLAY}.` }, { status: 401 });
    const messages = parsed.data.messages as UIMessage[];
    const modelMessages = await convertToModelMessages(messages);
    const call = createResponsesCall(request, { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" }, modelMessages, instructions);
    return await call.response(messages);
  } catch (error) {
    if (request.signal.aborted || (error instanceof Error && error.name === "AbortError")) return new Response(null, { status: 499 });
    if (error instanceof SyntaxError) return Response.json({ error: "Invalid chat request." }, { status: 400 });
    return Response.json({ error: "The assistant could not connect. Please contact the Maisha sales team." }, { status: 500 });
  }
}
