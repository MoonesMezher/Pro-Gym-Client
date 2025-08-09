'use client';

import Logo from "../ui/Logo"

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import useAuthStore from "@/store/auth.store";

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/#aboutus' },
    { name: 'Sections', href: '/#sections' },
    { name: 'Testimonials', href: '/#testimonials' },
]

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const user = useAuthStore(state => state.user);

    return (
        <header className="absolute inset-x-0 top-0 z-50 bg-main">
            <nav aria-label="Global" className="flex items-center justify-between py-5 container mx-auto px-4">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Pro GYM</span>
                        <Logo />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                    <Link key={item.name} href={item.href} className="text-sm/6 font-semibold text-white hover:text-skin">
                        {item.name}
                    </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {user
                    ? ((user === "admin" || user === "supervisor") ? <Link href="/admin" className="text-sm/6 font-semibold text-white hover:text-skin">
                        Dashboard <span aria-hidden="true">&rarr;</span>
                    </Link>:<Link href={user === "coach"? "/coach":"/profile"} className="text-sm/6 font-semibold text-white hover:text-skin">
                        Profile <span aria-hidden="true">&rarr;</span>
                    </Link>)
                    : (<Link href="/auth/login" className="text-sm/6 font-semibold text-white hover:text-skin">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>)}
                    
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                <a href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Pro GYM</span>
                    <Logo />
                </a>
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
                </div>
                <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                        <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-main"
                        >
                        {item.name}
                        </a>
                    ))}
                    </div>
                    <div className="py-6">
                    <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-main"
                    >
                        Log in
                    </a>
                    </div>
                </div>
                </div>
            </DialogPanel>
            </Dialog>
        </header>
    )
}

export default Header