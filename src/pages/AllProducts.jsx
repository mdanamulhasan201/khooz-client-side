// import React, { useEffect } from 'react';
import Product from '../components/AllProducts/Product';
import Navbar from '../components/Navbar';
import Footer from '../Shared/Footer';

const AllProducts = () => {


    return (
        <div>
            <Navbar></Navbar>
            <Product></Product>
            <Footer></Footer>
        </div>
    );
};

export default AllProducts;