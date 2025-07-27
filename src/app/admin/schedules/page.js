"use client";

import React, { useState } from 'react';
import DataTable from '@/components/blocks/Table';
import { FaCheck } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import Head from '@/components/blocks/Head';

const SchedulesPage = () => {
    // Sample data
    const [products, setProducts] = useState([
        { id: 1, name: 'Protein Powder', category: 'Supplements', stock: 42, price: 49.99, status: 'In Stock' },
        { id: 2, name: 'Weightlifting Gloves', category: 'Accessories', stock: 15, price: 24.99, status: 'Low Stock' },
        { id: 3, name: 'Resistance Bands', category: 'Equipment', stock: 0, price: 34.99, status: 'Out of Stock' },
        { id: 4, name: 'Yoga Mat', category: 'Equipment', stock: 28, price: 29.99, status: 'In Stock' },
        { id: 5, name: 'Water Bottle', category: 'Accessories', stock: 67, price: 19.99, status: 'In Stock' },
    ]);

    // Table columns configuration
    const productColumns = [
        { key: 'name', header: 'Product Name' },
        { key: 'category', header: 'Category' },
        { key: 'price', header: 'Price', render: (item) => `$${item.price.toFixed(2)}` },
        { 
        key: 'stock', 
        header: 'Stock', 
        render: (item) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.stock === 0 ? 'bg-red-100 text-red-800' : 
            item.stock < 20 ? 'bg-yellow-100 text-yellow-800' : 
            'bg-green-100 text-green-800'
            }`}>
            {item.stock} {item.stock === 0 ? 'Out of Stock' : item.stock < 20 ? 'Low Stock' : 'In Stock'}
            </span>
        ) 
        },
        { 
        key: 'status', 
        header: 'Status',
        render: (item) => (
            <span className={`inline-flex items-center ${
            item.status === 'In Stock' ? 'text-green-600' : 
            item.status === 'Low Stock' ? 'text-yellow-600' : 
            'text-red-600'
            }`}>
            {item.status === 'In Stock' ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
            {item.status}
            </span>
        )
        },
    ];

    // Action handlers
    const handleAddNew = () => {
        alert('Add new product functionality would open a form here');
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
        setProducts(products.filter(product => product.id !== id));
        }
    };

    const handleBulkDelete = (ids) => {
        if (confirm(`Are you sure you want to delete ${ids.length} items?`)) {
            setProducts(products.filter(product => !ids.includes(product.id)));
        }
    };

    const handleEdit = (item) => {
        alert(`Edit product: ${item.name}\nThis would open an edit form`);
    };

    const handleView = (item) => {
        alert(`Viewing details for: ${item.name}`);
    };

    return (
        <div className="space-y-6">
        <Head />
        
        <DataTable
            title="Product Inventory"
            items={products}
            columns={productColumns}
            onAddNew={handleAddNew}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onView={handleView}
            onBulkDelete={handleBulkDelete}
        />
        </div>
    );
};

export default SchedulesPage;