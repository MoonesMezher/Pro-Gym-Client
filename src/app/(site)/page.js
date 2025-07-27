"use client"

import API from '@/apis/init';
import apiService from '@/apis/services';
import AboutUs from '@/components/blocks/Aboutus';
import Classes from '@/components/blocks/Classes';
import CTA from '@/components/blocks/CTA';
import Features from '@/components/blocks/Features';
import Hero from '@/components/blocks/Hero';
import MembershipPlans from '@/components/blocks/MembershipPlans';
import Stats from '@/components/blocks/Stats';
import Testimonials from '@/components/blocks/Testimonials';
import { FullPageLoader } from '@/components/ui/Loading';
import useAuthStore from '@/store/auth.store';
import React, { useEffect, useState } from 'react';

const GymLandingPage = () => {
    const user = useAuthStore(state => state.user);

    const [get, setGet] = useState({
        data: [],
        loading: true,
        error: null
    });

    useEffect(() => {
      const fetchData = async () => {
          apiService.get(API.HOME.GET.ALL)
              .then(res => {
                  setGet({
                      data: res.data.data,
                      error: null,
                      loading: false
                  })
              }).catch(err => {
                  setGet({
                      data: [],
                      error: err.message,
                      loading: false
                  })
              })
      }
      fetchData();
    }, [])

    if(get.loading) {
      return <FullPageLoader/>
    }
    
    return (
      <div className="bg-white">
        {/* Hero Section */}
        <Hero/>

        {/* About Us Section */}
        <AboutUs/>

        {/* Stats Section */}
        <Stats/>

        {/* Features Section */}
        <Features/>

        {/* Classes Section */}
        <Classes sections={get?.data?.sections}/>

        {/* Membership Plans */}
        {/*<MembershipPlans/> */}

        {/* Testimonials */}
        <Testimonials rates={get?.data?.rates}/>

        {/* CTA Section */}
        {!user && <CTA/>}
      </div>
    );
};

export default GymLandingPage;