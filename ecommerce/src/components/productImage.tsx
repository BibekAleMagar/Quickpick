import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"


interface ProductImage {
    images: string[]
}

export const ProductImages = ({images} : ProductImage) => {
    if(images.length <= 1) {
        return (
            <div className="flex justify-center items-center">
                <Image src={images[0]} alt="product Image" width={250} height={250} />
            </div>
        )
    }
    return (
        <>
            <Carousel className="relative">
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="flex justify-center items-center">
                            <Image src={image} alt="product Image" width={250} height={250} />
                        </CarouselItem>
                    ))}
                   
                </CarouselContent >
                <CarouselPrevious className="hidden md:flex absolute left-2" />
                <CarouselNext className="hidden md:flex absolute right-2" />
            
            </Carousel>
        </>
    )
}