"use client"

import API from "@/apis/init";
import apiService from "@/apis/services";
import Form from "@/components/blocks/Form";
import { usePermissions } from "@/hooks/usePermissions";
import { toast } from "@/providers/ToastProvider";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

const SectionPage = () => {
    const params = useParams();

    const [data, setData] = useState(null);    
    const [updated, setUpdated] = useState(false);    
    const [show, setShow] = useState(false);    

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
    }, [params.id, updated])

    const handleAdd = (data) => {
        const lastData = {...data, rate: +data.rate};

        apiService.post(API.RATES.POST.ADD+params.id, lastData)
            .then(e => {                
                if(e.status === 200) {
                    toast.success("Success", {
                        description: "Added Feedback Successfully"
                    })
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

    const fields = [
        {
            type: "select",
            required: true,
            name: "rate",
            fullWidth: true,
            label: "Rate",
            options: [1,2,3,4,5].map(e => ({ label: e.toString(), value: e })),
            placeholder: "5",
            validation: ""
        },
        {
            type: "textarea",
            required: true,
            name: "message",
            fullWidth: true,
            label: "Message",
            validation: ""
        }
    ]

    const { hasPermission } = usePermissions()

    return (
        <div className="pt-24 px-3 pb-3">
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
                    <span className="text-black mb-4 block cursor-pointer underline" onClick={() => setShow(true)}>See Details</span>
                    {hasPermission("user") && <Form
                        fields={fields}
                        cancelButton={false}
                        onSubmit={handleAdd}
                        title={"Add Your Feedback"}
                        showBorder={true}
                        showHeader={true}
                        submitText="Add"
                    />}
                </div>
                <div className={`fixed rounded-md bg-white shadow shadow-black top-[50%] translate-y-[-50%] duration-700 ${show? "left-[50%] translate-x-[-50%]": "left-[-100%]"} p-4`}>
                    <h3 className="font-medium text-center text-purple">RATES</h3>
                    <div className="flex flex-col gap-1 max-h-[150px] overflow-y-auto">
                        {(data?.rates) && (data?.rates.length > 0
                            ? (data?.rates.map((e, i) => <div key={i} className="text-black bg-[#ddd] p-1 rounded-md">
                                <p>Name: {e._user.name}</p>
                                <p>Email: {e._user.email}</p>
                                <p>Rate: {e.rate}</p>
                                <p>Message: {e.message}</p>
                            </div>))
                            : (<p>No Rates Yet</p>)
                        )}
                    </div>
                    <span className="text-black mb-4 block cursor-pointer underline mt-2 text-center" onClick={() => setShow(false)}>Cancel</span>
                </div>
            </div>
        </div>
    )
}

export default SectionPage