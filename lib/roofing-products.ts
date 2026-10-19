import { officialProductImages } from "@/lib/brand-media";

export const products = [
  {
    name: "Maisha Colour Box Profile",
    category: "Box profile",
    image: officialProductImages.box,
    description: "Clean lines. Lasting strength. A versatile profile for homes and commercial spaces.",
  },
  {
    name: "Maisha Corrugated Mabati",
    category: "Box profile",
    image: officialProductImages.corrugatedMabati,
    description: "Classic corrugated iron sheets for reliable, affordable roofing.",
    priceKshPerMeter: 320,
  },
  {
    name: "Plain sheet",
    category: "Box profile",
    image: officialProductImages.plainSheet,
    description: "Flat galvanised steel sheets for roofing, cladding and general fabrication.",
    priceKshPerMeter: 400,
  },
  {
    name: "Ordinary Dumuzaz",
    category: "Box profile",
    image: officialProductImages.ordinaryDumuzaz,
    description: "Standard galvanised corrugated sheets for everyday roofing projects.",
    priceKshPerMeter: 300,
  },
  {
    name: "Maisha Premium Tile",
    category: "Tile profile",
    image: officialProductImages.premium,
    description: "The character of traditional tiles, with the strength and practicality of steel.",
  },
  {
    name: "Maisha Roman Tile",
    category: "Tile profile",
    image: officialProductImages.roman,
    description: "Distinctive curves and an elegant finish that makes every home stand out.",
  },
  {
    name: "Stone coated",
    category: "Tile profile",
    image: officialProductImages.stoneCoated,
    description: "Stone-granule finish with the classic tile look and long-lasting steel strength.",
    priceKshPerPiece: 600,
  },
  {
    name: "Ordinary nails",
    category: "Accessories",
    image: officialProductImages.ordinaryNails,
    description: "Standard construction nails for everyday fastening on site.",
    priceKshPerKg: 155,
  },
  {
    name: "Roofing nails",
    category: "Accessories",
    image: officialProductImages.roofingNails,
    description: "Large-head nails for securing roofing sheets and related fixings.",
    priceKshPerKg: 195,
  },
  {
    name: "Rubber washers",
    category: "Accessories",
    image: officialProductImages.rubberWashers,
    description: "Sealing washers for roofing fixings, sold in colour-coded packets.",
    priceKshPerPacket: 120,
  },
  {
    name: "Binding wire",
    category: "Accessories",
    image: officialProductImages.bindingWire,
    description: "Galvanised binding wire coils for tying reinforcement and general site work.",
    priceKshPerRoll: 2500,
  },
  {
    name: "Valley",
    category: "Accessories",
    image: officialProductImages.valley,
    description: "Valley flashing for the junction where two roof slopes meet, to channel water safely off the roof.",
    priceKshPerMeter: 350,
  },
  {
    name: "Roofing tops",
    category: "Accessories",
    image: officialProductImages.roofingTops,
    description: "Ridge caps for finishing the roof peak, available in a range of stone-coated colours.",
    priceKshPerPiece: 420,
  },
  {
    name: "Cyprus",
    category: "Timber",
    image: officialProductImages.cyprus,
    description: "Cypress timber boards for framing, battens and general construction work.",
    priceKshPerFoot: 22,
  },
  {
    name: "Simba Cement 32.5R",
    category: "Building materials",
    image: officialProductImages.simbaCement,
    description: "Simba Portland composite cement, 32.5R grade, for general construction and masonry.",
    priceKshPerBag: 600,
  },
  {
    name: "Simba Power Cement 42.5N",
    category: "Building materials",
    image: officialProductImages.simbaPowerCement,
    description: "Simba Power Portland cement, 42.5N grade, for structural work and high-strength mixes.",
    priceKshPerBag: 700,
  },
] as const;

export type RoofingProduct = (typeof products)[number];

export function productPriceLabel(product: RoofingProduct): string | null {
  if ("priceKshPerKg" in product && product.priceKshPerKg != null) {
    return `Ksh ${product.priceKshPerKg} per kg`;
  }
  if ("priceKshPerPacket" in product && product.priceKshPerPacket != null) {
    return `Ksh ${product.priceKshPerPacket} per packet`;
  }
  if ("priceKshPerPiece" in product && product.priceKshPerPiece != null) {
    return `Ksh ${product.priceKshPerPiece} per piece`;
  }
  if ("priceKshPerFoot" in product && product.priceKshPerFoot != null) {
    return `Ksh ${product.priceKshPerFoot} per foot`;
  }
  if ("priceKshPerRoll" in product && product.priceKshPerRoll != null) {
    return `Ksh ${product.priceKshPerRoll.toLocaleString("en-KE")} per roll`;
  }
  if ("priceKshPerMeter" in product && product.priceKshPerMeter != null) {
    return `Ksh ${product.priceKshPerMeter} per meter`;
  }
  if ("priceKshPerBag" in product && product.priceKshPerBag != null) {
    return `Ksh ${product.priceKshPerBag} per bag`;
  }
  return null;
}

export function productSaleNote(product: RoofingProduct): string {
  if ("priceKshPerPacket" in product && product.priceKshPerPacket != null) return "Sold per packet";
  if ("priceKshPerPiece" in product && product.priceKshPerPiece != null) return "Listed per piece";
  if ("priceKshPerFoot" in product && product.priceKshPerFoot != null) return "Sold by the foot";
  if ("priceKshPerRoll" in product && product.priceKshPerRoll != null) return "Sold per roll";
  if ("priceKshPerMeter" in product && product.priceKshPerMeter != null) return "Sold by the meter";
  if ("priceKshPerBag" in product && product.priceKshPerBag != null) return "Sold per bag";
  if (product.category === "Accessories") return "Sold by weight";
  return "Customised sizes";
}

export function productUnitLabel(product: RoofingProduct): string {
  if ("priceKshPerPacket" in product && product.priceKshPerPacket != null) return "Per packet";
  if ("priceKshPerPiece" in product && product.priceKshPerPiece != null) return "Per piece";
  if ("priceKshPerKg" in product && product.priceKshPerKg != null) return "Per kilogram";
  if ("priceKshPerFoot" in product && product.priceKshPerFoot != null) return "Per foot";
  if ("priceKshPerRoll" in product && product.priceKshPerRoll != null) return "Per roll";
  if ("priceKshPerMeter" in product && product.priceKshPerMeter != null) return "Per meter";
  if ("priceKshPerBag" in product && product.priceKshPerBag != null) return "Per bag";
  if (product.category === "Accessories") return "Per kilogram";
  return "Confirm with sales team";
}

export function productUsesSimplePricing(product: RoofingProduct): boolean {
  return product.category === "Accessories" || product.category === "Timber" || product.category === "Building materials";
}

export const catalogueCategories = ["All products", "Box profile", "Tile profile", "Accessories", "Timber", "Building materials"] as const;

export function productsInCatalogueCategory(category: (typeof catalogueCategories)[number]) {
  return products.filter(product => category === "All products" || product.category === category);
}
