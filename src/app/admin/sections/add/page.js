"use client";

import API from "@/apis/init";
import apiService from "@/apis/services";
import Form from "@/components/blocks/Form";
import { toast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Add = () => {    
    const [images, setImages] = useState([]);

    const fields = [
        {
            type: "text",
            textType: "text",
            required: true,
            name: "title",
            fullWidth: true,
            label: "Title",
            placeholder: "Yoga",
            validation: ""
        },
        {
            type: "textarea",
            required: true,
            name: "description",
            fullWidth: true,
            label: "Description",
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
            multiple: true
        },
        {
            type: "keyValueArray",
            required: true,
            name: "price",
            fullWidth: true,
            label: "Pricing",
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
        
        apiService.post(API.SECTIONS.POST.ADD, processedData)
            .then(e => {
                console.log(e);
                
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
            title={"Add New Section"}
            submitText="Save"
            showHeader={true}
            showBorder={true}
            cancelButton={false}
            onSubmit={handleSubmit}
            onFileSubmit={handleFileSubmit}
        />
    )
}

export default Add