const SimpleTable = ({ 
    title, 
    items, 
    columns,
    onClear
}) => {
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
                </div>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
                {items.length !== 0 && <button 
                    onClick={onClear}
                    className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-400 rounded-lg transition cursor-pointer"
                >
                    Clear
                </button>}
            </div>
            </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead>
                <tr className="bg-skin">
                {columns.map((column) => (
                    <th key={column.key} className="p-4 text-left text-main font-semibold">
                        {column.header}
                    </th>
                ))}
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
                    className={`border-b`}
                    >
                    {columns?.map((column, id) => (
                        <td key={`${id}-${column.key}`} className="p-4 text-black">
                            {column.render ? column.render(item) : item[column.key]}
                        </td>
                    ))}
    
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default SimpleTable;