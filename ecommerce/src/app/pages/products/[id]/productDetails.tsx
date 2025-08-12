
'use client'
import { useSingleProduct } from "@/hooks/useSingleProduct";
import { Loader } from "lucide-react";
import { ProductImages } from "@/components/productImage";
import { useParams } from "next/navigation";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import { toast } from "sonner";
import { useState, useEffect } from "react";



const ProductDetails = () => {
  const { id } = useParams();
  const productId = Number(id);
  const { data, isLoading, error } = useSingleProduct(productId);
  const { cart, dispatch } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const itemInCart = cart.items.find(item => item.id === productId);
    if (itemInCart) {
      setAdded(true);
      setQuantity(itemInCart.quantity);
    } else {
      setAdded(false);
      setQuantity(1);
    }
  }, [cart.items, productId]);

  const handleAddToCart = () => {
    if (!data) return;

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: data.id,
        name: data.title,
        price: data.price * 40,
        quantity,
        thumbnail: data.thumbnail,
      },
    });

    setAdded(true);
    toast.success("Product added to cart");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <p>Something went wrong!</p>
      </div>
    );

  if (!data)
    return (
      <div className="flex justify-center items-center h-64">
        <p>No Data Found</p>
      </div>
    );

  return (
    <div>
      <div className="flex justify-center p-5">
        <div className="flex flex-col md:max-w-[80%] lg:max-w-[60%]">
          <div className="flex md:flex-row flex-col">
            <div className="md:border-r-2 md:w-1/2 flex items-center">
              <ProductImages images={data.images} />
            </div>
            <div className="flex flex-col px-3 py-2 md:w-1/2">
              <p className="opacity-60">Brand: {data.brand || "Dummy"}</p>
              <p className="font-bold text-xl text-center md:text-4xl">{data.title}</p>
              <div className="justify-between flex font-semibold mt-2 md:mt-4 text-lg md:text-xl items-center">
                <p>Rs {(data.price * 140).toFixed(2)}</p>
                <div className="gap-3">
                  <p className="text-center font-bold text-xl">Rating</p>
                  <p className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => {
                      const rating = Math.round(data.rating);
                      return i < rating ? (
                        <FaStar key={i} className="text-yellow-400 text-2xl" />
                      ) : (
                        <FaRegStar key={i} className="text-yellow-400 text-2xl" />
                      );
                    })}
                  </p>
                </div>
              </div>

              <hr className="my-4 border-dotted border-2" />
              <div>
                <p className="font-bold text-md md:text-2xl mb-2">Description: </p>
                <p className="text-justify">{data.description}</p>
              </div>
              <p className="my-3 font-bold">
                Category: <span className="font-normal">{data.category.charAt(0).toUpperCase() + data.category.slice(1)}</span>
              </p>

              {!added ? (
                <>
                <div className="flex items-center gap-3 my-4">
                  <button
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    className="w-8 h-8 flex justify-center cursor-pointer items-center rounded border bg-gray-200 hover:bg-gray-300 select-none text-xl font-bold"
                  >
                    −
                  </button>
                  <span className="min-w-[32px] text-center text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex justify-center cursor-pointer items-center rounded border bg-gray-200 hover:bg-gray-300 select-none text-xl font-bold"
                  >
                    +
                  </button>
                  
                </div>
                <Button
                    className="md:text-xl md:font-bold bg-blue-950 cursor-pointer"
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </Button>
                  </>
              ) : (
                <p className="mt-4 font-semibold text-center text-green-600">Product added to cart (Qty: {quantity})</p>
              )}
            </div>
          </div>

          <hr className="my-4 border-dotted border-2" />

          <div className="p-5">
            <p className="text-xl font-bold md:text-3xl">Product Review</p>
            <div className="md:pl-15">
              {data.reviews.map((review, index) => (
                <div key={index} className="shadow p-3 my-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3 md:gap-5">
                      <p className="bg-purple-700 flex items-center justify-center rounded-full text-lg p-2 w-10 h-10 font-bold text-white">
                        {review.reviewerName
                          .split(" ")
                          .map((w) => w[0].toUpperCase())
                          .join("")}
                      </p>
                      <p className="text-xl md:text-2xl font-bold">{review.reviewerName}</p>
                    </div>
                    <p className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => {
                        const rating = Math.round(review.rating);
                        return i < rating ? (
                          <FaStar key={i} className="text-yellow-400 text-2xl" />
                        ) : (
                          <FaRegStar key={i} className="text-yellow-400 text-2xl" />
                        );
                      })}
                    </p>
                  </div>
                  <div className="pl-15 gap-3 md:gap-5">
                    <p className="md:text-xl">{review.comment}</p>
                    <p className="opacity-70">{review.date.split("T")[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
