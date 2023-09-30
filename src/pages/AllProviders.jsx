import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../Shared/Footer';
import Provider from '../components/AllProviders/Provider';

const AllProviders = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Provider></Provider>
            <Footer></Footer>
        </div>
    );
};

export default AllProviders;