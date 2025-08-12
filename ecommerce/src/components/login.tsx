"use client"

import Image from "next/image";
import { useLogin } from "@/hooks/useLogin";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import Login from '../../public/Login.png'
import { Loader,EyeOff, Eye } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
    username: z.string().min(2, "At least 2 charcter is required"),
    password : z.string().min(6, "Password must be at least 6 charcter")
})

type loginSchemas= z.infer<typeof loginSchema>
type LoginFormProps = {
  onLoginSuccess?: (email: string) => void;
};

export const LoginForm =({ onLoginSuccess}: LoginFormProps) => {
    const router = useRouter()
    const form = useForm<loginSchemas>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })
    const {mutate, status, isError} = useLogin()
    const isLoading = status === "pending";
    const [showPassword , setShowPassword] = useState(false)

    const onSubmit = (values: loginSchemas) => {
        mutate(values, {
            onSuccess: (data) => {
                sessionStorage.setItem('userInfor', JSON.stringify(data))
                if (onLoginSuccess) {
                    onLoginSuccess(data.email);
                }
                router.push('/pages/landing')
                toast.success(`Welcome ${data.firstName}`)
            },
            
        })
    }

    return (
        <>
            <div className=" bg-gradient-to-r from-[#0F2027] to-[#2C5364] h-screen flex justify-center items-center">
                <div className="flex ">
                <div className="hidden md:block w-1/2">
                    <Image src={Login} alt="login" className="w-lg"/>
                </div>
                <div className="md:w-1/2 p-2 flex flex-col justify-center gap-2 px-5 bg-white">
                <p className="text-center font-bold text-xl md:text-2xl">Quick Pick</p>
                <p className="text-center text-lg md:text-2xl font-semibold">LogIn To Your Account </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <FormField 
                            control={form.control}
                            name = "username"
                            render={({field}) => (
                            <FormItem className="mb-5">
                                <FormLabel className="text-lg">Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem >
                        )} />
                        <FormField 
                            control={form.control}
                            name = "password"
                            render={({field}) => (
                            <FormItem className="mb-5">
                                <FormLabel className="text-lg">Password</FormLabel>
                                <FormControl>
                                    <div className="relative w-full">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter password"
                                            className="p-2 pr-10"
                                            {...field}
                                        />
                                            <div
                                            className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </div>
                                        </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )} />
                         {
                            isError && (
                                <p className="text-red-600 mb-2 text-center">Invalid credentials</p>
                            )
                        }
                        <Button type="submit" className="w-full cursor-pointer ">
                            {
                                isLoading ? <p className="flex items-center">Logging In<Loader className="animate-spin ml-4" /></p> : "Login"
                            }
                        </Button>
                    </form>
                </Form>
                </div>
            </div>
            </div>
            
        </>
    )
}

