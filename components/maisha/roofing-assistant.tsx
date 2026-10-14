'use client';

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, RotateCcw, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { Reasoning, ReasoningTrigger, ReasoningContent } from "@/components/ai-elements/reasoning";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { brandLogoUrl } from "@/lib/brand-media";

const transport = new DefaultChatTransport({ api: "/api/public/chat", fetch: async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    const data = await response.json().catch(() => ({})) as { error?: string };
    throw new Error(data.error ?? "The assistant could not connect. Please try again later.");
  }
  return response;
} });

export function RoofingAssistant({ onQuote, hidden = false }: { onQuote: () => void; hidden?: boolean }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [problem, setProblem] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const { messages, sendMessage, status, stop, setMessages, clearError } = useChat({
    transport,
    onError: error => setProblem(error.message),
  });
  const busy = status === "submitted" || status === "streaming";
  useEffect(() => {
    if (open && !hidden && !document.querySelector('[role="dialog"]')) textarea.current?.focus();
  }, [open, hidden, status]);
  const ask = (text: string) => {
    if (busy || !text.trim()) return;
    setProblem(""); clearError(); setInput("");
    void sendMessage({ text: text.trim() });
    textarea.current?.focus();
  };
  const close = () => { setOpen(false); launcher.current?.focus(); };
  return <div className={`roofing-chat ${hidden ? "roofing-chat-hidden" : ""}`}>
    {open && <section className="roofing-chat-panel" role="region" aria-label="Maisha roofing assistant" onKeyDown={event => { if (event.key === "Escape") close(); }}>
      <header className="roofing-chat-header"><img src={brandLogoUrl} width={50} height={40} alt="Maisha Mabati" /><div><h2>Maisha roofing assistant</h2><span>AI-powered · Roofing guidance</span></div><Button variant="ghost" size="icon-sm" aria-label="Start fresh conversation" title="Start fresh conversation" disabled={busy} onClick={() => { setMessages([]); setProblem(""); clearError(); textarea.current?.focus(); }}><RotateCcw /></Button><Button variant="ghost" size="icon-sm" aria-label="Close assistant" title="Close assistant" onClick={close}><X /></Button></header>
      <Conversation><ConversationContent className="gap-5 p-5">
        {messages.length === 0 && <><Message from="assistant"><MessageContent><MessageResponse>{"Hello! Karibu to Maisha. What are you building?"}</MessageResponse></MessageContent></Message><div className="roofing-chat-suggestions">{["Help me choose a roofing profile", "How do I get a quotation?", "Compare tile and box profiles"].map(question => <Button key={question} variant="outline" size="sm" onClick={() => ask(question)}>{question}<ArrowUpRight /></Button>)}</div></>}
        {messages.map(message => <Message key={message.id} from={message.role}><MessageContent className={message.role === "user" ? "chat-user-content" : "chat-assistant-content"}>{message.parts.map((part, i) => {
          if (part.type === "text") return <MessageResponse key={i}>{part.text}</MessageResponse>;
          if (part.type === "reasoning" && part.text) return <Reasoning key={i} defaultOpen={false} isStreaming={busy && message.id === messages.at(-1)?.id}><ReasoningTrigger /><ReasoningContent>{part.text}</ReasoningContent></Reasoning>;
          return null;
        })}</MessageContent></Message>)}
        {status === "submitted" && <Shimmer className="text-sm">Thinking…</Shimmer>}
        {problem && <p role="alert" className="text-sm text-destructive">{problem}</p>}
      </ConversationContent><ConversationScrollButton /></Conversation>
      <div className="roofing-chat-composer"><PromptInput onSubmit={({ text }) => ask(text)}><PromptInputTextarea ref={textarea} value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about your roof…" aria-label="Your roofing question" maxLength={4000} className="min-h-16 text-sm" onKeyDown={event => { if (busy && event.key === "Enter" && !event.shiftKey) event.preventDefault(); }} /><PromptInputFooter><Button variant="ghost" size="sm" onClick={onQuote}>Order on WhatsApp <ArrowUpRight /></Button><PromptInputSubmit status={status} onStop={() => { void stop(); textarea.current?.focus(); }} disabled={!busy && !input.trim()} title={busy ? "Stop response" : "Send question"} /></PromptInputFooter></PromptInput><p>AI guidance · Confirm specifications and prices with sales.</p></div>
    </section>}
    <Button ref={launcher} className="roofing-chat-launcher" aria-label={open ? "Hide roofing assistant" : "Open roofing assistant"} aria-expanded={open} onClick={() => open ? close() : setOpen(true)}>{open ? <X /> : <MessageCircle />}<span>{open ? "Close" : "Ask Maisha"}</span></Button>
  </div>;
}
