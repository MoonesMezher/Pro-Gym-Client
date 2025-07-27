import { Button } from '@headlessui/react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br bg-main p-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-9xl font-bold text-sky mb-4">404</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h1>
            <p className="text-gray-600 mb-8">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="space-y-4">
                <Button className="w-full">
                    <Link href="/" className='text-black bg-skin px-5 py-3 rounded-md'>
                        Go to Homepage
                    </Link>
                </Button>
            </div>
        </div>
        </div>
    );
}