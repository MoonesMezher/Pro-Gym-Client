"use client";

import API from '@/apis/init';
import apiService from '@/apis/services';
import React, { useEffect, useState } from 'react';

export default function DashboardPage() {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            apiService.get(API.HOME.GET.ADMIN)
                .then(res => {                    
                    setData(res?.data?.data);
                })
                .catch(err => {

                })
        }

        fetchData()
    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between">
            <div>
                <p className="text-gray-500">Total Users</p>
                <p className="text-3xl font-bold text-[#0B1D51]">{data && data.users}</p>
            </div>
            <div className="bg-[#8CCDEB] bg-opacity-20 p-3 rounded-lg">
                <span className="text-2xl text-[#0B1D51]">👥</span>
            </div>
            </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between">
            <div>
                <p className="text-gray-500">Revenue</p>
                <p className="text-3xl font-bold text-[#0B1D51]">${data && data.total}</p>
            </div>
            <div className="bg-[#8CCDEB] bg-opacity-20 p-3 rounded-lg">
                <span className="text-2xl text-[#0B1D51]">💰</span>
            </div>
            </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between">
            <div>
                <p className="text-gray-500">Total Coches</p>
                <p className="text-3xl font-bold text-[#0B1D51]">{data && data.coaches}</p>
            </div>
            <div className="bg-[#8CCDEB] bg-opacity-20 p-3 rounded-lg">
                <span className="text-2xl text-[#0B1D51]">📦</span>
            </div>
            </div>
        </div>
        
        {/* Chart Container */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#0B1D51] mb-4">Analytics Overview</h2>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
            Chart Area
            </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#0B1D51] mb-4">Recent Activity</h2>
            <ul className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
                <li key={item} className="flex items-start">
                <div className="bg-[#725CAD] p-2 rounded-lg mr-3">
                    <span className="text-white">🔔</span>
                </div>
                <div>
                    <p className="font-medium text-black">New order received</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
}