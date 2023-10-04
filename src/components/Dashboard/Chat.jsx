import React, { useEffect, useState } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

// connect from backed socket io realtime chat 
import io from 'socket.io-client'
const socket = io('http://localhost:5000')

const Chat = () => {

    const { sellerId } = useParams()
    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {

    })
    return (
        <div className='bg-[#F8F5FF] p-3 rounded-md'>
            <div className='w-full flex flex-col md:flex-row'>
                <div className='w-full md:w-[230px]'>
                    <div className='flex justify-center md:justify-start gap-3 items-center text-slate-600 text-lg h-[50px]'>
                        <span><AiOutlineMessage></AiOutlineMessage></span>
                        <span>Message With Seller</span>
                    </div>
                    <div className='w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3 md:h-auto md:pr-0'>
                        {
                            [1, 2, 3, 4].map((f, i) => (
                                <Link key={i} className={`flex gap-2 justify-start items-center pl-2 py-[5px]`}>
                                    <div className='relative rounded-full w-[30px] h-[30px] '>
                                        <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
                                        <img className='rounded-full w-[30px] h-[30px]' src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="" />
                                    </div>
                                    <span>Anamul Hasan</span>
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className='md:w-[calc(100%-230px)] w-full'>
                    <div className='w-full h-full'>
                        <div className='flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]'>
                            <div className=' relative rounded-full w-[40px] h-[40px] '>
                                <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'>

                                </div>
                                <img className='rounded-full w-[40px] h-[40px]' src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="" />
                            </div>
                            <span>Anamul Hasan</span>
                        </div>

                        <div className='h-[400px] w-full bg-white p-3 rounded-md'>
                            <div className='w-full h-full overflow-y-auto flex flex-col gap-3'>
                                <div className='w-full flex gap-2 justify-start items-center text-sm '>
                                    <img className='rounded-full w-[40px] h-[40px]' src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="" />
                                    <div className='p-2 bg-gray-400 text-white rounded-md '>
                                        <span>How are you? Seller message</span>

                                    </div>

                                </div>
                                <div className='w-full flex gap-2 justify-end items-center text-sm '>

                                    <div className='p-2 bg-blue-500 text-white rounded-md '>
                                        <span>i'm fine</span>

                                    </div>

                                </div>
                            </div>
                        </div>


                        {/* message area */}
                        <div className='flex p-2 justify-between items-center w-full'>
                            <div className='flex w-[40px] h-[40px] border p-2 justify-center items-center rounded-full'>
                                <label className='cursor-pointer' htmlFor=''><AiOutlinePlus></AiOutlinePlus></label>
                                <input type="file" className='hidden' />
                            </div>
                            <div className='border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative'>
                                <input type="text" placeholder='Message' className='w-full rounded-full h-full outline-none p-3' />


                            </div>
                            <div className='w-[40px] p-2 justify-center items-center rounded-full '>

                                <div className='text-2xl cursor-pointer'>
                                    <IoSend className='text-blue-500'></IoSend>

                                </div>
                            </div>
                        </div>


                    </div>

                </div>

            </div>

        </div>
    );
};

export default Chat;