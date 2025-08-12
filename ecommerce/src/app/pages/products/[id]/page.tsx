import ProductDetails from "./productDetails";

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  return data.products.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage() {
  return <ProductDetails />;
}
