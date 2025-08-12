"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProduct } from "@/hooks/useProducts";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import SelectCategories from "./categories";

export const ProductList = () => {
  const { data, isLoading, error } = useProduct();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  const filteredProducts = data
    ? data.filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
    : [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center">
          <p>Something went wrong</p>
        </div>
      ) : data ? (
        <>
          <div className="p-2">
            <div className="flex justify-center items-center flex-col">
              <div className="w-full md:max-w-[60%] flex gap-2 justify-center flex-col">
               <div className="flex justify-center items-center gap-2">
                 <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className=""
                  placeholder="Search products"
                />

                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(e.target.value as "none" | "asc" | "desc")
                  }
                  className="border rounded-md p-2 cursor-pointer"
                >
                  <option value="none" className="cursor-pointer">Sort by Price</option>
                  <option value="asc" className="cursor-pointer">Price: Low to High</option>
                  <option value="desc" className="cursor-pointer">Price: High to Low</option>
                </select>
               </div>
                <SelectCategories
                  selectedCategory={selectedCategory}
                  onValueChange={setSelectedCategory}
                />
              </div>
              

              {sortedProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-5 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
                  {sortedProducts.map((product) => (
                    <Card key={product.id} className="flex justify-center px-2">
                      <CardHeader className="flex flex-col justify-center items-center text-sm md:text-xl lg:text-2xl">
                        <CardTitle className="text-xl md:text-xl lg:text-2xl">
                          {product.title}
                        </CardTitle>
                        <Image
                          src={product.thumbnail}
                          alt="thumbnail"
                          width={175}
                          height={175}
                        />
                      </CardHeader>

                      <CardDescription className="flex justify-between items-center">
                        <div className="flex justify-between w-full flex-col">
                          <p className="text-md md:text-lg text-justify px-2">
                            {product.description.slice(0, 92) + "..."}
                          </p>

                          <div className="flex justify-between items-end">
                            <p className="text-white p-1 rounded-lg text-lg md:text-lg lg:text-xl bg-pink-600">
                              Rs {(product.price * 140).toFixed(2)}
                            </p>

                            <div className="gap-3">
                              <p className="text-center font-bold text-xl">Rating</p>
                              <p className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => {
                                  const rating = Math.round(product.rating);
                                  return i < rating ? (
                                    <FaStar
                                      key={i}
                                      className="text-yellow-400 text-2xl"
                                    />
                                  ) : (
                                    <FaRegStar
                                      key={i}
                                      className="text-yellow-400 text-2xl"
                                    />
                                  );
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardDescription>
                      <Link href={`/pages/products/${product.id}`}>
                        <Button className="bg-blue-950 hover:bg-blue-950 cursor-pointer w-full">
                          See Details
                        </Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="h-150 flex justify-center items-center">
                  <p>No Data Found</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>No data found</div>
      )}
    </>
  );
};
