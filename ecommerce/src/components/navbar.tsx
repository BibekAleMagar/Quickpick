'use client';
import { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/Logo.png';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';

import { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from 'next/link';

export const NavBar = () => {
  const router = useRouter()
  const [userName,setUserName] = useState<string | null>(null)
 useEffect(() => {
  const userInfoString = sessionStorage.getItem('userInfor');
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    if (userInfo.username) setUserName(userInfo.username);
  }
}, []);


const handleLogout = () => {
    sessionStorage.clear();
    router.push("/")
    
  };
  return (
    <>
      <div className='flex bg-pink-600 p-2 justify-between md:justify-evenly items-center'>
        <Image src={logo} alt="Logo" className='h-24 w-24 cursor-pointer' onClick={() => router.push('/pages/landing')} />
        <div>
          <p className='font-bold text-2xl md:text-5xl text-white'>Quick Pick</p>
        </div>
        <div className='flex items-center rounded-xl md:flex-row flex-col gap-2'>
          
          <DropdownMenu>
            <DropdownMenuTrigger  className='cursor-pointer bg-blue-950 text-white flex rounded-lg p-2'><User className='text-white' />
            {userName}</DropdownMenuTrigger>
            <DropdownMenuContent className='bg-blue-950 hover:bg-blue-950'>
              <DropdownMenuItem  className=' hover:bg-blue-950' asChild>
                <AlertDialog>
                  <AlertDialogTrigger className='text-white cursor-pointer'>Logout</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will take you out from the page.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout} className='cursor-pointer'>Yes</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link href={'/pages/cart'}><Button className='cursor-pointer bg-blue-950'>
            <ShoppingCart className='text-white' />
            Cart
          </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
