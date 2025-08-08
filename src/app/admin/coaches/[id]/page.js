"use client"

import API from "@/apis/init";
import apiService from "@/apis/services";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

const Coach = () => {
    const params = useParams();

    const [data, setData] = useState(null);    

    useEffect(() => {
        const fetchData = async () => {            
            apiService.get(API.USERS.GET.COACH+`${params.id}`)
                .then(res => {
                    setData(res.data.data)                    
                    console.log(res.data.data);
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
                {data?.user?.picture && <div className="w-[100px] h-[100px] rounded-full border-2 overflow-hidden border-black">
                    <img 
                        src={`http://localhost:4000/${data?.user?.picture}`} 
                        alt={`${data?.user._user.name} Profile Photo`} 
                        className="w-full h-full"
                    />
                </div>}
                <div>
                    <h3 className="text-sm font-medium text-purple">NAME</h3>
                    <p className="text-lg text-black">{data?.user._user.name}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-purple">EMAIL</h3>
                    <p className="text-lg text-black">{data?.user._user.email}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-purple">ROLE</h3>
                    <p className="text-lg text-black">{data?.user._user.role}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-purple">SECTIONS</h3>
                    <p className="text-lg text-black">{data?.sections.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Coach