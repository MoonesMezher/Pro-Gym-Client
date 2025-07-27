"use client";

import { toast } from '@/providers/ToastProvider';
import useAuthStore from '@/store/auth.store';
import getRedirect from '@/utils/redirect';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';

const LoginForm = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuthStore()
        
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            login(data)
                .then(e => {
                    const path = getRedirect(e);

                    // window.location.href = path;
                });
        } catch (err) {            
            if(Array.isArray(err?.response?.data?.errors)) {
                toast.error("Error", {
                    description: err?.response?.data?.errors[0]
                })
            } else {
                toast.error("Error", {
                    description: err?.response?.data?.message || "Error"
                })
            }
        } finally {
            setIsSubmitting(false);
        }            
    }

    return (
        <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#725CAD]/20">
            <div className="bg-[#0B1D51] p-6">
            <h2 className="text-2xl font-bold text-white text-center">Login</h2>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="space-y-6">
                {/* Email Field */}
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0B1D51] mb-2">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    id="email"
                    type="email"
                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-[#725CAD]/30'} rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent`}
                    placeholder="Enter your email"
                    {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                    }
                    })}
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                    </p>
                )}
                </div>
                
                {/* Password Field */}
                <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#0B1D51] mb-2">
                    Password <span className="text-red-500">*</span>
                </label>
                <input
                    id="password"
                    type="password"
                    className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-[#725CAD]/30'} rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent`}
                    placeholder="Enter your password"
                    {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                    }
                    })}
                    disabled={isSubmitting}
                />
                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                    </p>
                )}
                </div>
                
                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-[#725CAD] rounded focus:ring-[#725CAD]"
                    {...register('remember')}
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-[#0B1D51]">
                    Remember me
                    </label>
                </div>
                <a href="#" className="text-sm text-[#725CAD] hover:underline">
                    Forgot password?
                </a>
                </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
                <button
                type="submit"
                className="flex items-center px-6 py-3 bg-[#725CAD] hover:bg-[#5d4a8f] text-white rounded-lg transition w-full justify-center"
                disabled={isSubmitting}
                >
                <FaSignInAlt className="mr-2" />
                {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </div>
            
            {/* Sign Up Link */}
            <div className="mt-4 text-center">
                <p className="text-sm text-[#0B1D51]">
                Don't have an account?{' '}
                <a href="/auth/signup" className="text-[#725CAD] font-medium hover:underline">
                    Sign up
                </a>
                </p>
            </div>
            </form>
        </div>
        </div>
    );
};

export default LoginForm;