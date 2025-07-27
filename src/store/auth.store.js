import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiService from '@/apis/services';
import API from '@/apis/init';

const useAuthStore = create(persist(
    (set, get) => ({
        data: null,
        user: null,
        loading: false,
        error: null,
        isInitialized: false,
        token: null,
        refreshToken: null,

        login: async (credentials) => {
            set({ loading: true, error: null });
            try {
                const response = await apiService.post(API.USERS.POST.LOGIN, credentials);
                const { data, token, role, refreshToken } = response.data;

                set({ 
                    user: role, 
                    loading: false, 
                    data, 
                    isInitialized: true,
                    token,
                    refreshToken
                });

                return role;
            } catch (error) {
                set({ error: error.response?.data || error.message, loading: false });
                throw error;
            }
        },
        
        logout: async () => {
            try {
                await apiService.post(API.USERS.POST.LOGOUT);
                set({ 
                data: null, 
                user: null, 
                token: null,
                refreshToken: null,
                isInitialized: true 
                });
            } catch (error) {
                throw error;
            }
        },
        
        initializeAuth: async () => {
            set({ loading: true });
            try {
                // Corrected token access
                const { token } = get(); // Not get().token
                
                if (!token) {
                    set({ loading: false, isInitialized: true });
                    return;
                }
                
                const response = await apiService.get(API.USERS.GET.ME)
                
                set({ 
                    user: response?.data?.role, 
                    loading: false, 
                    data: response?.data?.data, 
                    isInitialized: true 
                });
                return response?.data?.role;
            } catch (error) {
                set({ 
                    data: null, 
                    user: null, 
                    token: null,
                    refreshToken: null,
                    loading: false, 
                    isInitialized: true 
                });
            }
        },
        
        setToken: (token, refreshToken) => {
            set({ token, refreshToken });
        },
        
        clearAuth: () => {
            set({ 
                data: null, 
                user: null, 
                token: null,
                refreshToken: null,
                isInitialized: true 
            });
        },
        
        clearError: () => set({ error: null })
    }),
    {
        name: 'auth-storage',
        partialize: (state) => ({
            user: state.user,
            token: state.token,
            refreshToken: state.refreshToken,
            data: state.data,
            isInitialized: state.isInitialized
        })
    }
));

export default useAuthStore;