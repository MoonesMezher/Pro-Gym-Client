import { Button } from '@headlessui/react';
import Link from 'next/link';

export default function Unauthorized() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-main p-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <div className="mx-auto bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
            You don't have permission to access this page with your current role.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="destructive">
                    <Link href="/auth/login" className="text-black bg-skin rounded-md px-5 py-3">
                        Go to Login page
                    </Link>
                </Button>
            </div>
        </div>
        </div>
    );
}