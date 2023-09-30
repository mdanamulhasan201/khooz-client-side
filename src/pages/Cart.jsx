import React from 'react';
import Navbar from '../components/Navbar';
import Carts from '../components/Carts';
import Footer from '../Shared/Footer';

const Cart = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Carts></Carts>
            <Footer></Footer>
        </div>
    );
};

export default Cart;