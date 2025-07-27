'use client';

import { Toaster, toast as sonnerToast } from 'sonner';

export const toast = sonnerToast;

export default function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            richColors
            expand={true}
            closeButton
            toastOptions={{
                classNames: {
                    toast: '!border !border-gray-200 !shadow-lg',
                    title: '!font-medium',
                },
            }}
        />
    );
}