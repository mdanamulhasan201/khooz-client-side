import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../Shared/Footer';
import { FaList } from 'react-icons/fa';
import { Outlet, NavLink } from 'react-router-dom';
import { MdOutlineDashboard, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { BsBookmarkHeart, BsChat } from 'react-icons/bs';
import { RiLockPasswordLine } from "react-icons/ri";
import { BiLogOutCircle } from 'react-icons/bi';

const UserDashBoard = () => {
    const [filterShow, setFilterShow] = useState(false)

    

    return (
        <>
            <Navbar></Navbar>
            <div className='container mx-auto py-20'>
                <div className='w-[90%] md:w-full mx-auto pt-5 block md:hidden lg:hidden'>
                    <div>
                        <button onClick={() => setFilterShow(!filterShow)} className='text-center py-3 px-3 bg-indigo-500 text-white'>
                            <FaList />
                        </button>
                    </div>
                </div>
                <div className='h-full mx-auto'>
                    <div className='py-5 flex w-[90%] md:w-full lg:w-full  mx-auto relative'>
                        <div className={` rounded-md z-50 md:z-0 absolute md:static ${filterShow ? '-left-4' : '-left-[360px]'} w-[270px] ml-4 bg-[#F8F5FF]`}>
                            <ul className='py-2 text-slate-600 px-4'>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><MdOutlineDashboard></MdOutlineDashboard> </span>
                                    <NavLink to='/dashboard' className='block'>Dashboard</NavLink>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><MdOutlineProductionQuantityLimits></MdOutlineProductionQuantityLimits> </span>
                                    <NavLink to='/dashboard/myOrders' className='block'>My Orders</NavLink>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><BsBookmarkHeart></BsBookmarkHeart> </span>
                                    <NavLink to='/dashboard/wishList' className='block'>Wishlist</NavLink>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><BsChat></BsChat> </span>
                                    <NavLink to='/dashboard/chat' className='block'>Chat</NavLink>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><RiLockPasswordLine></RiLockPasswordLine> </span>
                                    <NavLink to='/dashboard/changePassword' className='block'>Change Password</NavLink>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><BiLogOutCircle></BiLogOutCircle> </span>
                                    <button  className='block'>Logout</button>
                                </li>
                            </ul>
                        </div>
                        <div className='md:w-[calc(100%-270px)] w-full'>
                            <div className='mx-0 md:mx-4'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </>
    );
};

export default UserDashBoard;