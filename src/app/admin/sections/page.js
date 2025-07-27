"use client";

import React, { useEffect, useState } from 'react';
import DataTable from '@/components/blocks/Table';
import { useRouter } from 'next/navigation';
import Head from '@/components/blocks/Head';
import apiService from '@/apis/services';
import API from '@/apis/init';

const SectionsPage = () => {
    // Sample data
    const [sections, setSesections] = useState([]);  

    useEffect(() => {
        const fetchData = async () => {
            apiService.get(API.SECTIONS.GET.ALL)
                .then(res => {
                    console.log(res.data);
                    
                    setSesections(res.data.sections)                    
                })
                .catch(err => {
                    console.log(err);
                })
        }

        fetchData();
    }, [])

    // Table columns configuration
    const userColumns = [
        { 
            key: 'image', 
            header: 'Image', 
            render: (item) => (
                <img src={"http://localhost:4000/"+item?.images[0]} className='w-[30px] h-[30px] rounded-full overflow-hidden'/>
            ) 
        },
        { key: 'title', header: 'Title', render: (item) => item.title },
        { key: 'rate', header: 'Rate', render: (item) => item.avgRate },
        { key: 'prices', header: 'Prices', render: (item) => item.price.map(e => <div className='flex flex-row gap-1 text-sm'>
            <span>{e.key} -</span>
            <span>{e.value}</span>
        </div>) },
        { key: 'since', header: 'Since', render: (item) => `${item?.createdAt?.split("T")[0]}` },
    ];

    const router = useRouter()

    // Action handlers
    const handleAddNew = () => {
        router.push("/admin/sections/add")
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setSesections(sections.filter(user => user.id !== id));
        }
    };

    const handleBulkDelete = (ids) => {
        if (confirm(`Are you sure you want to delete ${ids.length} items?`)) {
            setSesections(sections.filter(user => !ids.includes(user.id)));
        }
    };

    const handleEdit = (item) => {
        alert(`Edit user: ${item.name}\nThis would open an edit form`);
    };

    const handleView = (item) => {
        alert(`Viewing details for: ${item.name}`);
    };

    return (
        <div className="space-y-6">
            <Head title='Sections list' desc="Welcome back, Admin! Here's an overview of your sections."/>
            
            <DataTable
                title="Sections List"
                items={sections}
                columns={userColumns}
                onAddNew={handleAddNew}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={handleView}
                onBulkDelete={handleBulkDelete}
            />
        </div>
    );
};

export default SectionsPage;