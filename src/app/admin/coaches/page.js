"use client";

import React, { useEffect, useState } from 'react';
import DataTable from '@/components/blocks/Table';
import { FaCheck } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Head from '@/components/blocks/Head';
import apiService from '@/apis/services';
import API from '@/apis/init';

const CochesPage = () => {
    // Sample data
    const [users, setUsers] = useState([]);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            apiService.get(API.USERS.GET.BY_STATE+`/active?type=coach`)
                .then(res => {                    
                    setUsers(res.data.users)                    
                })
                .catch(err => {
                    console.log(err);
                })
        }

        fetchData();
    }, [deleted])

    // Table columns configuration
    const userColumns = [
        { 
            key: 'picture', 
            header: 'Picture', 
            render: (item) => (
                <img src={"http://localhost:4000/"+item?.picture} className='w-[30px] h-[30px] rounded-full overflow-hidden'/>
            ) 
        },
        { key: 'name', header: 'User Name', render: (item) => item._user.name },
        { key: 'email', header: 'Email', render: (item) => item._user.email },
        { key: 'since', header: 'Since', render: (item) => `${item?.createdAt?.split("T")[0]}` },
    ];

    const router = useRouter()

    // Action handlers
    const handleAddNew = () => {
        router.push("/admin/coaches/add")
    };

    const handleDelete = (item) => {
        const id = item._user._id;

        apiService.delete(API.USERS.DELETE.COACH+id)
            .then(res => {
                setDeleted(!deleted)
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handleBulkDelete = (ids) => {
        if (confirm(`Are you sure you want to delete ${ids.length} items?`)) {
            setUsers(users.filter(user => !ids.includes(user.id)));
        }
    };

    const handleEdit = (item) => {
        alert(`Edit user: ${item.name}\nThis would open an edit form`);
    };

    const handleView = (item) => {
        router.push(`/admin/coaches/${item._user._id}`)
    };

    return (
        <div className="space-y-6">
            <Head title='Coaches list' desc="Welcome back, Admin! Here's an overview of your coches."/>
            
            <DataTable
                title="Coaches List"
                items={users}
                columns={userColumns}
                onAddNew={handleAddNew}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={handleView}
                onBulkDelete={handleBulkDelete}
                selected={false}
                edited={false}
            />
        </div>
    );
};

export default CochesPage;