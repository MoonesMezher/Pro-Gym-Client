"use client";

import { useState } from 'react';
import { FaUserPlus, FaEdit, FaTrash, FaSignOutAlt, FaLock, FaBell, FaGlobe, FaSave } from 'react-icons/fa';

const SettingsPage = () => {
  // Supervisor management state
    const [supervisors, setSupervisors] = useState([
        { id: 1, name: 'Alex Johnson', email: 'alex@progym.com', role: 'Manager', status: 'Active' },
        { id: 2, name: 'Sarah Williams', email: 'sarah@progym.com', role: 'Supervisor', status: 'Active' },
        { id: 3, name: 'Michael Chen', email: 'michael@progym.com', role: 'Trainer', status: 'Inactive' },
    ]);
    
    // Form state
    const [newSupervisor, setNewSupervisor] = useState({ name: '', email: '', role: 'Supervisor', status: 'Active' });
    const [notificationPrefs, setNotificationPrefs] = useState({
        email: true,
        sms: false,
        push: true
    });
    const [securitySettings, setSecuritySettings] = useState({
        twoFactor: true,
        autoLogout: 30
    });
    const [generalSettings, setGeneralSettings] = useState({
        language: 'English',
        timezone: 'GMT+04:00'
    });

    // Add new supervisor
    const handleAddSupervisor = () => {
        if (newSupervisor.name && newSupervisor.email) {
        const newSupervisorWithId = {
            ...newSupervisor,
            id: supervisors.length + 1
        };
        setSupervisors([...supervisors, newSupervisorWithId]);
        setNewSupervisor({ name: '', email: '', role: 'Supervisor', status: 'Active' });
        }
    };

    // Delete supervisor
    const handleDeleteSupervisor = (id) => {
        setSupervisors(supervisors.filter(supervisor => supervisor.id !== id));
    };

    // Toggle supervisor status
    const toggleStatus = (id) => {
        setSupervisors(supervisors.map(supervisor => 
        supervisor.id === id 
            ? { 
                ...supervisor, 
                status: supervisor.status === 'Active' ? 'Inactive' : 'Active' 
            } 
            : supervisor
        ));
    };

    // Logout function
    const handleLogout = () => {
        alert('Logging out...');
        // In a real app, you would redirect to logout or clear session
    };

    return (
        <div className="min-h-screen bg-[#ddd] p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-3xl font-bold text-[#0B1D51]">Settings</h1>
            <p className="text-[#725CAD] mt-2">Manage your account and system preferences</p>
            </div>

            {/* Main Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Supervisor Management */}
            <div className="lg:col-span-2 space-y-6">
                {/* Add New Supervisor */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[#0B1D51]">Add New Supervisor</h2>
                    <div className="bg-[#8CCDEB] p-2 rounded-lg">
                    <FaUserPlus className="text-[#0B1D51]" />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-[#0B1D51] mb-1">Full Name</label>
                    <input
                        type="text"
                        value={newSupervisor.name}
                        onChange={(e) => setNewSupervisor({...newSupervisor, name: e.target.value})}
                        className="w-full p-3 border border-[#725CAD]/30 rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent"
                        placeholder="Enter full name"
                    />
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-[#0B1D51] mb-1">Email Address</label>
                    <input
                        type="email"
                        value={newSupervisor.email}
                        onChange={(e) => setNewSupervisor({...newSupervisor, email: e.target.value})}
                        className="w-full p-3 border border-[#725CAD]/30 rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent"
                        placeholder="Enter email address"
                    />
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-[#0B1D51] mb-1">Role</label>
                    <select
                        value={newSupervisor.role}
                        onChange={(e) => setNewSupervisor({...newSupervisor, role: e.target.value})}
                        className="w-full p-3 border border-[#725CAD]/30 rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent"
                    >
                        <option value="Supervisor">Supervisor</option>
                        <option value="Manager">Manager</option>
                        <option value="Trainer">Trainer</option>
                        <option value="Support">Support</option>
                    </select>
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-[#0B1D51] mb-1">Status</label>
                    <select
                        value={newSupervisor.status}
                        onChange={(e) => setNewSupervisor({...newSupervisor, status: e.target.value})}
                        className="w-full p-3 border border-[#725CAD]/30 rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    </div>
                </div>
                
                <button
                    onClick={handleAddSupervisor}
                    className="mt-4 flex items-center justify-center w-full md:w-auto px-6 py-3 bg-[#725CAD] hover:bg-[#5d4a8f] text-white rounded-lg transition duration-300"
                >
                    <FaUserPlus className="mr-2" />
                    Add Supervisor
                </button>
                </div>
                
                {/* Supervisors List */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 bg-[#0B1D51] text-white">
                    <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Supervisors</h2>
                    <div className="bg-[#725CAD] p-2 rounded-lg">
                        <span className="text-white">{supervisors.length} Supervisors</span>
                    </div>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                    <thead>
                        <tr className="bg-[#FFE3A9]">
                        <th className="p-4 text-left text-[#0B1D51] font-semibold">Name</th>
                        <th className="p-4 text-left text-[#0B1D51] font-semibold">Email</th>
                        <th className="p-4 text-left text-[#0B1D51] font-semibold">Role</th>
                        <th className="p-4 text-left text-[#0B1D51] font-semibold">Status</th>
                        <th className="p-4 text-right text-[#0B1D51] font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supervisors.map((supervisor) => (
                        <tr key={supervisor.id} className="border-b">
                            <td className="p-4 font-medium">{supervisor.name}</td>
                            <td className="p-4 text-[#725CAD]">{supervisor.email}</td>
                            <td className="p-4">{supervisor.role}</td>
                            <td className="p-4">
                            <span 
                                onClick={() => toggleStatus(supervisor.id)}
                                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                                supervisor.status === 'Active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}
                            >
                                {supervisor.status}
                            </span>
                            </td>
                            <td className="p-4">
                            <div className="flex justify-end space-x-2">
                                <button className="p-2 text-[#725CAD] hover:bg-[#725CAD]/20 rounded-full">
                                <FaEdit />
                                </button>
                                <button 
                                onClick={() => handleDeleteSupervisor(supervisor.id)}
                                className="p-2 text-red-500 hover:bg-red-500/20 rounded-full"
                                >
                                <FaTrash />
                                </button>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                
                {supervisors.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                    No supervisors found. Add a new supervisor to get started.
                    </div>
                )}
                </div>
            </div>
            
            {/* Right Column - Other Settings */}
            <div className="space-y-6">
                {/* Security Settings */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[#0B1D51]">Security Settings</h2>
                    <div className="bg-[#8CCDEB] p-2 rounded-lg">
                    <FaLock className="text-[#0B1D51]" />
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-[#0B1D51]">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                        type="checkbox" 
                        checked={securitySettings.twoFactor}
                        onChange={() => setSecuritySettings({...securitySettings, twoFactor: !securitySettings.twoFactor})}
                        className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#725CAD]"></div>
                    </label>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                    <h3 className="font-medium text-[#0B1D51] mb-2">Auto Logout</h3>
                    <p className="text-sm text-gray-500 mb-3">Set time for automatic logout</p>
                    <div className="flex items-center space-x-3">
                        {[15, 30, 60].map((time) => (
                        <button
                            key={time}
                            onClick={() => setSecuritySettings({...securitySettings, autoLogout: time})}
                            className={`px-4 py-2 rounded-lg ${
                            securitySettings.autoLogout === time
                                ? 'bg-[#725CAD] text-white'
                                : 'bg-[#FFE3A9] text-[#0B1D51]'
                            }`}
                        >
                            {time} min
                        </button>
                        ))}
                    </div>
                    </div>
                    
                    <button className="mt-4 w-full flex items-center justify-center px-4 py-3 bg-[#0B1D51] hover:bg-[#0a1640] text-white rounded-lg transition">
                    <FaSave className="mr-2" />
                    Save Security Settings
                    </button>
                </div>
                </div>
                
                {/* Notification Settings */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[#0B1D51]">Notification Preferences</h2>
                    <div className="bg-[#8CCDEB] p-2 rounded-lg">
                    <FaBell className="text-[#0B1D51]" />
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-[#0B1D51]">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                        type="checkbox" 
                        checked={notificationPrefs.email}
                        onChange={() => setNotificationPrefs({...notificationPrefs, email: !notificationPrefs.email})}
                        className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#725CAD]"></div>
                    </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-[#0B1D51]">SMS Notifications</h3>
                        <p className="text-sm text-gray-500">Receive updates via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                        type="checkbox" 
                        checked={notificationPrefs.sms}
                        onChange={() => setNotificationPrefs({...notificationPrefs, sms: !notificationPrefs.sms})}
                        className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#725CAD]"></div>
                    </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-[#0B1D51]">Push Notifications</h3>
                        <p className="text-sm text-gray-500">Receive app notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                        type="checkbox" 
                        checked={notificationPrefs.push}
                        onChange={() => setNotificationPrefs({...notificationPrefs, push: !notificationPrefs.push})}
                        className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#725CAD]"></div>
                    </label>
                    </div>
                    
                    <button className="mt-4 w-full flex items-center justify-center px-4 py-3 bg-[#0B1D51] hover:bg-[#0a1640] text-white rounded-lg transition">
                    <FaSave className="mr-2" />
                    Save Notification Settings
                    </button>
                </div>
                </div>
                
                {/* General Settings */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[#0B1D51]">General Settings</h2>
                    <div className="bg-[#8CCDEB] p-2 rounded-lg">
                    <FaGlobe className="text-[#0B1D51]" />
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-[#0B1D51] mb-1">Language</label>
                    <select
                        value={generalSettings.language}
                        onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
                        className="w-full p-3 border border-[#725CAD]/30 rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent"
                    >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="Arabic">Arabic</option>
                    </select>
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-[#0B1D51] mb-1">Timezone</label>
                    <select
                        value={generalSettings.timezone}
                        onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                        className="w-full p-3 border border-[#725CAD]/30 rounded-lg focus:ring-2 focus:ring-[#725CAD] focus:border-transparent"
                    >
                        <option value="GMT+04:00">(GMT+04:00) Dubai</option>
                        <option value="GMT+03:00">(GMT+03:00) Moscow</option>
                        <option value="GMT+01:00">(GMT+01:00) London</option>
                        <option value="GMT-05:00">(GMT-05:00) New York</option>
                    </select>
                    </div>
                    
                    <button className="mt-4 w-full flex items-center justify-center px-4 py-3 bg-[#0B1D51] hover:bg-[#0a1640] text-white rounded-lg transition">
                    <FaSave className="mr-2" />
                    Save General Settings
                    </button>
                </div>
                </div>
                
                {/* Logout Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[#0B1D51]">Account</h2>
                    <div className="bg-[#8CCDEB] p-2 rounded-lg">
                    <FaLock className="text-[#0B1D51]" />
                    </div>
                </div>
                
                <div className="space-y-4">
                    <button className="w-full flex items-center justify-center px-4 py-3 bg-[#FFE3A9] hover:bg-[#e6cc98] text-[#0B1D51] rounded-lg transition">
                    Change Password
                    </button>
                    
                    <button className="w-full flex items-center justify-center px-4 py-3 bg-[#725CAD] hover:bg-[#5d4a8f] text-white rounded-lg transition">
                    Update Profile
                    </button>
                    
                    <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition mt-6"
                    >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default SettingsPage;