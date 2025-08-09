"use client"

import React, { useEffect, useState } from 'react';
import Form from '@/components/blocks/Form'; // Your existing form component
import { FaUser, FaEdit, FaDumbbell, FaFile, FaArrowAltCircleDown } from 'react-icons/fa';
import useAuthStore from '@/store/auth.store';
import ProtectedRoute from '@/components/auth/protectedRoute';
import { ROLES } from '@/utils/role';
import Popup from '@/components/ui/Popup';
import { toast } from 'sonner';
import API from '@/apis/init';
import apiService from '@/apis/services';

const CoachPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [images, setImages] = useState([]);
    
    const data = useAuthStore(state => state.data);
    const { logout } = useAuthStore();

    // Initialize userData with default values
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        membership: 'Premium',
        joinDate: '',
        profileImage: '',
        bio: '',
        sections: []
    });

    // Only set userData when data is available
    useEffect(() => {
        if (data?.user) {
            setUserData({
                name: data.user._user?.name || '',
                email: data.user._user?.email || '',
                joinDate: data.user._user?.createdAt?.split("T")[0] || '',
                bio: data.user?.bio || '',
                profileImage: data.user?.picture 
                    ? `http://localhost:4000/${data.user.picture}`
                    : '',
                sections: data?.sections || []
            });
        } 
    }, [data]);

    const handleSubmit = (data) => {
        const lastData = { bio: data.bio, name: data.name, picture: images[0] }

        apiService.put(API.USERS.PUT.PROFILE, lastData)
            .then(res => {
                if(res.status === 200) {
                    toast.success("Success", {
                        description: "Updated profile successfully"
                    })
                    
                    window.location.pathname = "/coach"
                }
            })
            .catch(err => {                
                if(Array.isArray(err?.response?.data?.errors)) {
                    toast.error("Error", {
                        description: err?.response?.data?.errors[0]
                    })
                } else {
                    toast.error("Error", {
                        description: err?.response?.data?.message || "Error"
                    })
                }
            })
    };

    const handleLogout = () => {
        logout()
            .then(res => {
                toast.success("Success", {
                    description: res?.message || "Success"
                });
                window.location.href = "/";
            })
            .catch(err => {
                toast.error("Error", {
                    description: err?.message || err || "Error"
                });
            });
    };

    const profileFields = [
        {
            name: 'name',
            label: 'Full Name',
            type: 'text',
            required: true,
            placeholder: 'Enter your full name'
        },
        {
            name: 'bio',
            label: 'Bio',
            type: 'textarea',
            required: true,
            rows: 3,
            placeholder: 'Tell us about your fitness journey...'
        },
        {
            name: 'picture',
            label: 'Profile Picture',
            type: 'file',
            accept: 'image/*',
            multiple: false
        }
    ];

    const handleFileSubmit = (images) => {
        apiService.postFile(API.UPLOADS.POST.UPLOAD, images)
            .then(res => {
                if(res.status === 201) {
                    toast.success("Success", {
                        description: "Uploaded files successfully"
                    })
                    
                    setImages(res.data.images)
                }
            })
            .catch(err => {                
                if(Array.isArray(err?.response?.data?.errors)) {
                    toast.error("Error", {
                        description: err?.response?.data?.errors[0]
                    })
                } else {
                    toast.error("Error", {
                        description: err?.response?.data?.message || "Error"
                    })
                }
            })
    }

    return (
        <ProtectedRoute allowedRoles={[ROLES.COACH]}>
            <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12 pt-24">
                <h1 className="text-4xl font-bold text-[#0B1D51] mb-2">Your Profile</h1>
                <div className="w-24 h-1 bg-purple mx-auto rounded-full"></div>
            </div>

            {isEditing ? (
                // Edit Form
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple/20">
                <div className="bg-[#0B1D51] p-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                    <FaEdit className="mr-2" /> Edit Profile
                    </h2>
                </div>
                
                <Form
                    title=""
                    initialData={userData}
                    onSubmit={handleSubmit}
                    fields={profileFields}
                    onCancel={() => setIsEditing(false)}
                    submitText="Update"
                    cancelText="Cancel"
                    formWidth="full"
                    showHeader={false}
                    onFileSubmit={handleFileSubmit}
                />
                </div>
            ) : (
                // Profile Display
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple/20">
                    <div className="bg-gradient-to-r from-[#0B1D51] to-purple p-6 text-center">
                        <div className="relative mx-auto w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                        {userData.profileImage ? (
                            <img 
                                src={userData?.profileImage} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full flex items-center justify-center">
                                <FaUser className="text-6xl text-purple" />
                            </div>
                        )}
                        </div>
                        <h2 className="text-2xl font-bold text-white mt-4">{userData.name}</h2>
                        <div className="inline-flex items-center bg-[#FFE3A9] text-[#0B1D51] px-4 py-1 rounded-full mt-2">
                            <FaDumbbell className="mr-2" />
                            <span>{userData.membership} Coach</span>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-purple">EMAIL</h3>
                            <p className="text-lg text-black">{userData.email}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-purple">MEMBER SINCE</h3>
                            <p className="text-lg text-black">{userData.joinDate}</p>
                        </div>
                        </div>
                        
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full mt-8 bg-purple hover:bg-[#5d4a8f] text-white py-3 rounded-full font-bold flex items-center justify-center cursor-pointer"
                        >
                            <FaEdit className="mr-2" /> Edit Profile
                        </button>
                        <button
                            onClick={() => setShowPopup(true)}
                            className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-bold flex items-center justify-center cursor-pointer"
                        >
                            <FaArrowAltCircleDown className="mr-2" /> Logout
                        </button>
                    </div>
                        <Popup
                            show={showPopup}
                            message="Are you sure you want logout?"
                            confirmText="Yes"
                            cancelText="Discard"
                            onConfirm={handleLogout}
                            onCancel={() => setShowPopup(false)}
                        />
                    </div>
                </div>
                
                {/* Right Column - Bio & Goals */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple/20">
                    <div className="">
                        <h3 className="text-xl font-bold text-[#0B1D51] mb-4 flex items-center">
                        <span className="bg-purple w-6 h-6 rounded-full flex items-center justify-center mr-2">
                            <FaUser className="text-white text-xs" />
                        </span>
                        About Me
                        </h3>
                        <p className="text-lg text-black">{userData.bio}</p>
                    </div>
                    </div>
                    
                    {/* Upcoming Sessions */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mt-8 border border-purple/20">
                    <h3 className="text-xl font-bold text-[#0B1D51] mb-6 flex">
                        <span className="bg-purple w-6 h-6 rounded-full flex items-center justify-center mr-2">
                            <FaFile className="text-white text-xs" />
                        </span>
                        My Sections
                    </h3>
                    <div className="space-y-4">
                        {(userData.sections?.length !== 0)?
                        (userData.sections.map((item) => (
                        <div key={item} className="flex justify-between items-center border-b border-purple/20 pb-4">
                            <div>
                            <h4 className="font-bold text-lg text-black">Personal Training Session</h4>
                            <p className="text-purple">With Trainer Sarah</p>
                            </div>
                            <div className="text-right">
                            <p className="font-bold">Tue, Jun {10 + item} 2024</p>
                            <p>5:00 PM - 6:00 PM</p>
                            </div>
                        </div>)))
                        :(<p className='text-black text-lg'>No sections yet</p>)}
                    </div>
                    </div>
                </div>
                </div>
            )}
            </div>
        </ProtectedRoute>
    );
};

export default CoachPage;