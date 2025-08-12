import { Product, ProductApiResponse } from "@/types/product";
import axios from "axios";

export const fetchProduct = async () : Promise<Product[]> => {
    const response = await axios.get<ProductApiResponse>('https://dummyjson.com/products');
    return response.data.products
}