"use client"

import { useState, useCallback } from 'react';
import apiService from '../apis/services';

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const request = useCallback(async (method, ...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService[method](...args);
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data || { message: 'An error occurred' });
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        data,
        get: useCallback((...args) => request('get', ...args), [request]),
        post: useCallback((...args) => request('post', ...args), [request]),
        put: useCallback((...args) => request('put', ...args), [request]),
        delete: useCallback((...args) => request('delete', ...args), [request]),
    };
};

export default useApi;