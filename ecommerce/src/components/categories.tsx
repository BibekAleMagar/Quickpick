"use client";

import { useCategories } from "@/hooks/useCtegories";
import { Loader } from "lucide-react";

type SelectCategoriesProps = {
  selectedCategory: string;
  onValueChange: (value: string) => void;
};

function SelectCategories({ selectedCategory, onValueChange }: SelectCategoriesProps) {
  const { data: categories, isLoading, error } = useCategories();

  return (
    <>
      {isLoading ? (
        <div className="h-100 flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      ) : error ? (
        <div className="h-100 flex items-center justify-center">
          <p>Something went wrong!</p>
        </div>
      ) : categories ? (
        <div className="flex gap-3 overflow-x-auto py-2 no-scrollbar">
          <button
            onClick={() => onValueChange("all")}
            className={`px-4 py-2 rounded-lg border cursor-pointer ${
              selectedCategory === "all"
                ? "bg-blue-950 text-white"
                : "bg-white text-black"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onValueChange(cat)}
              className={`px-4 py-2 rounded-lg border capitalize cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-950 text-white"
                  : "bg-white text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      ) : (
        <div className="h-100 flex justify-center items-center">
          <p>No Data Found</p>
        </div>
      )}
    </>
  );
}

export default SelectCategories;
