"use client";

import API from '@/apis/init';
import apiService from '@/apis/services';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserPlus } from 'react-icons/fa';
import { toast } from 'sonner';

const SignupForm = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        watch
    } = useForm();
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const password = watch("password");

    
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        apiService.post(API.USERS.POST.SIGNUP, data)
            .then(e => {
                window.location = "/auth/login"
            })
            .catch(err => {
                if(Array.isArray(err.response.data.errors)) {
                    toast.error("Error", {
                        description: err.response.data.errors[0]
                    })
                } else {
                    toast.error("Error", {
                        description: err.response.data.message || "Error"
                    })
                }
            })
            .finally(_ => {
                setIsSubmitting(false);
            })
    };

    return (
        <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#725CAD]/20">
            <div className="bg-[#0B1D51] p-6">
            <h2 className="text-2xl font-bold text-white text-center">Create Account</h2>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="space-y-6">
                {/* Name Field */}
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#0B1D51] mb-2">
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-[#725CAD]/30'} rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent`}
                    placeholder="Enter your full name"
                    {...register('name', { 
                    required: 'Name is required',
                    minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                    }
                    })}
                    disabled={isSubmitting}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                    </p>
                )}
                </div>
                
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
                    placeholder="Create a password"
                    {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                    },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                        message: 'Must include uppercase, lowercase, and number'
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
                
                {/* Confirm Password Field */}
                <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#0B1D51] mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-[#725CAD]/30'} rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent`}
                    placeholder="Confirm your password"
                    {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => 
                        value === password || 'Passwords do not match'
                    })}
                    disabled={isSubmitting}
                />
                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                    </p>
                )}
                </div>
                
                {/* Terms Agreement */}
                <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-[#725CAD] rounded focus:ring-[#725CAD]"
                    {...register('terms', { 
                        required: 'You must accept the terms to continue'
                    })}
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-[#0B1D51]">
                    I agree to the <a href="/terms" className="text-[#725CAD] font-medium hover:underline">Terms of Service</a> and <a href="/policy" className="text-[#725CAD] font-medium hover:underline">Privacy Policy</a>
                    </label>
                    {errors.terms && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.terms.message}
                    </p>
                    )}
                </div>
                </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
                <button
                type="submit"
                className="flex items-center px-6 py-3 bg-[#725CAD] hover:bg-[#5d4a8f] text-white rounded-lg transition w-full justify-center"
                disabled={isSubmitting}
                >
                <FaUserPlus className="mr-2" />
                {isSubmitting ? 'Creating account...' : 'Sign Up'}
                </button>
            </div>
            
            {/* Login Link */}
            <div className="mt-4 text-center">
                <p className="text-sm text-[#0B1D51]">
                Already have an account?{' '}
                <a href="/auth/login" className="text-[#725CAD] font-medium hover:underline">
                    Log in
                </a>
                </p>
            </div>
            </form>
        </div>
        </div>
    );
};

export default SignupForm;