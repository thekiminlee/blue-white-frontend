import React, { useState } from 'react';
import UserDetail from '../components/userDetail.component';

export default function Dashboard() {

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.replace('/');
    }

    return (
        <div>
            <div className='logout'>
                <button onClick={handleLogout}>Logout</button>
            </div>
            
            <div className='container'>
                <text className='page-title'>Dashboard</text>
                <UserDetail/>
            </div>
        </div>
    )
}