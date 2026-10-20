'use client';

import { createContext, useContext, useState, Suspense, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ShieldCheck, Phone, Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandLogoUrl } from "@/lib/brand-media";
import { track } from "@/lib/activity/client";
import { productSlugFromName } from "@/lib/activity/product-slug";
import {
  SALES_EMAIL,
  SALES_EMAIL_MAILTO,
  SALES_PHONE_TEL,
  WHATSAPP_DISPLAY,
  buildWhatsAppMessage,
  whatsAppUrl,
} from "@/lib/whatsapp-contact";
import { ContactLink } from "./contact-link";
import { PageViewTracker } from "./page-view-tracker";
import { RoofingAssistant } from "./roofing-assistant";
import { WhatsAppOrderDialog } from "./whatsapp-order-dialog";

const QuoteContext = createContext<(product?: string) => void>(() => {});
export const useRoofingQuote = () => useContext(QuoteContext);

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  function openQuote(product = "", label = "quote-dialog") {
    track({
      type: "contact_click",
      channel: "whatsapp",
      label,
      ...(product
        ? { productName: product, productSlug: productSlugFromName(product) }
        : {}),
    });
    setSelectedProduct(product);
    setQuoteOpen(true);
  }
  const closeMenu = () => setMenuOpen(false);
  return (
    <QuoteContext.Provider value={(product) => openQuote(product, "page-cta")}>
      <PageViewTracker />
      <div className="utility-bar">
        <div className="page-width utility-inner">
          <span>
            <ShieldCheck size={12} /> Proudly made in Kenya. Trusted countrywide.
          </span>
          <div className="utility-links">
            <ContactLink
              href={whatsAppUrl(buildWhatsAppMessage("order"))}
              channel="whatsapp"
              label="utility-bar"
            >
              <MessageCircle size={12} /> Order on WhatsApp · {WHATSAPP_DISPLAY}
            </ContactLink>
            <ContactLink href={SALES_PHONE_TEL} channel="phone" label="utility-bar" external={false}>
              <Phone size={11} /> {WHATSAPP_DISPLAY}
            </ContactLink>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="page-width header-inner">
          <Link href="/" aria-label="Maisha Mabati home">
            <img src={brandLogoUrl} className="brand-logo" alt="Maisha Mabati — Mabati for Life" width={92} height={70} />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              Home
            </Link>
            <Link
              href="/products"
              className={pathname === "/products" ? "active flex items-center gap-1" : "flex items-center gap-1"}
            >
              Our Products <ChevronDown size={13} />
            </Link>
            <Link href="/why-maisha" className={pathname === "/why-maisha" ? "active" : ""}>
              Why Maisha
            </Link>
            <Link href="/manufacturing" className={pathname === "/manufacturing" ? "active" : ""}>
              Manufacturing
            </Link>
            <a href="/#contact">Contact Us</a>
          </nav>
          <div className="header-actions">
            <Button variant="whatsapp" onClick={() => openQuote("", "header-cta")}>
              Order on WhatsApp <MessageCircle />
            </Button>
            <Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <Link href="/" onClick={closeMenu}>
              Home
            </Link>
            <Link href="/products" onClick={closeMenu}>
              Our Products
            </Link>
            <Link href="/why-maisha" onClick={closeMenu}>
              Why Maisha
            </Link>
            <Link href="/manufacturing" onClick={closeMenu}>
              Manufacturing
            </Link>
            <a href="/#contact" onClick={closeMenu}>
              Contact Us
            </a>
            <Button
              variant="whatsapp"
              className="mt-3 w-full"
              onClick={() => {
                closeMenu();
                openQuote("", "mobile-nav");
              }}
            >
              Order on WhatsApp <MessageCircle />
            </Button>
          </nav>
        )}
      </header>
      {children}
      <footer className="footer">
        <div className="page-width">
          <div className="footer-inner">
            <div>
              <div className="footer-brand">
                MAISHA MABATI<span className="text-primary">.</span>
              </div>
              <p className="footer-tagline">Sheltering you today & tomorrow.</p>
            </div>
            <div className="footer-links">
              <Link href="/products">Our Products</Link>
              <Link href="/why-maisha">Why Maisha</Link>
              <ContactLink
                href={whatsAppUrl(buildWhatsAppMessage("order"))}
                channel="whatsapp"
                label="footer"
              >
                WhatsApp {WHATSAPP_DISPLAY} <ArrowUpRight className="inline size-3" />
              </ContactLink>
              <ContactLink href={SALES_PHONE_TEL} channel="phone" label="footer" external={false}>
                Call {WHATSAPP_DISPLAY} <ArrowUpRight className="inline size-3" />
              </ContactLink>
              <ContactLink href={SALES_EMAIL_MAILTO} channel="email" label="footer">
                {SALES_EMAIL} <ArrowUpRight className="inline size-3" />
              </ContactLink>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Maisha Mabati Mills Limited. All rights reserved.</span>
            <span>Part of the Devki Group · Made in Kenya</span>
          </div>
        </div>
      </footer>
      <Suspense>
        <RoofingAssistant onQuote={() => openQuote("", "roofing-assistant")} hidden={quoteOpen} />
      </Suspense>
      <WhatsAppOrderDialog open={quoteOpen} onOpenChange={setQuoteOpen} initialProduct={selectedProduct} />
      <button
        type="button"
        className="whatsapp-quick-fab"
        aria-label={`Order on WhatsApp ${WHATSAPP_DISPLAY}`}
        onClick={() => openQuote("", "float")}
      >
        <MessageCircle aria-hidden />
        <span>WhatsApp order</span>
      </button>
    </QuoteContext.Provider>
  );
}
