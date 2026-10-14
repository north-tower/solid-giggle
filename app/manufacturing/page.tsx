'use client';

import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Beaker, ChevronRight, Cog,
  Factory, Layers, MapPin, Package, Paintbrush, Ruler, Shield, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoofingQuote } from "@/components/maisha/site-layout";

const roofImage = "/maisha-why.jpg";

const steps = [
  {
    number: "01",
    icon: Beaker,
    title: "Pickling",
    summary: "Removing oxide scale from hot-rolled coils.",
    body: "Raw hot-rolled coils are sent to the pickling plant where the oxidation layer is removed by passing them through hydrochloric acid. The coil is then rinsed with water, dried, and trimmed to the required width on our state-of-the-art pickling line with slitter head — ready for cold rolling.",
  },
  {
    number: "02",
    icon: Cog,
    title: "Cold Rolling Mill",
    summary: "Precision reduction to gauge with ±5 µm tolerance.",
    body: "Using our Hitachi Japan rolling mill — the world's benchmark for rolling accuracy — pickled coils are reduced from 2.0 mm down to as thin as 0.17 mm. Auto Gauge Control (AGC) by Siemens Germany maintains a tolerance of ±5 microns. Rolling oil from Quaker Houghton (Spain) ensures optimal shape and surface finish, while Union Electric (USA) roll sets deliver consistent quality run after run.",
    highlights: ["Hitachi Japan rolling mill", "Siemens AGC automation", "Quaker Houghton rolling oils", "Union Electric roll sets"],
  },
  {
    number: "03",
    icon: Zap,
    title: "AluZinc Galvalume",
    summary: "Hot-dip 55 % aluminium / 45 % zinc anti-corrosion coating.",
    body: "In the hot-dip galvalume process, steel is preheated to the temperature of the aluminium–zinc bath. An even coat of 55 % aluminium and 45 % zinc is applied, providing outstanding protection against corrosion and atmospheric reactions. Coating thickness is controlled automatically via PLC-driven air-gap regulation.",
    highlights: ["55 % Al / 45 % Zn coating", "PLC automatic coating control", "Tenova ceramic zinc system", "Ajax Tocco automation"],
  },
  {
    number: "04",
    icon: Shield,
    title: "Protective Layering",
    summary: "Chromic-acid treatment for long-term surface adhesion.",
    body: "After galvalume, the sheets pass through chromic acid to form a stable protective layer over the AluZinc coating. This treatment increases corrosion resistance, improves paint adhesion in subsequent colour-coating stages, and extends the service life of the finished roofing sheet in the demanding Kenyan climate.",
  },
  {
    number: "05",
    icon: Paintbrush,
    title: "Colour Coating",
    summary: "Oven-cured paint at 210–250 °C for a fade-resistant finish.",
    body: "Galvalume sheets are fed through the chemical pre-treatment section and into the colour-coating line, where the desired paint system is applied. The coated sheet passes through an oven at 210–250 °C, thermally bonding the paint for a durable, fade-resistant finish available in a full palette of colours.",
  },
  {
    number: "06",
    icon: Layers,
    title: "Profiling",
    summary: "Flat sheets formed into box profiles and tile profiles.",
    body: "The coated sheets are fed through a sequence of precision rollers that press and form them into the required roofing profiles — smooth, bright, or matte finishes in box-profile or tile-profile shapes. Standard delivery lengths are 2 m, 2.5 m, and 3 m, with custom lengths available on request.",
  },
  {
    number: "07",
    icon: Ruler,
    title: "Ridges & Accessories",
    summary: "Matching ridges in 320 mm and 240 mm widths.",
    body: "Beyond roofing sheets, Maisha manufactures ridges for joining roof planes, available in 320 mm and 240 mm widths across a range of colours and shapes — Roll-Top and Upside-Down Valley profiles included.",
  },
  {
    number: "08",
    icon: Package,
    title: "Packaging & Delivery",
    summary: "Cut to customer specification and dispatched nationwide.",
    body: "Every order is fulfilled to customer specification — gauge, AluZinc percentage, sheet length, width, and colour. Finished packs are carefully bundled for protection during transit and delivered across Kenya.",
  },
];

const gaugeData = [
  { gauge: "32", thickness: "0.20 mm", weight: "1.41 kg/m" },
  { gauge: "30", thickness: "0.25 mm", weight: "1.81 kg/m" },
  { gauge: "28", thickness: "0.32 mm", weight: "2.32 kg/m" },
  { gauge: "26", thickness: "0.40 mm", weight: "2.99 kg/m" },
  { gauge: "24", thickness: "0.50 mm", weight: "4.50 kg/m" },
  { gauge: "22", thickness: "0.60 mm", weight: "On request" },
];

const partners = [
  { name: "Hitachi", country: "Japan", role: "Cold Rolling Mill" },
  { name: "Bronx", country: "Australia", role: "Steel Equipment" },
  { name: "Siemens", country: "Germany", role: "AGC Automation" },
  { name: "Tenova", country: "Italy / USA", role: "Ceramic Zinc" },
  { name: "Ajax Tocco", country: "USA", role: "Induction Heating" },
  { name: "Quaker Houghton", country: "Spain", role: "Rolling Oils" },
  { name: "Union Electric", country: "USA", role: "Roll Manufacture" },
  { name: "Jasch", country: "Germany", role: "Gauge Measurement" },
];

export default function ManufacturingPage() {
  const quote = useRoofingQuote();

  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero mfg-hero">
        <img src={roofImage} className="hero-image" alt="Maisha Mabati roofing manufacturing facility" width={1536} height={1024} fetchPriority="high" />
        <div className="page-width hero-inner">
          <div className="eyebrow">How we build quality</div>
          <h1>Steel made right.<span>Every sheet.</span></h1>
          <p className="hero-copy">World-class equipment. Experienced people. A multi-stage process that puts quality into every Maisha Mabati sheet.</p>
          <div className="hero-actions">
            <Button size="lg" asChild><Link href="/products">Our Roofing Range <ArrowRight /></Link></Button>
            <Button variant="hero" size="lg" onClick={() => quote()}>Request a Quote <ArrowUpRight /></Button>
          </div>
        </div>
        <div className="page-width hero-bottom">
          <span className="hero-location"><MapPin size={12} /> Ruiru, Kamiti Road, Nairobi, Kenya</span>
          <span>KEBS CERTIFIED · ISO ALIGNED</span>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="page-width mfg-intro">
        <div>
          <div className="eyebrow text-primary">Our process</div>
          <h2>Built on the world's<br />best technology.</h2>
        </div>
        <p>Our steel manufacturing equipment is supplied by the world's leading specialists — Hitachi Japan, Bronx Australia, Siemens Germany, Tenova, and Ajax Tocco (USA). Every sheet passes through a rigorous eight-stage process controlled by skilled technicians and a fully equipped quality laboratory with state-of-the-art steel testing equipment.</p>
      </section>

      {/* ── Technology partners strip ── */}
      <div className="mfg-partners-strip">
        <div className="page-width">
          <div className="mfg-partners-inner">
            {partners.map((p) => (
              <div className="mfg-partner" key={p.name}>
                <strong className="mfg-partner-name">{p.name}</strong>
                <span className="mfg-partner-detail">{p.country} · {p.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Process steps ── */}
      <section className="mfg-steps-section page-width">
        <div className="mfg-steps-header">
          <div className="eyebrow text-primary">Eight stages of quality</div>
          <h2>From raw coil to finished roof.</h2>
          <p>Every Maisha Mabati sheet travels through a carefully controlled sequence before it reaches your project.</p>
        </div>
        <ol className="mfg-steps">
          {steps.map((step) => (
            <li className="mfg-step" key={step.number}>
              <div className="mfg-step-number">{step.number}</div>
              <div className="mfg-step-icon"><step.icon /></div>
              <div className="mfg-step-body">
                <h3>{step.title}</h3>
                <p className="mfg-step-summary">{step.summary}</p>
                <p className="mfg-step-detail">{step.body}</p>
                {step.highlights && (
                  <ul className="mfg-highlights">
                    {step.highlights.map((h) => (
                      <li key={h}><ChevronRight size={12} />{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Gauge spec table ── */}
      <section className="mfg-specs">
        <div className="page-width mfg-specs-inner">
          <div className="mfg-specs-copy">
            <div className="eyebrow text-primary">Specification</div>
            <h2>Standard gauges<br />&amp; weights.</h2>
            <p>Maisha rolls all standard gauges from 22 to 32. Custom gauge and coating specifications are available on request for project or export orders.</p>
            <Button variant="outline" asChild><Link href="/products">View Products <ArrowRight /></Link></Button>
          </div>
          <div className="mfg-specs-table-wrap">
            <table className="mfg-specs-table">
              <thead>
                <tr>
                  <th>Gauge</th>
                  <th>Thickness</th>
                  <th>Weight per metre</th>
                </tr>
              </thead>
              <tbody>
                {gaugeData.map((row) => (
                  <tr key={row.gauge}>
                    <td>{row.gauge}</td>
                    <td>{row.thickness}</td>
                    <td>{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mfg-specs-note"><Factory size={12} />Standard lengths: 2 m · 2.5 m · 3 m · custom on request</p>
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="quote-band">
        <div className="page-width quote-band-inner">
          <div>
            <h2>Ready to specify your roofing?</h2>
            <p>Talk to the Maisha team about gauge, coating, colour, profile, and delivery for your project.</p>
          </div>
          <Button variant="inverse" size="lg" onClick={() => quote()}>Request a Quote <ArrowUpRight /></Button>
        </div>
      </section>
    </main>
  );
}
