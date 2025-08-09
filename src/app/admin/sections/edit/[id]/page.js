"use client";

import API from "@/apis/init";
import apiService from "@/apis/services";
import Form from "@/components/blocks/Form";
import { toast } from "@/providers/ToastProvider";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Update = () => {    
    const [images, setImages] = useState([]);
    const [section, setSection] = useState();
    const [initialData, setInitialData] = useState([]);

    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            apiService.get(API.SECTIONS.GET.ONE+params.id)
                .then(res => {                                 
                    setSection(res?.data?.data?.section)                    
                    setInitialData(res?.data?.data?.section?.images)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        
        fetchData();
    }, [params.id])

    const fields = [
        {
            type: "text",
            textType: "text",
            required: true,
            name: "title",
            fullWidth: true,
            label: "Title",
            placeholder: "Yoga",
            value: section?.title,
            validation: ""
        },
        {
            type: "textarea",
            required: true,
            name: "description",
            fullWidth: true,
            label: "Description",
            value: section?.description,
            validation: ""
        },
        {
            type: "file",
            textType: "images",
            required: true,
            name: "images",
            fullWidth: true,
            label: "Images",
            accept: "image/*",
            initialData: initialData,
            setInitialData: setInitialData
        },
        {
            type: "keyValueArray",
            name: "price",
            fullWidth: true,
            label: "Pricing",
            value: section?.price
        }
    ];

    const router = useRouter();
    
    const handleSubmit = (data) => {     
        const processedData = {
            ...data,
            images: [...images, ...initialData],
            price: data.price ? data.price.map(item => ({
                key: item.key,
                value: item.value
            })): []
        };
        
        apiService.put(API.SECTIONS.PUT.UPDATE+params.id, processedData)
            .then(e => {                
                if(e.status === 200) {
                    router.push("/admin/sections");
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

    const handleFileSubmit = (images) => {
        apiService.postFile(API.UPLOADS.POST.UPLOAD, images)
            .then(res => {
                if(res.status === 201) {
                    toast.success("Success", {
                        description: "Uploaded files successfully"
                    })
                    
                    setImages(res.data.images)
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
        <Form 
            fields={fields}
            title={`Update "${section?.title}" Section`}
            submitText="Save"
            showHeader={true}
            showBorder={true}
            cancelButton={false}
            onSubmit={handleSubmit}
            onFileSubmit={handleFileSubmit}
            initialData={section?.images || []}
        />
    )
}

export default Update