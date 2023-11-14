import React, { useEffect } from 'react';
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Rating from '../../Shared/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { get_wishlist_products, remove_wishlist, messageClear } from '../../store/reducers/cartReducer';
import toast from 'react-hot-toast';

const WishList = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { wishlist, successMessage } = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(get_wishlist_products(userInfo.id))
    }, [])
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
    }, [successMessage])
    return (
        <div className='p-4'>
            <div className='w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6 ' >
                {
                    wishlist.map((p, i) => <div key={i} className='border  w-64  group transition-all duration-500 hover:shadow-md hover:-mt-3'>
                        <div className='relative overflow-hidden'>

                            {
                                p.discount ? <div className='flex justify-center items-center absolute badge bg-green-500 text-white  font-semibold text-xs right-2 top-2'>-{p.discount}%</div> : ''
                            }


                            <img className='h-[240px] w-64' src={p.image} alt="Refrigerator Compressor Spare Part" />

                            <ul className='flex text-xl text-green-500 justify-center items-center gap-2  w-full group-hover:bottom-3'>
                                <li onClick={() => dispatch(remove_wishlist(p._id))} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full text-red-400 hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>

                                <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all' ><FaEye /></Link>

                                <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>
                            </ul>
                        </div>
                        <div className='py-3 text-slate-600 px-2'>
                            <h2>{p.name}</h2>
                            <div className='flex justify-between items-center gap-3'>
                                <div className='flex'>
                                    <Rating ratings={p.rating} />
                                </div>
                                <span className='text-lg  font-bold'>{p.price} Tk</span>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default WishList;