import { officialProductImages } from "@/lib/brand-media";

export const products = [
  { name: "Maisha Colour Box Profile", category: "Box profile", image: officialProductImages.box, description: "Clean lines. Lasting strength. A versatile profile for homes and commercial spaces." },
  { name: "Maisha Premium Tile", category: "Tile profile", image: officialProductImages.premium, description: "The character of traditional tiles, with the strength and practicality of steel." },
  { name: "Maisha Roman Tile", category: "Tile profile", image: officialProductImages.roman, description: "Distinctive curves and an elegant finish that makes every home stand out." },
];

export type RoofingProduct = (typeof products)[number];
