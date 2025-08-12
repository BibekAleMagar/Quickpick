import { Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import PlayStore from '../../public/PlayStore.png';
import AppStore from '../../public/AppStore.png'

export const Footer = ()=> {
    const year = new Date().getFullYear()
    return(
        <>
            <div className='bg-blue-950 p-5 md:p-10 lg:p-15'>
                 <div className=" flex md:justify-evenly justify-between flex-wrap gap-5">
                <div className="text-white"> 
                    <p className="text-xl mb-3 md:text-2xl font-bold lg:text-4xl md:mb-7">Quick Pick</p>
                    <div className='gap-5 flex flex-col pl-5'>
                        <p className='font-bold md:text-2xl text-lg'>Contact Us</p>
                        <div className='flex  items-center gap-2'>
                            <Phone />
                            <div>
                                <p className='font-bold'>Call Us</p>
                                <p>9800000000</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Mail />
                            <div>
                                <p className='font-bold'>Mail Us</p>
                                <p>kendrix@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-white'>
                    <p className='font-bold md:text-2xl text-lg underline underline-offset-4 mb-3'>Categories</p>
                    <div className='flex flex-col gap-1'>
                        <p className='font-semibold md:text-xl'>Beauty</p>
                        <p className='font-semibold md:text-xl'>Furniture</p>
                        <p className='font-semibold md:text-xl'>Grocery</p>
                        <p className='font-semibold md:text-xl'>Home-Decoration</p>
                        <p className='font-semibold md:text-xl'>Skin Care</p>
                        <p className='font-semibold md:text-xl'>Jewellery</p>
                    </div>
                </div>
                 <div className='text-white'>
                    <p className='font-bold md:text-2xl text-lg underline underline-offset-4 mb-3'>Customer Services</p>
                    <div className='flex flex-col gap-1'>
                        <p className='font-semibold md:text-xl'>About Us</p>
                        <p className='font-semibold md:text-xl'>Terms and COndition</p>
                        <p className='font-semibold md:text-xl'>FAQ</p>
                        <p className='font-semibold md:text-xl'>Privacy Policy</p>
                        <p className='font-semibold md:text-xl'>E-waste policy</p>
                        <p className='font-semibold md:text-xl'>Return Policy</p>
                    </div>
                </div>
                <div className='text-white'>
                    <p className='font-bold md:text-2xl text-lg'>Download App</p>
                    <div className='flex flex-col'>
                        <Image src={PlayStore} alt="PlayStore" height={200} width={170} />
                        <Image src={AppStore} alt='AppStore' height={150} width={150} className='ml-2' />
                    </div>
                </div>
            </div>
            <hr className='text-white my-5' />
            <div >
                <p className='text-white font-semibold text-center md:text-xl'>&copy; {year} All rights reserved. Kendrix</p>
            </div>

            </div>
           
        </>
    )
}