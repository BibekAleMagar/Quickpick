import { fetchProductsByCategories } from "@/api/productsByCategories";
import { useQuery } from "@tanstack/react-query";


export const useProductByCategories = (category: string) => {
    return useQuery({
        queryKey: ["products", category],
        queryFn: () => fetchProductsByCategories(category),
        enabled: !!category
    })
}