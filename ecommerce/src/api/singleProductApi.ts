import axios from 'axios'
import { Product } from '@/types/product'

export const fetchProductById = async (id : number) : Promise<Product> => {
    const response = await axios.get<Product>(`https://dummyjson.com/products/${id}`);
    return response.data
}