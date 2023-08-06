"use client"
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Buttons from "./Buttons";
import { useUser } from "@/hooks/useUser";
import useAuthModel from "@/hooks/useAuthModel";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Button from "./Buttons";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";


interface HeaderProps {
    children: React.ReactNode;
    classname: string;
}

const Header: React.FC<HeaderProps> = (
    { children, classname }
) => {
    const router = useRouter();
    const authModel = useAuthModel();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handlelogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        //todo: reset any playing song
        router.refresh();
        if (error) {
            toast.error(error.message);
        }else{
            toast.success('Logged Out!')
        }
    }
    return (
        <div className={twMerge("h-fit bg-gradient-to-b from-emerald-800 p-6", classname)}>
            <div className="w-full mb-4  flex item-center justify-between" >
                <div className="hidden md:flex gap-x-2 items-center ">
                    <button onClick={() => router.back()} className="rounded-full bg-black flex item-center  justify-center hover:opacity-75 transition ">
                        <RxCaretLeft size={35} className="text-white" />
                    </button>
                    <button className="rounded-full bg-black flex item-center  justify-center hover:opacity-75 transition ">
                        <RxCaretRight onClick={() => router.forward()} size={35} className="text-white" />
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center ">
                    <button className="rounded-full p-2 bg-white flex item-center  justify-center hover:opacity-75 transition ">
                        <HiHome className="text-black" fontSize={20} />
                    </button>
                    <button className="rounded-full p-2 bg-white flex item-center  justify-center hover:opacity-75 transition ">
                        <BiSearch className="text-black" fontSize={20} />
                    </button>

                </div>
                <div className="flex  justify-between items-center gap-x-4">
                    {user ? (
                        <div className="flex gap-x-4 items-center ">
                            <Button onClick={handlelogout} className="bg-white px-6 py-2">
                                Logout
                            </Button>
                            <Button onClick={() => router.push('/account')} className="bg-white">
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Buttons
                                    onClick={authModel.onOpen}
                                    className="bg-transparent text-neutral-300  font-medium" >
                                    Sign up
                                </Buttons>
                            </div>
                            <div>
                                <Buttons
                                    onClick={authModel.onOpen}
                                    className="bg-white px-6 py-2">
                                    Log in
                                </Buttons>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header