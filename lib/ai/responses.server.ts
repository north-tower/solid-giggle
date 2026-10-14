import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id";

export function createResponsesCall(
  request: Request,
  config: { baseURL: string; apiKey: string; model: string },
  messages: ModelMessage[],
  instructions?: string,
) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  let upstreamError: { status: number; message: string } | undefined;
  const provider = createOpenAI({
    baseURL: `${config.baseURL.replace(/\/+$/, "").replace(/\/v1$/, "")}/v1`,
    apiKey: config.apiKey,
    headers: { "Lovable-API-Key": config.apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const response = await runIdFetch.fetch(input, init);
      if (!response.ok) {
        const body = await response.clone().json().catch(() => ({})) as { message?: string; error?: { message?: string } };
        upstreamError = { status: response.status, message: body.message ?? body.error?.message ?? `The assistant is unavailable (${response.status}). Please contact the sales team.` };
      }
      return response;
    },
  });
  const reasoning = config.model !== "openai/chat-latest";
  const result = streamText({
    model: provider.responses(config.model),
    // AI SDK 6 lacks `instructions`: rename this key to `system` there.
    ...(instructions ? { instructions } : {}),
    messages,
    abortSignal: request.signal,
    maxRetries: 0,
    providerOptions: {
      openai: {
        store: false,
        ...(reasoning
          ? {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              include: ["reasoning.encrypted_content"],
            }
          : {}),
      },
    },
  });
  return {
    result,
    response: async (originalMessages: import("ai").UIMessage[]) => {
      const response = await withLovableAiGatewayRunIdHeader(result.toUIMessageStreamResponse({
        originalMessages,
        sendReasoning: true,
        onFinish: () => { /* Session-only: intentionally no conversation storage. */ },
        onError: () => upstreamError?.message ?? "The assistant could not respond. Please try again or call +254 709 110 000.",
      }), runIdFetch);
      if (upstreamError) {
        void response.body?.cancel().catch(() => {});
        return Response.json({ error: upstreamError.message }, { status: upstreamError.status });
      }
      return response;
    },
  };
}
