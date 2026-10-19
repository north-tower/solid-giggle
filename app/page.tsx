'use client';

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, ShieldCheck, Truck, Layers3, Sun, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductListPrice } from "@/components/maisha/product-list-price";
import { productPriceLabel, productUnitLabel, products } from "@/lib/roofing-products";
import { useRoofingQuote } from "@/components/maisha/site-layout";

const categories = ["All roofing", "Box profiles", "Tile profiles", "Accessories", "Timber", "Building materials"];

// Home hero image — imported from public folder
const homeImage = "/maisha-home.jpg";

export default function Home() {
  const [category, setCategory] = useState("All roofing");
  const [detail, setDetail] = useState<(typeof products)[number] | null>(null);
  const visibleProducts = products.filter(p =>
    category === "All roofing"
    || (category === "Box profiles" ? p.category === "Box profile"
      : category === "Tile profiles" ? p.category === "Tile profile"
        : category === "Timber" ? p.category === "Timber"
          : category === "Building materials" ? p.category === "Building materials"
            : p.category === "Accessories"),
  );
  const showQuote = useRoofingQuote();
  function openQuote(product = "") { showQuote(product); setDetail(null); }
  return <>
    <main>
      <section id="home" className="hero"><img className="hero-image" src={homeImage} alt="Illustrative Kenyan home with a terracotta metal roof and green gardens" width={1920} height={1024} fetchPriority="high" /><div className="page-width hero-inner"><div className="eyebrow">Maisha Mabati · Mabati for life</div><h1>Quality roofing.<span>Built for life.</span></h1><p className="hero-copy">For the home you dream of. For the future you're building. Discover roofing that shelters you today and tomorrow.</p><div className="hero-actions"><Button asChild size="lg"><a href="#products">Explore Our Roofing <ArrowRight /></a></Button><Button variant="hero" size="lg" onClick={() => openQuote()}>Order on WhatsApp <ArrowUpRight /></Button></div></div><div className="page-width hero-bottom"><span className="hero-location"><MapPin size={12} /> Made in Kenya. Made for your home.</span><span>SHELTERING YOU TODAY & TOMORROW</span></div></section>
      <section className="trust-strip" aria-label="Maisha roofing benefits"><div className="page-width trust-inner">{[
        { icon: ShieldCheck, title: "KEBS certified quality", text: "Standards you can trust" },
        { icon: Sun, title: "Built for our climate", text: "Durable, weather-ready roofing" },
        { icon: Layers3, title: "A roof for every vision", text: "A variety of profiles & colours" },
        { icon: Truck, title: "Available countrywide", text: "Closer to your next project" },
      ].map(item => <div className="trust-item" key={item.title}><item.icon /><div><strong>{item.title}</strong><small>{item.text}</small></div></div>)}</div></section>
      <section id="products" className="page-width products-section"><div className="eyebrow text-primary">Find your perfect roof</div><div className="section-heading"><h2>Different styles.<br />The same Maisha quality.</h2><p>From timeless tiles to contemporary profiles, find the right finish for your home, your project, and your budget.</p></div><div className="product-tabs" aria-label="Filter roofing products">{categories.map(tab => <Button key={tab} variant={category === tab ? "tabActive" : "tab"} size="sm" aria-pressed={category === tab} onClick={() => setCategory(tab)}>{tab}</Button>)}</div><div className="product-grid">{visibleProducts.map(product => <article className="product-card" key={product.name}><div className="product-image"><img src={product.image} alt={product.name + " roofing sheet"} loading="lazy" width={600} height={600} /><span className="product-category">{product.category}</span></div><div className="product-content"><h3>{product.name}</h3><ProductListPrice product={product} /><p>{product.description}</p><div className="product-footer">{productPriceLabel(product) ? <span className="product-price-note">{productUnitLabel(product)}</span> : <div className="swatches" aria-label="Enquire about available colours"><span className="swatch" /><span className="swatch green" /><span className="swatch blue" /><span className="swatch grey" /><span className="swatch terracotta" /></div>}<Button variant="product" size="sm" onClick={() => setDetail(product)}>View product <ArrowUpRight /></Button></div></div></article>)}</div><div className="products-more"><Button variant="outline" asChild size="lg"><Link href="/products">View All Products <ArrowRight /></Link></Button></div></section>
      <section id="about" className="about-section"><div className="page-width about-inner"><img className="about-image" src={homeImage} alt="Illustrative home showing the appearance of a metal roof" loading="lazy" width={1920} height={1024} /><div className="about-copy"><div className="eyebrow text-primary">The Maisha difference</div><h2>More than a roof.<br />A promise of shelter.</h2><p>A home is one of life's biggest investments. At Maisha Mabati, we believe quality roofing should be within reach of every Kenyan. Our steel roofing sheets bring together strength, lasting protection, and a finish you can be proud of.</p><div className="about-points"><span><Check /> Durable steel</span><span><Check /> Customised sizes</span><span><Check /> Value for money</span></div><Button variant="outline" asChild><Link href="/why-maisha">Our Story <ArrowUpRight /></Link></Button></div></div></section>
      <section id="contact" className="quote-band"><div className="page-width quote-band-inner"><div><h2>Let's put a roof on your vision.</h2><p>Quotes, orders, and feedback — chat with our team on WhatsApp. Fast, personal, and made for how Kenyans buy.</p></div><Button variant="inverse" size="lg" onClick={() => openQuote()}>Start on WhatsApp <ArrowUpRight /></Button></div></section>
    </main>
    <Dialog open={detail !== null} onOpenChange={open => { if (!open) setDetail(null); }}><DialogContent><DialogHeader><DialogTitle>{detail?.name}</DialogTitle><DialogDescription>{detail?.category}</DialogDescription></DialogHeader>{detail && <><img src={detail.image} alt={detail.name} className="detail-image" /><p className="detail-copy">{detail.description}</p>{productPriceLabel(detail) ? <p className="product-list-price">{productPriceLabel(detail)}</p> : <p className="detail-copy">Contact the Maisha sales team to confirm colours, gauges, sizes and current pricing for your project.</p>}<Button size="lg" onClick={() => openQuote(detail.name)}>Order on WhatsApp <ArrowRight /></Button></>}</DialogContent></Dialog>
  </>;
}
