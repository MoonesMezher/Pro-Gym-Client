"use client"

import useAuthStore from "@/store/auth.store"
import Link from "next/link"
import { FaDumbbell } from "react-icons/fa"

const Hero = () => {
    const user = useAuthStore(state => state.user);

    return (
        <section className="relative bg-gradient-to-r from-main to-purple text-white pt-[120px] pb-[60px]">
            <div className="absolute inset-0 bg-black bg-opacity-50">
            <div className="absolute inset-0 bg-[url('/gym.jpg')] bg-cover bg-center opacity-30"></div>
            </div>
            <div className="container mx-auto px-4 py-28 relative z-10">
            <div className="max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                TRANSFORM YOUR <span className="text-skin">BODY</span> & <span className="text-[#8CCDEB]">MIND</span>
                </h1>
                <p className="text-xl mb-8 text-gray-200">
                Join Pro Gym fitness destination with world-class facilities, expert trainers, and a community that motivates.
                </p>
                <div className="flex flex-wrap gap-4">
                {!user && <Link href={"/auth/login"} className="bg-skin text-main hover:bg-skin px-8 py-4 rounded-full font-bold text-lg flex items-center">
                    <FaDumbbell className="mr-2" /> Join Now
                </Link>}
                </div>
            </div>
            </div>
        </section>
    )
}

export default Hero