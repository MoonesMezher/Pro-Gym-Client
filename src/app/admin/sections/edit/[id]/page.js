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

    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            apiService.get(API.SECTIONS.GET.ONE+params.id)
                .then(res => {                                 
                    setSection(res?.data?.data?.section)                    
                    console.log(res.data.data?.section);
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
            initialData: section?.images
        },
        {
            type: "keyValueArray",
            required: true,
            name: "price",
            fullWidth: true,
            label: "Pricing",
            value: section?.price,
            validation: {
                validate: (value) => 
                    value.every(item => item.key && item.value) || 
                    "All key-value pairs must be filled"
            }
        }
    ];

    const router = useRouter();
    
    const handleSubmit = (data) => {     
        const processedData = {
            ...data,
            images,
            price: data.price.map(item => ({
                key: item.key,
                value: item.value
            }))
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