import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/singleProductApi";

export const useSingleProduct = (id: number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
        enabled: !!id
    })
}
