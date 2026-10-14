"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { products } from "@/lib/roofing-products";
import {
  WHATSAPP_DISPLAY,
  buildWhatsAppMessage,
  openWhatsApp,
  type WhatsAppEnquiryKind,
} from "@/lib/whatsapp-contact";

const enquiryOptions: { kind: WhatsAppEnquiryKind; title: string; description: string }[] = [
  { kind: "order", title: "Place an order", description: "Sheets, colours, quantities — start your order in chat." },
  { kind: "quote", title: "Get a quote", description: "Share your project and receive pricing from sales." },
  { kind: "feedback", title: "Feedback & support", description: "Product questions, delivery, or how we can improve." },
];

export function WhatsAppOrderDialog({
  open,
  onOpenChange,
  initialProduct = "",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialProduct?: string;
}) {
  const [kind, setKind] = useState<WhatsAppEnquiryKind>("order");
  const [product, setProduct] = useState(initialProduct);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      setProduct(initialProduct);
      setKind(initialProduct ? "quote" : "order");
      setNotes("");
    }
  }, [open, initialProduct]);

  function continueOnWhatsApp() {
    openWhatsApp(buildWhatsAppMessage(kind, { product, notes }));
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order & enquire on WhatsApp</DialogTitle>
          <DialogDescription>
            Choose what you need, add a few details, then continue in WhatsApp to {WHATSAPP_DISPLAY}. Our team replies
            during business hours.
          </DialogDescription>
        </DialogHeader>
        <div className="whatsapp-order">
          <div className="whatsapp-order-types" role="radiogroup" aria-label="Enquiry type">
            {enquiryOptions.map(option => (
              <button
                key={option.kind}
                type="button"
                role="radio"
                aria-checked={kind === option.kind}
                className={kind === option.kind ? "whatsapp-order-type active" : "whatsapp-order-type"}
                onClick={() => setKind(option.kind)}
              >
                <strong>{option.title}</strong>
                <span>{option.description}</span>
              </button>
            ))}
          </div>
          {kind !== "feedback" && (
            <label className="whatsapp-order-field">
              Roofing product
              <select value={product} onChange={event => setProduct(event.target.value)}>
                <option value="">Help me choose</option>
                {products.map(p => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
                <option value="Other Maisha product">Other Maisha product</option>
              </select>
            </label>
          )}
          <label className="whatsapp-order-field">
            {kind === "feedback" ? "Your message" : "Project details (optional)"}
            <textarea
              value={notes}
              onChange={event => setNotes(event.target.value)}
              rows={3}
              placeholder={
                kind === "feedback"
                  ? "Tell us what went well or what we can do better…"
                  : "Town/county, sheet lengths, quantities, preferred colours…"
              }
            />
          </label>
          <Button size="lg" variant="whatsapp" className="w-full" onClick={continueOnWhatsApp}>
            Continue on WhatsApp <MessageCircle />
          </Button>
          <p className="whatsapp-order-foot">
            Prefer a call?{" "}
            <a href="tel:+254709110000">
              +254 709 110 000 <ArrowUpRight className="inline size-3" />
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
