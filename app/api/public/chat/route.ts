import { handleRoofingChat } from "@/lib/ai/roofing-chat.server";

export async function POST(request: Request) {
  return handleRoofingChat(request);
}
