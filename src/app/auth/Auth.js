"use client";

import useAuthStore from '@/store/auth.store';
import { useEffect, useState } from 'react';
import { FullPageLoader } from '@/components/ui/Loading';
import { useRouter } from 'next/navigation';

export default function Auth({ children }) {
    const router = useRouter();
    const user = useAuthStore(state => state.user);
    const loading = useAuthStore(state => state.loading);
    const isInitialized = useAuthStore(state => state.isInitialized);
    const initializeAuth = useAuthStore(state => state.initializeAuth);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    // Initialize auth on mount
    useEffect(() => {
        if (!isInitialized) {
            initializeAuth();
        }
    }, [isInitialized, initializeAuth]);

    // Determine if we need to redirect
    useEffect(() => {
        if (isInitialized && !loading) {
            setShouldRedirect(user);
        }
    }, [user, loading, isInitialized]);

    // Perform redirection
    useEffect(() => {
        if (shouldRedirect) {
            router.replace("/");
        }
    }, [shouldRedirect, router]);

    // Show loader while initializing or loading
    if (loading || !isInitialized) {
        return <FullPageLoader />;
    }

    // Render children only if user exists
    if (!user) {
        return children;
    }

    // Show loader during redirection
    return <FullPageLoader />;
}