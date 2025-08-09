"use client"

import API from "@/apis/init";
import apiService from "@/apis/services";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

const SectionPage = () => {
    const params = useParams();
    const router = useRouter();

    const [data, setData] = useState(null);    

    useEffect(() => {
        const fetchData = async () => {            
            apiService.get(API.SECTIONS.GET.ONE+`${params.id}`)
                .then(res => {
                    setData(res.data.data)                    
                })
                .catch(err => {
                    console.log(err);
                })
        }

        fetchData();
    }, [params.id])

    return (
        <div className="">
            <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                    {data?.section?.images && data?.section?.images.map((e, i) => <div key={i} className="w-[150px] h-[150px] rounded-[10px] border-2 overflow-hidden border-black">
                        <img 
                            src={`http://localhost:4000/${e}`} 
                            alt={`${e} Section Photo`} 
                            className="w-full h-full"
                        />
                    </div>)}
                </div>
                <div>
                    <h3 className="text-sm font-medium text-purple">TITLE</h3>
                    <p className="text-lg text-black">{data?.section.title}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-purple">DESCRIPTION</h3>
                    <p className="text-lg text-black">{data?.section.description}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-purple">PRICING</h3>
                    <div>
                        {data?.section?.price.length > 0 && 
                        data?.section?.price.map((e, i) => <p key={i} className="text-lg text-black">{e.key}: {e.value}</p>)}
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-purple">RATE</h3>
                    <p className="text-lg text-black">{data?.section.avgRate}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-purple">COACHES</h3>
                    <p className="text-lg text-black">{data?.coaches.length}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-purple">RATES</h3>
                    <p className="text-lg text-black">{data?.rates.length}</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        className="p-3 py-2 rounded-md bg-main text-white cursor-pointer duration-300 hover:opacity-80" 
                        onClick={() => router.push(`/admin/sections/${params.id}/coaches`)}
                    >ADD COACHES</button>
                    <button 
                        className="p-3 py-2 rounded-md bg-purple text-white cursor-pointer duration-300 hover:opacity-80"
                        onClick={() => router.push(`/admin/sections/${params.id}/users`)}
                    >ADD USERS</button>
                </div>
            </div>
        </div>
    )
}

export default SectionPage