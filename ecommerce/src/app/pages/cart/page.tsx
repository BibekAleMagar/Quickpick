"use client";

import { useCart } from "../../../context/cartContext";
import { GiShoppingCart } from "react-icons/gi";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import { TbShoppingCartOff } from "react-icons/tb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner";

export default function CartPage() {
  const { cart, dispatch } = useCart();

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function updateQuantity(id: number, quantity: number) {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }

  function removeItem(id: number) {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }

  return (
    <div className="flex justify-center items-center p-5 md:p-3">
      <div className="md:min-h-100 md:w-150 lg:w-200 w-full">
        <div className="flex justify-center mb-5">
          <h1 className="flex text-2xl font-bold md:text-3xl items-center ">
            Your Cart <GiShoppingCart className="font-bold ml-2" />
          </h1>
         
        </div>

        {cart.items.length === 0 && (
          <p className="text-center md:text-2xl">Your cart is empty.</p>
        )}

        
          {
            cart.items.length > 0 && (
              <div className="" >
              <Table>
                <TableHeader >
                 <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
              {cart.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell><Image src={item.thumbnail} alt="image" width={150} height={150}/></TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>Rs {(item.price).toFixed(2)}</TableCell>
                    <TableCell className="">
                      <div  className="flex items-center">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1  bg-gray-300 rounded cursor-pointer" 
                          >
                            −
                          </button><p className="mx-2">{item.quantity}</p> <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
                          >
                            +
                        </button>
                      </div>
                    </TableCell>
                    <TableCell><button
                        onClick={() => removeItem(item.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
                      >
                        <MdDeleteOutline className="text-2xl" />
                      </button></TableCell>
                  </TableRow>
              ))}
                </TableBody>
              </Table>
          </div>
            )
            
          }
          
         
          <div className=" flex items-center mt-5 justify-between">
            <button
            onClick={() => {
              dispatch({ type: "CLEAR_CART" });
              toast.success("Product remove successfully")
            }}
            className="text-lg md:text-xl  bg-black text-white  py-1 px-2 rounded-xl flex items-center cursor-pointer "
          >

            clear cart
            <TbShoppingCartOff className="text-2xl ml-2" />
          </button> 
        <h2 className=" text-xl font-bold ">
          Total: Rs {total.toFixed(2)}
        </h2>
          </div>
      </div>
    </div>
  );
}
