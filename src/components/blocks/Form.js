"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSave, FaTimes, FaUpload } from 'react-icons/fa';

const Form = ({
    title,
    initialData = {},
    onSubmit,
    fields,
    cancelButton = true,
    onCancel,
    submitText = "Submit",
    cancelText = "Cancel",
    formLayout = "vertical",
    submitButtonIcon = <FaSave />,
    cancelButtonIcon = <FaTimes />,
    formWidth = "full",
    buttonAlignment = "right",
    showHeader = true,
    showBorder = true
}) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: initialData
    });
    
    const [filePreviews, setFilePreviews] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Handle file input changes
    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Set value for react-hook-form
        setValue(fieldName, file);
        
        // Create preview for images
        if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setFilePreviews(prev => ({ ...prev, [fieldName]: e.target.result }));
        };
        reader.readAsDataURL(file);
        }
    };
    
    // Handle form submission
    const onSubmitHandler = async (data) => {
        setIsSubmitting(true);
        try {
            await onSubmit(data);
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Reset form
    const handleCancel = () => {
        reset();
        if (onCancel) onCancel();
    };

    return (
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${showBorder ? 'border border-[#725CAD]/20' : ''} ${formWidth === 'full' ? 'w-full' : 'max-w-3xl mx-auto'}`}>
        {showHeader && (
            <div className="bg-[#0B1D51] p-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmitHandler)} className="p-6">
            <div className={`grid gap-6 ${formLayout === 'vertical' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {fields.map((field) => (
                <div 
                key={field.name} 
                className={`${field.fullWidth ? 'md:col-span-2' : ''}`}
                >
                {field.type !== 'hidden' && (
                    <label htmlFor={field.name} className="block text-sm font-medium text-[#0B1D51] mb-2">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                )}
                
                {/* Text Input */}
                {field.type === 'text' && (
                    <input
                    id={field.name}
                    type="text"
                    className={`w-full p-3 border ${errors[field.name] ? 'border-red-500' : 'border-[#725CAD]/30'} rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent`}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    {...register(field.name, field.validation)}
                    disabled={isSubmitting}
                    />
                )}
                
                {/* Textarea */}
                {field.type === 'textarea' && (
                    <textarea
                    id={field.name}
                    className={`w-full p-3 border ${errors[field.name] ? 'border-red-500' : 'border-[#725CAD]/30'} rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent text-black`}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    rows={field.rows || 4}
                    {...register(field.name, field.validation)}
                    disabled={isSubmitting}
                    />
                )}
                
                {/* Select */}
                {field.type === 'select' && (
                    <select
                    id={field.name}
                    className={`w-full p-3 border ${errors[field.name] ? 'border-red-500' : 'border-[#725CAD]/30'} rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent`}
                    {...register(field.name, field.validation)}
                    disabled={isSubmitting}
                    >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                )}
                
                {/* File Upload */}
                {field.type === 'file' && (
                    <div>
                    <div className="flex items-center justify-center w-full">
                        <label
                        htmlFor={field.name}
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#725CAD] border-dashed rounded-lg cursor-pointer bg-[#FFE3A9]/20 hover:bg-[#FFE3A9]/40"
                        >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FaUpload className="w-8 h-8 mb-4 text-[#725CAD]" />
                            <p className="mb-2 text-sm text-[#0B1D51]">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-[#725CAD]">
                            {field.accept || 'Any file type'} (Max: {field.maxSize || '5MB'})
                            </p>
                        </div>
                        <input
                            id={field.name}
                            type="file"
                            className="hidden"
                            accept={field.accept}
                            onChange={(e) => handleFileChange(e, field.name)}
                            disabled={isSubmitting}
                        />
                        </label>
                    </div>
                    
                    {/* File preview */}
                    {filePreviews[field.name] && (
                        <div className="mt-4">
                        <p className="text-sm font-medium text-[#0B1D51] mb-2">Preview:</p>
                        {field.accept?.startsWith('image/') ? (
                            <img 
                            src={filePreviews[field.name]} 
                            alt="Preview" 
                            className="max-w-xs max-h-40 rounded-lg border border-[#725CAD]/20"
                            />
                        ) : (
                            <div className="p-3 bg-[#FFE3A9]/20 rounded-lg border border-[#725CAD]/20">
                            File selected
                            </div>
                        )}
                        </div>
                    )}
                    
                    {/* Existing file */}
                    {initialData[field.name] && !filePreviews[field.name] && (
                        <div className="mt-4">
                        <p className="text-sm font-medium text-[#0B1D51] mb-2">Current file:</p>
                        <div className="p-3 bg-[#FFE3A9]/20 rounded-lg border border-[#725CAD]/20">
                            {initialData[field.name]}
                        </div>
                        </div>
                    )}
                    </div>
                )}
                
                {/* Checkbox */}
                {field.type === 'checkbox' && (
                    <div className="flex items-center">
                    <input
                        id={field.name}
                        type="checkbox"
                        className="h-4 w-4 text-[#725CAD] rounded focus:ring-[#725CAD]"
                        {...register(field.name)}
                        disabled={isSubmitting}
                    />
                    <label htmlFor={field.name} className="ml-2 block text-sm text-[#0B1D51]">
                        {field.label}
                    </label>
                    </div>
                )}
                
                {/* Error message */}
                {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-500">
                    {errors[field.name].message}
                    </p>
                )}
                
                {/* Field description */}
                {field.description && (
                    <p className="mt-1 text-sm text-[#725CAD]">
                    {field.description}
                    </p>
                )}
                </div>
            ))}
            </div>
            
            {/* Form buttons */}
            <div className={`mt-8 flex ${buttonAlignment === 'center' ? 'justify-center' : buttonAlignment === 'left' ? 'justify-start' : 'justify-end'} gap-4`}>
            {cancelButton && (
                <button
                type="button"
                onClick={handleCancel}
                className="flex items-center px-6 py-3 bg-gray-200 text-[#0B1D51] hover:bg-gray-300 rounded-lg transition"
                disabled={isSubmitting}
                >
                {cancelButtonIcon && <span className="mr-2">{cancelButtonIcon}</span>}
                {cancelText}
                </button>
            )}
            
            <button
                type="submit"
                className="flex items-center px-6 py-3 bg-[#725CAD] hover:bg-[#5d4a8f] text-white rounded-lg transition"
                disabled={isSubmitting}
            >
                {submitButtonIcon && <span className="mr-2">{submitButtonIcon}</span>}
                {isSubmitting ? 'Submitting...' : submitText}
            </button>
            </div>
        </form>
        </div>
    );
};

export default Form;