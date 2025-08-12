import { fetchCategories } from "@/api/categoriesApi";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
    return useQuery ({
        queryKey: ['category-list'],
        queryFn: fetchCategories
    })
}