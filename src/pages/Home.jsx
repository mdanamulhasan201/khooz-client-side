import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import FavouriteProvider from '../components/FavouriteProvider';
import Swipers from '../components/Swipers';
import TopProduct from '../components/TopProduct';
import Footer from '../Shared/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../store/reducers/homeReducer';

const Home = () => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.home)
    useEffect(() => {

        dispatch(get_products())

    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <Carousel></Carousel>
            <FavouriteProvider ></FavouriteProvider>
            <Swipers></Swipers>
            <TopProduct products={products}></TopProduct>
            <Footer></Footer>
        </div>
    );
};

export default Home;