export interface Product {
    id: number,
    title: string,
    description: string,
    price: number,
    brand: string,
    images: string[],
    thumbnail: string,
    rating: number,
    reviews: Review[]
    category: string
}

export interface ProductApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Review {
  rating: number,
  comment : string,
  date: string,
  reviewerName: string,
  reviewerEmail: string
}