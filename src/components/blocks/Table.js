"use client";

import { useState } from 'react';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';

const DataTable = ({ 
    title, 
    items, 
    columns, 
    onAddNew,
    onDelete,
    onEdit,
    onView,
    onBulkDelete,
    paginate,
    edited = true,
    showed = true,
    deleted = true,
    added = true
}) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    
    // Toggle selection for a single item
    const toggleItemSelection = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };
    
    // Toggle select all items
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map(item => item.id));
        }
        setSelectAll(!selectAll);
    };
    
    // Handle bulk delete
    const handleBulkDelete = () => {
        if (selectedItems.length > 0) {
            onBulkDelete(selectedItems);
            setSelectedItems([]);
            setSelectAll(false);
        }
    };
    
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with stats and actions */}
        <div className="p-5 bg-main text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                    <span className="bg-sky rounded-full w-3 h-3 mr-2"></span>
                    <span>Total: {items.length}</span>
                </div>
                {selectedItems.length > 0 && (
                    <div className="flex items-center">
                    <span className="bg-sky rounded-full w-3 h-3 mr-2"></span>
                    <span>Selected: {selectedItems.length}</span>
                    </div>
                )}
                </div>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
                {selectedItems.length > 0 && (
                <button 
                    onClick={handleBulkDelete}
                    className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
                >
                    <FaTrash className="mr-2" />
                    Delete Selected
                </button>
                )}
                {added && <button 
                onClick={onAddNew}
                className="flex items-center px-4 py-2 bg-sky hover:bg-[#5d4a8f] rounded-lg transition"
                >
                <FaPlus className="mr-2" />
                    Add New
                </button>}
            </div>
            </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead>
                <tr className="bg-skin">
                <th className="p-4 w-12">
                    <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 text-main rounded focus:ring-main"
                    />
                </th>
                {columns.map((column) => (
                    <th key={column.key} className="p-4 text-left text-main font-semibold">
                    {column.header}
                    </th>
                ))}
                <th className="p-4 text-right text-main font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.length === 0 ? (
                <tr>
                    <td colSpan={columns.length + 2} className="p-8 text-center text-gray-500">
                    No data available
                    </td>
                </tr>
                ) : (
                items.map((item, id) => (
                    <tr 
                    key={id} 
                    className={`border-b ${selectedItems.includes(item.id) ? 'bg-sky/20' : ''}`}
                    >
                    <td className="p-4">
                        <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleItemSelection(item.id)}
                        className="h-4 w-4 text-main rounded focus:ring-main"
                        />
                    </td>
                    {columns?.map((column, id) => (
                        <td key={`${id}-${column.key}`} className="p-4 text-main">
                            {column.render ? column.render(item) : item[column.key]}
                        </td>
                    ))}
                    {(showed || deleted || edited) && <td className="p-4">
                        <div className="flex justify-end space-x-2">
                        {showed && <button 
                            onClick={() => onView(item)}
                            className="p-2 text-main hover:bg-sky/20 rounded-full cursor-pointer"
                            title="View"
                        >
                            <FaEye />
                        </button>}
                        {edited && <button 
                            onClick={() => onEdit(item)}
                            className="p-2 text-sky hover:bg-sky/20 rounded-full cursor-pointer"
                            title="Edit"
                        >
                            <FaEdit />
                        </button>}
                        {deleted && <button 
                            onClick={() => onDelete(item.id)}
                            className="p-2 text-red-500 hover:bg-red-500/20 rounded-full cursor-pointer"
                            title="Delete"
                        >
                            <FaTrash />
                        </button>}
                        </div>
                    </td>}
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        
        {/* Pagination - Implement as needed */}
        {paginate && <div className="p-4 bg-skin flex justify-between items-center text-main">
            <div>
                Page {paginate.page} of {paginate.pages} pages
            </div>
            <div className="flex space-x-2">
                {paginate.hasPrevPage && <button className="px-3 py-1 bg-main text-white rounded disabled:opacity-50" onClick={paginate.onPrev}>
                    Previous
                </button>}
                {paginate.hasNextPage && <button className="px-3 py-1 bg-main text-white rounded disabled:opacity-50" onClick={paginate.onNext}>
                    Next
                </button>}
            </div>
        </div>}
        </div>
    );
};

export default DataTable;