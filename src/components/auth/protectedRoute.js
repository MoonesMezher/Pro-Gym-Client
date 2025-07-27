"use client";

import useAuthStore from '@/store/auth.store';
import { useEffect } from 'react';
import { FullPageLoader } from '../ui/Loading';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ allowedRoles, children }) {
    const router = useRouter();
    const user = useAuthStore(state => state.user);
    const loading = useAuthStore(state => state.loading);
    const isInitialized = useAuthStore(state => state.isInitialized);

    // Handle redirection after initialization
    useEffect(() => {        
        if (isInitialized && !loading) {            
            if (user === null) {                
                router.push('/');
            } else if (user === undefined) {
                router.push('/auth/login');
            } else if (allowedRoles && !allowedRoles.includes(user)) {
                router.push('/unauthorized');
            }
        }
    }, [user, loading, isInitialized, allowedRoles, router]);

    // Show loader while initializing or loading
    if (loading || !isInitialized) {        
        return <FullPageLoader />;
    }

    // Render children only if user exists and role is allowed
    if (user && (!allowedRoles || allowedRoles.includes(user))) {        
        return children;
    }

    // Show loader during redirection
    return <FullPageLoader />;
}