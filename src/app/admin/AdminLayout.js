"use client";

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { FaBox, FaGear, FaHouse, FaMessage, FaUser } from "react-icons/fa6"
import { IoMdGrid } from "react-icons/io"
import { FaUserNinja } from 'react-icons/fa';
import ProtectedRoute from '@/components/auth/protectedRoute';
import { ROLES } from '@/utils/role';
import useAuthStore from '@/store/auth.store';
import { usePermissions } from '@/hooks/usePermissions';
const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const data = useAuthStore(state => state.data)

    const { justAdmin } = usePermissions()
    
    let navItems = [
        { name: 'Dashboard', icon: <FaHouse className='text-skin text-xl' />, href: '/admin' },
        { name: 'Users', icon: <FaUser className='text-skin text-xl'/>, href: '/admin/users' },
        justAdmin() && { name: 'Coaches', icon: <FaUserNinja className='text-skin text-xl'/>, href: '/admin/coaches' },
        { name: 'Schedules', icon: <FaBox className='text-skin text-xl'/>, href: '/admin/schedules' },
        justAdmin() && { name: 'Sections', icon: <IoMdGrid className='text-skin text-xl'/>, href: '/admin/sections' },
        justAdmin() && { name: 'Messages', icon: <FaMessage className='text-skin text-xl'/>, href: '/admin/messages' },
        { name: 'Settings', icon: <FaGear className='text-skin text-xl'/>, href: '/admin/settings' },
    ];

    navItems = navItems.filter(e => e !== false)        

    return (
        <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPERVISOR]}>
            <div className="flex h-screen bg-[#ddd] overflow-hidden">
            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-opacity-50 lg:hidden" 
                    onClick={() => setSidebarOpen(false)} />
            )}
            
            {/* Sidebar */}
            <div 
                className={`fixed lg:static z-50 w-64 h-full bg-main text-white transform transition-transform duration-300 ease-in-out 
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="p-5">
                <h1 className="text-2xl font-bold flex items-center">
                    <Logo style="mx-auto"/>
                </h1>
                </div>
                
                <nav className="p-3 mt-4">
                <ul>
                    {navItems?.map((item) => (
                    <li key={item?.name} className="mb-1">
                        <Link href={item?.href} className={`flex items-center p-3 rounded-lg hover:bg-sky transition-all`}>
                            {item?.icon}
                            <span className='ml-3'>{item?.name}</span>
                        </Link>
                    </li>
                    ))}
                </ul>
                </nav>
                
                <div className="absolute bottom-0 w-full p-4 border-t border-sky">
                <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 text-main flex justify-center items-center font-bold">
                        {data?.name && data.name[0]}
                    </div>
                    <div className="ml-3">
                        <p className="font-medium">{data?.name}</p>
                        <p className="text-sm text-sky">{data?.email}</p>
                    </div>
                </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white shadow-sm">
                <div className="flex items-center justify-between px-6 py-4">
                    <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden text-main focus:outline-none"
                    >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    </button>
                    
                    <div className="text-xl font-semibold text-main hidden lg:block">
                        Pro Gym
                    </div>
                    
                    <div className="flex items-center space-x-6">
                    
                    <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 text-main flex justify-center items-center font-bold">
                            {data?.name && data.name[0]}
                        </div>
                        <span className="ml-3 text-main hidden md:inline">{`Hi, ${data?.name?.split(" ")[0]}`}</span>
                    </div>
                    </div>
                </div>
                </header>
                
                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#ddd]">
                    {children}
                </main>
            </div>
            </div>
        </ProtectedRoute>
    );
};

export default AdminLayout;