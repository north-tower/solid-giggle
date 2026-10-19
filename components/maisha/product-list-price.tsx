import { productPriceLabel, type RoofingProduct } from "@/lib/roofing-products";

export function ProductListPrice({ product }: { product: RoofingProduct }) {
  const price = productPriceLabel(product);
  if (!price) return null;
  return <p className="product-list-price">{price}</p>;
}
