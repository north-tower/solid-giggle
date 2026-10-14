'use client';

import { createContext, useContext, useState, Suspense, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ShieldCheck, Phone, Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandLogoUrl } from "@/lib/brand-media";
import { WHATSAPP_DISPLAY, buildWhatsAppMessage, whatsAppUrl } from "@/lib/whatsapp-contact";
import { RoofingAssistant } from "./roofing-assistant";
import { WhatsAppOrderDialog } from "./whatsapp-order-dialog";

const QuoteContext = createContext<(product?: string) => void>(() => {});
export const useRoofingQuote = () => useContext(QuoteContext);

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  function openQuote(product = "") {
    setSelectedProduct(product);
    setQuoteOpen(true);
  }
  const closeMenu = () => setMenuOpen(false);
  return (
    <QuoteContext.Provider value={openQuote}>
      <div className="utility-bar">
        <div className="page-width utility-inner">
          <span>
            <ShieldCheck size={12} /> Proudly made in Kenya. Trusted countrywide.
          </span>
          <div className="utility-links">
            <a href={whatsAppUrl(buildWhatsAppMessage("order"))} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={12} /> Order on WhatsApp · {WHATSAPP_DISPLAY}
            </a>
            <a href="tel:+254709110000">
              <Phone size={11} /> +254 709 110 000
            </a>
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
            <Button variant="whatsapp" onClick={() => openQuote()}>
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
                openQuote();
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
              <a href={whatsAppUrl(buildWhatsAppMessage("order"))} target="_blank" rel="noopener noreferrer">
                WhatsApp {WHATSAPP_DISPLAY} <ArrowUpRight className="inline size-3" />
              </a>
              <a href="tel:+254709110000">
                Call Us <ArrowUpRight className="inline size-3" />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Maisha Mabati Mills Limited. All rights reserved.</span>
            <span>Part of the Devki Group · Made in Kenya</span>
          </div>
        </div>
      </footer>
      <Suspense>
        <RoofingAssistant onQuote={() => openQuote()} hidden={quoteOpen} />
      </Suspense>
      <WhatsAppOrderDialog open={quoteOpen} onOpenChange={setQuoteOpen} initialProduct={selectedProduct} />
      <button
        type="button"
        className="whatsapp-quick-fab"
        aria-label={`Order on WhatsApp ${WHATSAPP_DISPLAY}`}
        onClick={() => openQuote()}
      >
        <MessageCircle aria-hidden />
        <span>WhatsApp order</span>
      </button>
    </QuoteContext.Provider>
  );
}
