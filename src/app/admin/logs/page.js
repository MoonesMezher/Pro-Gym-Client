"use client";

import React, { useState, useEffect } from 'react';
import Head from '@/components/blocks/Head';
import apiService from '@/apis/services';
import API from '@/apis/init';
import SimpleTable from '@/components/blocks/SimpleTable';

const LogsPage = () => {
    // Sample data
    const [logs, setLogs] = useState([]);
    const [clear, setClear] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            apiService.get(API.LOGS.GET.ALL)
                .then(res => {                                                            
                    setLogs(res.data.data.map(e => (e? JSON.parse(e): e)).filter(e => e.message))                    
                })
                .catch(err => {
                    console.log(err);
                })
        }

        fetchData();
    }, [clear]);

    const handleClear = () => {
        apiService.delete(API.LOGS.DELETE.CLEAR)
            .then(res => {                                                            
                setClear(!clear);
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Table columns configuration
    const logColumns = [
        { key: 'level', header: 'Level' },
        { key: 'message', header: 'Message' },
    ];

    return (
        <div className="space-y-6">
        <Head 
            title='Logs list' 
            desc="Welcome back, Admin! Here's an overview of system logs."
        />
        
        <SimpleTable
            title="Logs List"
            items={logs}
            columns={logColumns}            
            onClear={handleClear}
        />
        </div>
    );
};

export default LogsPage;