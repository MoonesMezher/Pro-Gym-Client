"use client"

import useAuthStore from "@/store/auth.store";
import { useEffect } from "react";

export default function TokenProvider({ children }) {
    const initializeAuth = useAuthStore(state => state.initializeAuth);
    const isInitialized = useAuthStore(state => state.isInitialized);


    useEffect(() => {
        if (!isInitialized) {
            initializeAuth()    
        }
    }, [isInitialized, initializeAuth]);

    return children;
}