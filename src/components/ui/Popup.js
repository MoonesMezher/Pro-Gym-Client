"use client"

import { useState, useEffect } from 'react';

const Popup = ({
    show = false,
    message = "Are you sure?",
    confirmText = "Yes",
    cancelText = "No",
    onConfirm,
    onCancel,
    showCloseButton = true
}) => {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
    }, [show]);

    const handleConfirm = () => {
        onConfirm && onConfirm();
        setIsVisible(false);
    };

    const handleCancel = () => {
        onCancel && onCancel();
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 w-full h-full">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100 popup-shadow border-2">
                <div className="p-6">
                {showCloseButton && (
                    <button 
                    onClick={handleCancel}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
                    >
                        &times;
                    </button>
                )}
                <div className="text-center py-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{message}</h3>
                    <div className="flex justify-center space-x-4 mt-6">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-6 py-2 bg-purple text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 cursor-pointer"
                    >
                        {confirmText}
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;