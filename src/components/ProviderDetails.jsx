import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from '../Shared/Footer';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { get_provider_details } from '../store/reducers/providerReducer';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import ProviderReview from './ProviderReview';
import Rating from '../Shared/Rating';


const ProviderDetails = () => {
    const dispatch = useDispatch()
    const { sellerId } = useParams()
    const { seller } = useSelector(state => state.provider)

    const { totalReviews} = useSelector(state => state.home)

    useEffect(() => {
        dispatch(get_provider_details(sellerId))

    }, [sellerId])
    return (
        <div>
            <Navbar></Navbar>
            <div className='container mx-auto py-20'>
                <div className='mx-2 md:mx-0'>
                    <section className='flex items-center justify-center text-2xl  h-full w-full gap-2'>
                        <Link to='/' className='hover:text-red-400'>Home</Link>
                        <span className='pt-2'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                        <span>Provider Details</span>
                    </section>


                    <section className="bg-gray-100 py-5 mb-5 mt-5 px-5">
                        <div className="flex justify-start items-center text-md text-slate-600 w-full">
                            <Link to='/' className='hover:text-red-400'>Home</Link>
                            <span className='pt-1'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                            <Link to='/' className='hover:text-red-400'>{seller?.shopInfo?.category}</Link>
                            <span className='pt-1'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                            <h1>{seller?._id}</h1>
                        </div>

                    </section>


                    <div className='flex flex-col md:flex-row gap-5 text-center md:text-left  my-10 leading-10'>

                        <div className='flex justify-center md:w-4/12 '>
                            <img className='w-[350px] h-[400px] border mr-2 mb-2' src={seller.image} alt="" />
                        </div>

                        <div className='text-gray-600 md:w-8/12 leading-8'>
                            <div className='mb-4'>
                                <h2 className='text-2xl font-semibold text-gray-600'>{seller.name} </h2>
                                <span className='text-green-500'>{seller?.shopInfo?.category}</span>
                                <div className="flex justify-center md:justify-start text-2xl my-2 gap-2">
                                    <Rating ratings={seller.rating}></Rating>
                                </div>
                                <div className='flex justify-center md:justify-start gap-10'>
                                    <div className='text-red-400'>
                                        <span className="text-2xl font-semibold">{seller.rating}</span>
                                        <span className="text-lg font-semibold text-gray-500">/5</span>
                                    </div>
                                    <div>
                                        <h2 className='text-green-500'>Rating: ({totalReviews})</h2>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <h2 className='text-xl font-semibold'>Info</h2>
                                    <p className='text-lg mb-1 font-sans'>Mobile: <span className='text-lg font-normal'>{seller?.shopInfo?.mobileNumber}</span></p>
                                    <p className='text-lg mb-1  font-sans'>Email: <span className='text-lg font-normal'>{seller?.email}</span></p>
                                    <h1 className='text-lg mb-1  font-sans'>Division: <span className='text-lg font-normal'>{seller?.shopInfo?.division}</span></h1>
                                    <h1 className='text-lg mb-1  font-sans'>District: <span className='text-lg font-normal'>{seller?.shopInfo?.district}</span></h1>
                                    <span className='text-lg'>Address: <span className='text-lg font-normal'>{seller?.shopInfo?.village}</span></span>
                                    <span className='text-lg'> {seller?.shopInfo?.thana},</span>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>



                <ProviderReview seller={seller}></ProviderReview>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ProviderDetails;