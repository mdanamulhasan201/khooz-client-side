import React from 'react';
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Rating from '../../Shared/Rating';

const WishList = () => {
    return (
        <div className=' p-4'>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' >
                {
                    [1, 2, 3, 4, 5, 6, 7].map((p, i) => <div key={i} className='border  w-80  group transition-all duration-500 hover:shadow-md hover:-mt-3'>
                        <div className='relative overflow-hidden'>

                            <div className='flex justify-center items-center absolute badge bg-green-500 text-white  font-semibold text-xs right-2 top-2'>10%</div> 
                            

                            <img className='h-[240px]' src='http://localhost:3000/images/products/2.jpg' alt="Refrigerator Compressor Spare Part" />

                            <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>
                                <Link to='/product/details/dfgh' className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all' ><FaEye /></Link>
                                <li  className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>
                            </ul>
                        </div>
                        <div className='py-3 text-slate-600 px-2'>
                            <h2>Commpresser</h2>
                            <div className='flex justify-between items-center gap-3'>
                                <div className='flex'>
                                    <Rating ratings={4} />
                                </div>
                                <span className='text-lg  font-bold'>500 Tk</span>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default WishList;