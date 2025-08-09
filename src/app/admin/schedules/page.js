"use client";

import React, { useEffect, useState } from 'react';
import DataTable from '@/components/blocks/Table';
import { useRouter } from 'next/navigation';
import Head from '@/components/blocks/Head';
import apiService from '@/apis/services';
import API from '@/apis/init';
import { toast } from '@/providers/ToastProvider';
import Form from '@/components/blocks/Form';

const SchedulesPage = () => {
    // Sample data
    const [schedules, setSchedules] = useState([]);  
    const [updated, setUpdated] = useState(false);      
    const [results, setResults] = useState([]);      
    const [name, setName] = useState("");      
    const [data, setData] = useState(null);      
    const [state, setState] = useState(null);      
    
    useEffect(() => {
        const fetchData = async () => {
            const query = state ? `?state=${state}` : "";

            console.log(query);
            

            apiService.get(API.SCHEDULES.GET.ALL+query)
            .then(res => {                    
                setSchedules(res.data.data)                    
            })
            .catch(err => {
                console.log(err);
            })
        }
        
        fetchData();
    }, [updated, state]);

    const handleClose = (scheduleId) => {
        apiService.put(API.SCHEDULES.PUT.UPDATE+scheduleId)
            .then(res => {                    
                setUpdated(!updated)                    
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Table columns configuration
    const userColumns = [
        { key: 'name', header: 'Name', render: (item) => item._user.name },
        { key: 'email', header: 'Email', render: (item) => item._user.email },
        { key: 'state', header: 'State', render: (item) => <div className={`w-[20px] h-[20px] flex justify-center items-center rounded-full ${item.state === "on"? "bg-green-500": "bg-red-500"}`}></div> },
        { key: 'leaved', header: 'Leaved', render: (item) => `${item.leave? item.leave.split(".")[0]: "In Progress"}` },
        { key: "close", header: "Close", render: (item) => item.state === "on"?<div className='p-2 bg-red-500 text-white cursor-pointer rounded-md w-fit hover:opacity-50 duration-300' onClick={() => handleClose(item._id)}>Close</div>: "Closed" }
    ];

    const router = useRouter()

    // Action handlers
    const handleAddNew = () => {        
        apiService.post(API.SCHEDULES.POST.ADD+data)
            .then(e => {                
                if(e.status === 200) {
                    setUpdated(!updated)
                    setData(null)
                    setResults([])
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
    };

    const handleDelete = (item) => {
        apiService.delete(API.SCHEDULES.DELETE.ONE+item?._id)
            .then(res => {
                setUpdated(!updated)
            })
            .catch(err => {
                toast.error("Error", {
                    description: err?.response?.data?.message || "Error"
                })
            })
    };

    const handleBulkDelete = (ids) => {
        if (confirm(`Are you sure you want to delete ${ids.length} items?`)) {
            setSchedules(schedules.filter(user => !ids.includes(user.id)));
        }
    };

    const handleEdit = (item) => {
        router.push("/admin/schedules/edit/"+item._id)
    };

    const handleView = (item) => {        
        router.push("/admin/schedules/"+item._id)
    };

    useEffect(() => {
        const fetchData = async () => {
            apiService.get(API.USERS.GET.BY_NAME+`?name=${name}`)
            .then(res => {                    
                setResults(res.data.users)                    
            })
            .catch(err => {
                console.log(err);
            })
        }
        
        fetchData();
    }, [name])

    const fields = [
        {
            type: "search",
            required: true,
            name: "user",
            fullWidth: true,
            label: "User",
            placeholder: "Search",
            results: results,
            value: "",
            onSearch: (e) => setName(e.target.value),
            showRender: (e, i) => <div 
                key={i} 
                className={`border-1 border-black rounded-md p-2 w-full text-black cursor-pointer duration-300 ${e._user._id === data? "bg-main text-white": "bg-white hover:bg-[#ddd]"}`}
                onClick={() => setData(e._user._id)}
            >
                {e._user.name} <small>"{e._user.email}"</small>
            </div>,
            validation: ""
        }
    ]

    return (
        <div className="space-y-6">
            <Head title='Schedules list' desc="Welcome back, Admin! Here's an overview of your schedules."/>
            <Form
                fields={fields}
                cancelButton={false}
                onSubmit={handleAddNew}
                title={'Add New Schedule'}
                showBorder={true}
                showHeader={true}
                submitText={"Add"}
            />

            <div className='bg-white w-fit p-2 rounded-[10px] flex gap-1 items-center'>
                <span className='text-black font-bold'>Filter By:</span>
                <select
                        id={"state"}
                        className={`w-[100px] p-3 border 'border-[#725CAD]/30 rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent text-black placeholder:text-black cursor-pointer`}
                        onChange={(e) => setState(e.target.value)}                
                >
                {["all", "on", "off"].map((option, i) => (
                    <option key={i} value={option} className='text-black capitalize' >
                        {option}
                    </option>))}
                </select>
            </div>
            
            <DataTable
                title="Schedules List"
                items={schedules}
                columns={userColumns}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={handleView}
                onBulkDelete={handleBulkDelete}
                added={false}
                selected={false}
                showed={false}
                edited={false}
            />
        </div>
    );
};

export default SchedulesPage;