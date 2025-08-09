"use client"

import API from "@/apis/init";
import apiService from "@/apis/services";
import Form from "@/components/blocks/Form"
import { toast } from "@/providers/ToastProvider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Add = () => {
    const params = useParams();
    const id = params.id;

    const [fields, setFields] = useState([]);  
    const [prices, setPrices] = useState([]);  
    const [users, setUsers] = useState([]);  
    const [updated, setUpdated] = useState(false);  

    useEffect(() => {
        const fetchData = async () => {
            apiService.get(API.SECTIONS.GET.ONE+id)
            .then(res => {                             
                setPrices(res.data.data.section.price.map(e => ({ value: e.key, label: `${e?.key} - $${e?.value}` })))
            })
            .catch(err => {
                console.log(err);
            })
        }
        
        fetchData();
    }, [id]);
    
    useEffect(() => {
        const fetchData = async () => {
            apiService.get(API.SECTIONS.GET.ALLWITHUSERS+id)
            .then(res => {             
                setUsers(res?.data?.data?.map(e => ({
                    value: e?._id,
                    label: `${e?.name} - ${e?.email}`,
                    checked: e?.checked
                })).filter(e => e.checked)) 
                
                setFields(res?.data?.data?.map(e => ({
                    value: e?._id,
                    label: `${e?.name} - ${e?.email}`,
                    checked: e?.checked
                })).filter(e => !e.checked))                
            })
            .catch(err => {
                console.log(err);
            })
        }
        
        fetchData();
    }, [updated]);

    const initFields = [
        {
            type: "select",
            required: true,
            name: "user",
            fullWidth: true,
            label: "User",
            placeholder: "Rami",
            options: fields,
            validation: ""
        },
        {
            type: "select",
            required: true,
            name: "price",
            fullWidth: true,
            label: "Price",
            placeholder: "$200",
            options: prices,
            validation: ""
        },
        {
            type: "text",
            textType: "number",
            required: true,
            name: "expired",
            fullWidth: true,
            label: "Expired",
            placeholder: "30",
            validation: ""
        }
    ];

    const handleSubmit = (data) => {   
        const lastData = { ...data, expired: +data.expired };

        apiService.post(API.SECTIONS.POST.ADD_USER+id, lastData)
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
        const data = { user: userId };                       

        apiService.post(API.SECTIONS.POST.DELETE_USER+id, data)
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
                    <h2 className="text-2xl font-bold text-white">Users</h2>
                </div>
                <div>
                    {users && users?.length > 0? users?.map((e, i) => <div key={i} className="flex items-center bg-white p-2 rounded-md w-full justify-between my-4 gap-2">
                        <span className="text-black">{e?.label}</span>
                        <button
                            type="button"
                            onClick={() => handleDelete(e?.value)}
                            className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                        >
                            ×
                        </button>
                    </div>)
                    : <p className="p-2 text-black">No Users Yet</p>}
                </div>
            </div>
            <Form
                title={"Add User"}
                fields={initFields}
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