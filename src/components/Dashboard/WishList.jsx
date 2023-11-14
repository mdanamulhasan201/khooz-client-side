import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Rating from '../../Shared/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { get_wishlist_products, remove_wishlist, messageClear } from '../../store/reducers/cartReducer';
import toast from 'react-hot-toast';

const WishList = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { wishlist, successMessage } = useSelector(state => state.cart);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    // Slice wishlist based on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentWishlist = wishlist.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        dispatch(get_wishlist_products(userInfo.id));
        setCurrentPage(1); // Reset current page when user changes
    }, [userInfo.id]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
    }, [successMessage]);
    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRemoveFromWishlist = (productId) => {
        dispatch(remove_wishlist(productId));
    };

    return (
        <div className='p-4'>
            <div className='w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6 '>
                {currentWishlist.length > 0 ? (
                    currentWishlist.map((p, i) => (
                        <div key={i} className='border w-64 group hover:shadow-md rounded'>
                            <div className='relative overflow-hidden'>
                                {p.discount ? <div className='flex justify-center items-center absolute badge bg-green-500 text-white font-semibold text-xs right-2 top-2'>-{p.discount}%</div> : ''}
                                <img className='h-[240px] w-64' src={p.image} alt={p.name} />
                                <ul className='flex text-xl text-green-500 justify-center items-center gap-2 w-full group-hover:bottom-3'>
                                    <li onClick={() => handleRemoveFromWishlist(p._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full text-red-400 hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>
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
                                    <span className='text-lg font-bold'>{p.price} Tk</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className=' text-lg font-semibold'>You have not added any product</h1>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <ul className="flex space-x-2">
                    {Array.from({ length: Math.ceil(wishlist.length / itemsPerPage) }).map((_, page) => (
                        <li
                            key={page}
                            onClick={() => handlePageChange(page + 1)}
                            className={`cursor-pointer px-2 py-1 rounded-full ${currentPage === page + 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            {page + 1}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WishList;
