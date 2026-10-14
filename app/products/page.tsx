'use client';

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Phone, Search, SlidersHorizontal, X, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { products, type RoofingProduct } from "@/lib/roofing-products";
import { useRoofingQuote } from "@/components/maisha/site-layout";
import {
  SALES_PHONE_TEL,
  WHATSAPP_DISPLAY,
  buildWhatsAppMessage,
  whatsAppUrl,
} from "@/lib/whatsapp-contact";

export default function ProductsPage() {
  const [category, setCategory] = useState("All roofing");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState<RoofingProduct | null>(null);
  const openQuote = useRoofingQuote();
  const filtered = products.filter(product => (category === "All roofing" || product.category === category) && product.name.toLowerCase().includes(search.toLowerCase().trim()));
  function enquire(product = "") { setDetail(null); openQuote(product); }
  return <main>
    <section className="catalogue-intro"><div className="page-width"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Our Products</span></div><div className="catalogue-title-row"><div><div className="eyebrow text-primary">Maisha Mabati roofing collection</div><h1>Our roofing.<br />Your possibilities.</h1></div><p>Strong foundations deserve a strong finish. Explore steel roofing profiles that bring your vision to life.</p></div><div className="catalogue-benefits"><span><Check /> Quality steel roofing</span><span><Check /> A variety of colours</span><span><Check /> Customised lengths</span></div></div></section>
    <section className="page-width catalogue-section"><aside className="catalogue-sidebar"><div className="filter-heading"><SlidersHorizontal size={16} /><h2>Roofing profiles</h2></div><div className="catalogue-filters">{["All roofing", "Box profile", "Tile profile"].map(item => <Button key={item} variant={category === item ? "tabActive" : "tab"} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span>{item === "All roofing" ? 3 : item === "Box profile" ? 1 : 2}</span></Button>)}</div><div className="catalogue-advice"><Layers3 size={27} /><h3>Not sure which roof?</h3><p>Let's find the right profile for your project.</p><Button variant="product" onClick={() => enquire()}>Talk to our team <ArrowUpRight /></Button></div></aside><div className="catalogue-results"><div className="catalogue-toolbar"><span>{filtered.length} {filtered.length === 1 ? "product" : "products"}</span><div className="catalogue-search"><Search size={17} /><input type="search" aria-label="Search roofing products" placeholder="Search roofing…" value={search} onChange={event => setSearch(event.target.value)} />{search && <Button variant="ghost" size="icon" aria-label="Clear search" onClick={() => setSearch("")}><X /></Button>}</div></div><div className="catalogue-grid">{filtered.map(product => <article className="product-card catalogue-card" key={product.name}><div className="product-image"><img src={product.image} alt={product.name + " roofing sheet"} width={600} height={600} /><span className="product-category">{product.category}</span></div><div className="product-content"><h3>{product.name}</h3><p>{product.description}</p><div className="catalogue-card-meta"><span><Check size={13} /> Customised sizes</span><span>Colour options available</span></div><div className="catalogue-card-actions"><Button variant="outline" onClick={() => setDetail(product)}>View details <ArrowUpRight /></Button><Button onClick={() => enquire(product.name)}>Order on WhatsApp <ArrowRight /></Button></div></div></article>)}</div>{filtered.length === 0 && <div className="catalogue-empty"><Search size={30} /><h2>No matching roofing products</h2><p>Try another name or explore all profiles.</p><Button variant="outline" onClick={() => { setSearch(""); setCategory("All roofing"); }}>Clear filters</Button></div>}<p className="catalogue-note">For current prices, available gauges, finishes and delivery arrangements, please contact the Maisha sales team.</p></div></section>
    <section className="catalogue-help"><div className="page-width catalogue-help-inner"><div><div className="eyebrow text-primary">From a first idea to a finished roof</div><h2>Your next project starts with a conversation.</h2><p>Tell us what you're building. We'll help you explore the right roofing options.</p></div><div className="catalogue-help-actions"><Button size="lg" variant="whatsapp" onClick={() => enquire()}>Order on WhatsApp <MessageCircle /></Button><a href={whatsAppUrl(buildWhatsAppMessage("order"))} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> {WHATSAPP_DISPLAY}</a><a href={SALES_PHONE_TEL}><Phone size={15} /> {WHATSAPP_DISPLAY}</a></div></div></section>
    <Dialog open={detail !== null} onOpenChange={open => { if (!open) setDetail(null); }}><DialogContent><DialogHeader><DialogTitle>{detail?.name}</DialogTitle><DialogDescription>{detail?.category}</DialogDescription></DialogHeader>{detail && <><img className="detail-image" src={detail.image} alt={detail.name} /><p className="detail-copy">{detail.description}</p><div className="catalogue-detail-specs"><div><span>Profile</span><strong>{detail.category}</strong></div><div><span>Material</span><strong>Steel roofing sheet</strong></div><div><span>Sizes & colours</span><strong>Confirm with sales team</strong></div></div><Button size="lg" onClick={() => enquire(detail.name)}>Order on WhatsApp <ArrowRight /></Button></>}</DialogContent></Dialog>
  </main>;
}
