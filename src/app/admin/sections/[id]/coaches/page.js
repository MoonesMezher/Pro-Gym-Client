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

    const router = useRouter();

    const [fields, setFields] = useState([]);  
    
    useEffect(() => {
        const fetchData = async () => {
            apiService.get(API.SECTIONS.GET.ALLWITHCOACHES+id)
            .then(res => {             
                console.log(res?.data?.data);
                
                setFields(res?.data?.data?.map(e => ({
                    type: "checkbox",
                    name: e?._id,
                    fullWidth: true,
                    label: e?.name,
                    checked: e?.checked
                })))
            })
            .catch(err => {
                console.log(err);
            })
        }
        
        fetchData();
    }, []);

    const handleSubmit = (data) => {     
        const lastData = {
            ids: Object.entries(data).map(e => e[1]? e[0]: null).filter(e => e)
        };
        
        apiService.post(API.SECTIONS.POST.ADD_COACHES+id, lastData)
            .then(e => {                
                if(e.status === 200) {
                    router.push(`/admin/sections/${id}`);
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

    return (
        <div>
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