'use client'
import Image from "next/image"
import model from '../../../../public/model.png'
import { Button } from "@/components/ui/button";
import { Loader, ShoppingBag } from 'lucide-react';
import {
  Card,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FaTruck } from "react-icons/fa6";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaShieldHalved } from "react-icons/fa6";
import { FaHeadset } from "react-icons/fa";
import Link from "next/link"
import boost from '../../../../public/Boost.png'
import { useEffect, useState } from "react";
import { useProductByCategories } from "@/hooks/useProductByCategories";
import ad1 from '../../../../public/mq1.png';


const services =[
    {
        icon: FaTruck,
        title: 'Free Shipping',
        description : 'Free shipping over Rs 2000'
    },
    {
        icon: FaArrowsRotate,
        title: 'Easy Returns',
        description: '30-Day hassale free return'
    },
    {
        icon: FaShieldHalved,
        title: 'Secure Payment',
        description: 'Your Payment Information is safe'
    },
    {
        icon: FaHeadset,
        title: 'Customer Support',
        description: 'Round-the-clock customer service'
    }
]

 const LandingPage = () => {
    const {data, isLoading, error} = useProductByCategories("beauty")
    console.log(data)
    const [hidden, setHidden] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setHidden(true)
        }, 2000)
    }, [])
    
    return(
        <>
        {
            isLoading ? (
                <div className="h-100 flex items-center justify-center">
                    <Loader className="animate-spin" />
                </div>
            ) : error ? (
                <div className="h-100 flex items-center justify-center">
                    <p>Something went wrong</p>
                </div>
            ) : (
                <div>
                    <div className="relative flex flex-col items-center  ">   
            {hidden && (
                <div className="z-50 fixed inset-0 flex justify-center items-center backdrop-blur-md bg-black/50">
                <Image src={boost} alt="ad banner" className="md:h-164 shadow-2xl md:w-148 relative h-100 w-96" />
                <Button className="absolute top-40 right-1 md:top-25 md:right-20 lg:right-50 xl:right-150 xl:top-35 cursor-pointer bg-destructive hover:bg-destructive" onClick={() => setHidden(false)}>X</Button>
            </div>
            )}
            <div>
                <div className=" text-white md:px-10 lg:px-30 flex justify-evenly bg-blue-950 p-5 md:flex-row flex-col-reverse h-150 ">
                <div className="flex flex-col justify-center md:w-1/2 md:gap-3 lg:gap-8 gap-4">
                    <p className="text-center md:text-left text-2xl md:text-3xl lg:text-4xl font-bold">Discover Everything You Need</p>
                    <p className=" text-justify md:text-xl lg:text-2xl text-xl">From electronics to home essentials, beauty products to sporting goods. Find quality products at unbeatable prices, all in one place.</p>
                    <div className="flex justify-center md:justify-start">
                      <Link href={"/pages/products"}><Button className="w-fit text-md bg-white text-black hover:bg-white cursor-pointer"><ShoppingBag />Shop Now</Button></Link>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-end py-2 items-center">
                    <Image src={model} alt="model" className="" />
                </div>
            </div>
            <div className="bg-white grid md:grid-cols-2 lg:grid-cols-4 p-5 gap-5 ">
                {services.map((service) => (
                    <Card key={service.title} className="flex items-center text-center w-full" >
                        <CardHeader className="flex items-center flex-col">
                            <p className="text-3xl md:text-4xl">{<service.icon />}</p>
                            <p className="text-nowrap font-bold text-2xl ">{service.title}</p>
                            <p className="text-nowrap">{service.description}</p>
                        </CardHeader>                        
                    </Card>
                ))}
            </div>
            
            </div>
        </div>
        <div className="flex">
           <Image src={ad1} alt="ad1" className="w-full mb-2"/>
        
        </div>
        <div className="w-full pl-5 font-bold">
                <p className="text-2xl md:text-4xl mb-4">Beauty Products</p>
              <div className="overflow-x-auto pb-4" >
                <div className="flex w-max pb-2 gap-3 md:gap-6 lg:gap-10">
                        {
                            data ? (
                                data.map((product) => (
                                <Card key={product.title} className="w-60 md:w-80 flex-shrink-0 px-1" >
                                    <CardHeader className="flex items-center flex-col">
                                        <Image src={product.thumbnail} alt="product image" height={250} width={250} className="bg-gray-400" />
                                        <CardTitle className="md:text-nowrap text-center md:text-lg lg:text-xl">{product.title}</CardTitle>
                                        <p className="text-left font-normal">Rs {(product.price * 140).toFixed(2)}</p>
                                    </CardHeader>                        
                                    <Link href={`/pages/products/${product.id}`}>
                                        <Button className="bg-blue-950 hover:bg-blue-950 cursor-pointer w-full">
                                            See Details
                                        </Button>
                                    </Link>
                                </Card>
                            ))
                            ) : <div>No Data Found</div>
                        }
                </div>
              </div>
            </div>
                </div>
            )
        }
        
        </>
    )
}

export default LandingPage;