import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { get_order_details } from '../../store/reducers/orderReducer';

const OrderDetails = () => {
    const { orderId } = useParams()
    const dispatch = useDispatch()
    const { myOrder } = useSelector(state => state.order)
    const { userInfo } = useSelector(state => state.auth)


    useEffect(() => {
        dispatch(get_order_details(orderId))
    }, [orderId])
    return (
        <>
            <div className='bg-[#F8F5FF] p-4 mt-5 rounded-md '>
                <h2 className='text-slate-600 font-semibold'>#{myOrder._id}, <span className='pl-1'>{myOrder.date}</span> </h2>

                <div className=' mt-5'>
                    <div className=' '>
                        <h2 className='text-slate-600 font-semibold'>Deliver to : {myOrder.shippingInfo?.name}</h2>
                        <p>
                            <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>Home</span>
                            <span className='text-slate-600 text-sm'> {myOrder.shippingInfo?.address}, {myOrder.shippingInfo?.region}, {myOrder.shippingInfo?.city}, {myOrder.shippingInfo?.area},{myOrder.shippingInfo?.post} mobile: {myOrder.shippingInfo?.phone}</span>
                        </p>
                        <p className='text-slate-600 text-sm font-semibold'>Email to {userInfo.email}</p>
                    </div>
                </div>

                <div className='text-slate-600 mt-5'>
                    <h2>Price: <span className='font-bold'>{myOrder.price}</span> Tk include shipping fee</h2>
                    <p>Payment status: <span className={`py-1 text-xs px-3 ${myOrder.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-500'} rounded-md`}>{myOrder.payment_status}</span></p>

                    <p className='mt-2'>Order status: <span className={`py-1 text-xs px-3 ${myOrder.delivery_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-500'} rounded-md`}>{myOrder.delivery_status}</span></p>
                </div>

                <div className='mt-5'>
                    <h2 className='text-slate-600 text-lg pb-2'>Products</h2>
                    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 flex-col'>
                        {
                            myOrder.products?.map((p, i) => <div key={i}>
                                <div className='flex gap-5 justify-between items-center text-slate-600 bg-white  w-full p-2'>
                                    <div className='flex gap-2 '>
                                        <img className='w-[55px] h-[55px]' src={p.images[1]} alt="images" />
                                        <div className='flex  text-sm flex-col justify-start items-start'>
                                            <Link className='font-semibold'>
                                                {p.name}
                                            </Link>

                                            <p >Brand: {p.brand}</p>
                                            <p>Quantity: <span className='font-semibold'>{p.quantity}</span></p>

                                        </div>
                                    </div>
                                    <div className='pl-4'>
                                        {
                                            p.discount ? <h2 className='text-lg font-semibold'>{p.price - Math.floor((p.price * p.discount) / 100)} Tk</h2> : ''
                                        }
                                        <p className={`${p.discount ? 'line-through text-red-500' : ''}`}>{p.price} Tk</p>
                                        {
                                            p.discount ? <p className='text-green-500'>-{p.discount}% off</p> : ''
                                        }
                                    </div>

                                </div>
                            </div>)
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetails;