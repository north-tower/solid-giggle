'use client';

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers3, ShieldCheck, MapPin, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoofingQuote } from "@/components/maisha/site-layout";

// Why Maisha hero image
const roofImage = "/maisha-why.jpg";

export default function WhyMaisha() {
  const quote = useRoofingQuote();
  return <main>
    <section className="hero why-hero"><img src={roofImage} className="hero-image" alt="Illustrative Kenyan home with a red tile-profile roof" width={1536} height={1024} fetchPriority="high" /><div className="page-width hero-inner"><div className="eyebrow">Mabati for life</div><h1>Why Maisha Mabati.</h1><p className="hero-copy">A roof is more than the finishing touch. It's the shelter for everything you're building.</p><div className="hero-actions"><Button size="lg" asChild><Link href="/products">Find Your Roofing <ArrowRight /></Link></Button><Button variant="hero" size="lg" onClick={() => quote()}>Talk to Our Team <ArrowUpRight /></Button></div></div><div className="page-width hero-bottom"><span className="hero-location"><MapPin size={12} /> Kenyan homes. Lasting possibilities.</span><span>ILLUSTRATIVE ROOFING CONCEPT</span></div></section>
    <section className="page-width why-intro"><div><div className="eyebrow text-primary">The Maisha difference</div><h2>Built around your<br />next chapter.</h2></div><p>Whether it's your first home, a renovation or a commercial space, your roofing choice matters. Maisha brings steel roofing and a range of profiles together, so you can find a finish that feels right for your project.</p></section>
    <section className="why-values"><div className="page-width why-values-grid">{[
      { icon: ShieldCheck, title: "Strength at the heart", text: "Steel roofing for the spaces you live and work in. Discuss the appropriate gauge and finish with our sales team and your installer." },
      { icon: Layers3, title: "Your style, your roof", text: "Clean box-profile lines or a classic tile-inspired finish. Explore Colour Box Profile, Premium Tile and Roman Tile." },
      { icon: Phone, title: "A real conversation", text: "From choosing a profile to preparing an enquiry, talk to the Maisha team about the details that make your project yours." },
    ].map(item => <article key={item.title}><item.icon /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="page-width why-steps"><div><div className="eyebrow text-primary">From idea to enquiry</div><h2>A better roof starts<br />with the right questions.</h2><p>Bring your plans and your preferences. We'll help you take the next step.</p><Button variant="outline" asChild><Link href="/products">Explore the Collection <ArrowRight /></Link></Button></div><ol>{[
      ["Choose your look", "Compare box and tile profiles, then shortlist the style that suits your building."],
      ["Know your project", "Ask your installer for roof measurements, required lengths and quantities."],
      ["Confirm the details", "Contact sales for current prices, gauges, colours and delivery arrangements."],
    ].map(([title, copy], i) => <li key={title}><span className="why-step-number">0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><Check size={18} /></li>)}</ol></section>
    <section className="quote-band"><div className="page-width quote-band-inner"><div><h2>Let's talk about your roof.</h2><p>Your project. Your possibilities. Start a conversation with Maisha.</p></div><Button variant="inverse" size="lg" onClick={() => quote()}>Request a Quote <ArrowUpRight /></Button></div></section>
  </main>;
}
