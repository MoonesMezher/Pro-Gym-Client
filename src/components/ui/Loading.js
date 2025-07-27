'use client';

import { cn } from '@/utils/cn';

// Spinner Variant
export function Spinner({ size = 'md', color = 'primary' }) {
    const sizeClasses = {
        xs: 'h-4 w-4 border-2',
        sm: 'h-6 w-6 border-2',
        md: 'h-8 w-8 border-[3px]',
        lg: 'h-10 w-10 border-4',
        xl: 'h-12 w-12 border-4'
    };

    const colorClasses = {
        primary: 'border-t-main border-b-main',
        secondary: 'border-t-gray-600 border-b-gray-600',
        success: 'border-t-green-500 border-b-green-500',
        danger: 'border-t-purple border-b-purple',
        warning: 'border-t-skin border-b-skin'
    };

    return (
        <div className={cn(
            'animate-spin rounded-full border-transparent',
            sizeClasses[size],
            colorClasses[color]
        )} />
    );
}

// Dots Variant
export function DotsLoader({ size = 'md', color = 'primary' }) {
    const sizeClasses = {
        xs: 'h-1.5 w-1.5',
        sm: 'h-2 w-2',
        md: 'h-2.5 w-2.5',
        lg: 'h-3 w-3',
        xl: 'h-4 w-4'
    };

    const colorClasses = {
        primary: 'bg-main',
        secondary: 'bg-gray-600',
        success: 'bg-green-500',
        danger: 'bg-purple',
        warning: 'bg-skin'
    };

    return (
        <div className="flex items-center space-x-1">
            {[0, 1, 2].map((i) => (
                <div 
                    key={i}
                    className={cn(
                        'rounded-full animate-bounce',
                        sizeClasses[size],
                        colorClasses[color]
                    )}
                    style={{ animationDelay: `${i * 0.1}s` }}
                />
            ))}
        </div>
    );
}

// Full Page Loading
export function FullPageLoader({ variant = 'spinner' }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="flex flex-col items-center gap-4">
            {variant === 'spinner' ? (
                <Spinner size="lg" />
            ) : (
                <DotsLoader size="lg" />
            )}
            <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
        </div>
    );
}