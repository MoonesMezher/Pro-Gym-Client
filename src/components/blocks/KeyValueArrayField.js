import { useState, useEffect } from "react";

const KeyValueArrayField = ({ field, register, setValue, errors, initialData, isSubmitting }) => {    
    const name = field.name;
    const [items, setItems] = useState([{ key: "", value: "" }]);

    useEffect(() => {
        setItems(initialData)
    }, [initialData])
    

    const addItem = () => {
        const newItems = [...items, { key: "", value: "" }];
        setItems(newItems);
        setValue(name, newItems);
    };

    const removeItem = (index) => {
        if (items.length <= 1) return;
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        setValue(name, newItems);
    };

    const updateItem = (index, key, value) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: value };
        setItems(newItems);
        setValue(name, newItems);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-[#0B1D51] opacity-0">
                {field.label} {field.required && <span className="text-red-500">*</span>}
                </span>
                <button
                type="button"
                onClick={addItem}
                className="text-sm bg-[#725CAD] text-white px-2 py-1 rounded"
                disabled={isSubmitting}
                >
                Add Item
                </button>
            </div>

            <div className="space-y-3">
                {items?.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                    <input
                    type="text"
                    placeholder="Key"
                    value={item.key}
                    onChange={(e) => updateItem(index, "key", e.target.value)}
                    className={`flex-1 p-2 border ${
                        errors[name]?.[index]?.key ? "border-red-500" : "border-[#725CAD]/30"
                    } rounded-lg`}
                    disabled={isSubmitting}
                    />
                    <input
                    type="text"
                    placeholder="Value"
                    value={item.value}
                    onChange={(e) => updateItem(index, "value", e.target.value)}
                    className={`flex-1 p-2 border ${
                        errors[name]?.[index]?.value ? "border-red-500" : "border-[#725CAD]/30"
                    } rounded-lg`}
                    disabled={isSubmitting}
                    />
                    <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    disabled={isSubmitting || items.length <= 1}
                    >
                    ×
                    </button>
                </div>
                ))}
            </div>

            <input
                type="hidden"
                {...register(`${name}`, {
                validate: field.validation?.validate || (field.required ? (v) => v?.length > 0 || `${field.label} is required` : undefined),
                })}
            />

            {errors[name] && (
                <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
            )}
        </div>
    );
};

export default KeyValueArrayField