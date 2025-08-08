"use client";

import API from "@/apis/init";
import apiService from "@/apis/services";
import Form from "@/components/blocks/Form";
import { toast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";

const Add = () => {
    const fields = [
        {
            type: "text",
            textType: "text",
            required: true,
            name: "name",
            fullWidth: true,
            label: "Name",
            placeholder: "Sami",
            validation: ""
        },
        {
            type: "text",
            textType: "email",
            required: true,
            name: "email",
            fullWidth: true,
            label: "Email",
            placeholder: "email@email.com",
            validation: ""
        },
        {
            type: "text",
            textType: "password",
            required: true,
            name: "password",
            fullWidth: true,
            label: "Password",
            placeholder: "",
            validation: ""
        }
    ];

    const router = useRouter();

    const handleSubmit = (data) => {        
        apiService.post(API.USERS.POST.ADD_COACH, data)
            .then(e => {
                if(e.status === 201) {
                    router.push("/admin/coaches")
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
            title={"Add New Coach"}
            submitText="Save"
            showHeader={true}
            showBorder={true}
            cancelButton={false}
            onSubmit={handleSubmit}
        />
    )
}

export default Add