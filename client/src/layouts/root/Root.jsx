import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

const Root = () => {
    return (
        <div className=''>
            <div className="sticky top-0 z-[99]"><Navbar></Navbar></div>
            <div >
                <Outlet></Outlet>
            </div>
            <div><Footer></Footer></div>
        </div>
    );
};

export default Root;