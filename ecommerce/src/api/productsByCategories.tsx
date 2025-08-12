import axios from "axios";
import { ProductApiResponse, Product } from "@/types/product";


export const fetchProductsByCategories = async(category: string): Promise<Product[]> => {
    const response = await axios.get<ProductApiResponse>(`https://dummyjson.com/products/category/${category}`)
    return response.data.products
}