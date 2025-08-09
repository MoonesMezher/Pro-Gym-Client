"use client"

import API from "@/apis/init";
import apiService from "@/apis/services";
import Form from "@/components/blocks/Form"
import { toast } from "@/providers/ToastProvider";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Add = () => {
    const params = useParams();
    const id = params.id;

    const [fields, setFields] = useState([]);  
    const [coaches, setCoaches] = useState([]);  
    const [updated, setUpdated] = useState(false);  
    
    useEffect(() => {
        const fetchData = async () => {
            apiService.get(API.SECTIONS.GET.ALLWITHCOACHES+id)
            .then(res => {             
                setCoaches(res?.data?.data?.map(e => ({
                    name: e?._id,
                    label: e?.name,
                    checked: e?.checked
                })).filter(e => e.checked))
                
                setFields(res?.data?.data?.map(e => ({
                    type: "checkbox",
                    name: e?._id,
                    fullWidth: true,
                    label: e?.name,
                    checked: e?.checked
                })).filter(e => !e.checked))
            })
            .catch(err => {
                console.log(err);
            })
        }
        
        fetchData();
    }, [updated]);

    const handleSubmit = (data) => {     
        const lastData = {
            ids: Object.entries(data).map(e => e[1]? e[0]: null).filter(e => e)
        };
        
        apiService.post(API.SECTIONS.POST.ADD_COACHES+id, lastData)
            .then(e => {                
                if(e.status === 200) {
                    setUpdated(!updated)
                }
            })
            .catch(err => {
                if(Array.isArray(err?.response?.data?.errors)) {
                    toast.error("Error", {
                        description: err?.response?.data?.errors[0]
                    })
                } else {
                    toast.error("Error", {
                        description: err?.response?.data?.message || "Error"
                    })
                }
            })
    }

    const handleDelete = (userId) => {
        const data = { ids: [userId] };                

        apiService.post(API.SECTIONS.POST.DELETE_COACHES+id, data)
            .then(e => {                
                setUpdated(!updated)
            })
            .catch(err => {
                if(Array.isArray(err?.response?.data?.errors)) {
                    toast.error("Error", {
                        description: err?.response?.data?.errors[0]
                    })
                } else {
                    toast.error("Error", {
                        description: err?.response?.data?.message || "Error"
                    })
                }
            })
    }

    return (
        <div>
            <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-[#725CAD]/20 w-full mb-4`}>
                <div className="bg-[#0B1D51] p-6">
                    <h2 className="text-2xl font-bold text-white">Coaches</h2>
                </div>
                <div>
                    {coaches && coaches?.length > 0? coaches?.map((e, i) => <div key={i} className="flex items-center bg-white p-2 rounded-md w-full justify-between my-4 gap-2">
                        <span className="text-black">{e?.label}</span>
                        <button
                            type="button"
                            onClick={() => handleDelete(e.name)}
                            className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                        >
                            ×
                        </button>
                    </div>)
                    : <p className="p-2 text-black">No Coaches Yet</p>}
                </div>
            </div>
            <Form
                title={"Add Coaches"}
                fields={fields}
                cancelButton={false}
                submitText="Save"
                showHeader={true}
                showBorder={true}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default Add