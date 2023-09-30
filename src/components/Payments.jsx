import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from '../Shared/Footer';
import Stripe from './Stripe';
import { useLocation } from 'react-router-dom';

const Payments = () => {
    const {state: {price, items} } = useLocation()
    const [paymentMethod, setPaymentMethod] = useState('stripe')
    return (
        <div>
            <Navbar></Navbar>
            <div className='py-20 container mx-auto'>
                <section className=''>
                    <div className='w-full sm:w-[90%] md:w-[90%] lg:w-[90%] mx-auto mt-4'>
                        <div className=' flex items-center gap-5 flex-col md:flex-row sm:flex-col-reverse'>
                            <div className='w-7/12 md:w-full sm:w-full lg:w-full'>
                                <div className='pr-2 md:pr-0 '>
                                    <div className='flex flex-wrap'>
                                        <div onClick={() => setPaymentMethod('stripe')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'stripe' ? 'bg-white border' : 'bg-[#F8F5FF]'}`}>
                                            <div className='flex flex-col gap-[3px] justify-center items-center'>
                                                <img className='' src='http://localhost:3000/images/payment/stripe.png' alt="stripe" />
                                                <span className='text-slate-600 '>Stripe</span>

                                            </div>
                                        </div>
                                        <div onClick={() => setPaymentMethod('bkash')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'bkash' ? 'bg-white border-t' : 'bg-[#F8F5FF]'}`}>
                                            <div className='flex flex-col gap-[3px] justify-center items-center'>
                                                <img className='' src='http://localhost:3000/images/payment/bkash.png' alt="bkash" />
                                                <span className='text-slate-600 '>bKash</span>

                                            </div>
                                        </div>
                                        <div onClick={() => setPaymentMethod('nagad')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'nagad' ? 'bg-white border-t' : 'bg-[#F8F5FF]'}`}>
                                            <div className='flex flex-col gap-[3px] justify-center items-center'>
                                                <img className='' src='http://localhost:3000/images/payment/nogot.png' alt="nagad" />
                                                <span className='text-slate-600 '>Nagad</span>

                                            </div>
                                        </div>
                                        <div onClick={() => setPaymentMethod('rocket')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'rocket' ? 'bg-white border-t' : 'bg-[#F8F5FF]'}`}>
                                            <div className='flex flex-col gap-[3px] justify-center items-center'>
                                                <img className='' src='http://localhost:3000/images/payment/roket.png' alt="rocket" />
                                                <span className='text-slate-600 '>Rocket</span>

                                            </div>
                                        </div>


                                    </div>
                                    {
                                        paymentMethod === 'stripe' && <div>
                                            <Stripe></Stripe>
                                        </div>
                                    }
                                    {
                                        paymentMethod === 'bkash' && <div className='w-full px-4 py-8 border-x border-b'>
                                            <button className='px-10 py-[6px] text-white rounded-sm bg-green-500 hover:shadow-green-500/20 hover:shadow-lg'>Pay Now</button>
                                        </div>
                                    }
                                    {
                                        paymentMethod === 'nagad' && <div className='w-full px-4 py-8 border-x border-b'>
                                            <button className='px-10 py-[6px] text-white rounded-sm bg-green-500 hover:shadow-green-500/20 hover:shadow-lg'>Pay Now</button>
                                        </div>
                                    }
                                    {
                                        paymentMethod === 'rocket' && <div className='w-full px-4 py-8 border-x border-b'>
                                            <button className='px-10 py-[6px] text-white rounded-sm bg-green-500 hover:shadow-green-500/20 hover:shadow-lg'>Pay Now</button>
                                        </div>
                                    }

                                </div>

                            </div>

                            <div className='w-5/12 md:w-full'>
                                <div className='pl-2 md:pl-0 md:mb-0'>
                                    <div className='bg-white shadow p-5 text-slate-600 flex flex-col gap-3'>
                                        <h2>Order Summary</h2>
                                        <div className='flex justify-between'>
                                            <span>{items} item and shipping fee included</span>
                                            <span>{price} Tk</span>
                                        </div>
                                        <div className='flex justify-between text-lg font-semibold'>
                                            <span>Total</span>
                                            <span>{price} Tk</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Payments;