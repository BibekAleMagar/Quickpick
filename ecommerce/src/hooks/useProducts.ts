

import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/api/productApi";

export const useProduct = () => {
    return useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: fetchProduct,
    })
}