import Banner from "@/components/Banner";
import { ProductsView } from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  console.log(
    crypto.randomUUID().slice(0, 5) +
    `>>> Rerendered the home page cache with ${products.length}
    products and ${categories.length} categories
    `
  )
  return (
    <div>
      <Banner />

      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
