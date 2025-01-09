import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./CategorySelector";

interface ProductViewProps {
    products: Product[];
    categories: Category[];
}

export const ProductsView = ({ products, categories }: ProductViewProps) => {
    return (
        <div className="flex flex-col">

            <div className="w-full sm:w-[200px]">
                <CategorySelectorComponent categories={categories} />
            </div>


            <div className="flex-1">
                <div>
                    <ProductGrid products={products} />
                    <hr className="w-1/2 sm:w-3/4" />
                </div>
            </div>
        </div>
    );
}