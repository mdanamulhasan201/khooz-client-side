import React, { useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link,redirect, useNavigate } from 'react-router-dom';
import { get_dashboard_index_data } from '../../store/reducers/dashboardReducer';

const Index = () => {

    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { totalOrder, pendingOrder, recentOrders, cancelledOrder } = useSelector(state => state.dashboard)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_dashboard_index_data(userInfo.id))
    }, [])
    const redirect = (ord) => {
        let items = 0;
        for (let i = 0; i < ord.length; i++) {
            items = ord.products[i].quantity + items
        }
        navigate('/payment', {
            state: {
                price: ord.price,
                items,
                orderId: ord._id
            }
        })
    }
    return (
        <div >
            <div className='grid grid-col-1 md:grid-cols-3 gap-5'>
                <div className='flex justify-center items-center p-5 bg-[#F8F5FF] rounded-md gap-5 '>

                    <div className='bg-blue-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                        <span className='text-xl text-blue-500'>
                            <AiOutlineShoppingCart></AiOutlineShoppingCart>
                        </span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h1 className='text-3xl font-bold'>{totalOrder}</h1>
                        <span> Orders</span>
                    </div>
                </div>

                <div className='flex justify-center items-center p-5 bg-[#F8F5FF] rounded-md gap-5 '>
                    <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                        <span className='text-xl text-green-600'>
                            <AiOutlineShoppingCart></AiOutlineShoppingCart>
                        </span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h1 className='text-3xl font-bold'>{pendingOrder}</h1>
                        <span>Pending Order</span>
                    </div>
                </div>

                <div className='flex justify-center items-center p-5 bg-[#F8F5FF] rounded-md gap-5 '>
                    <div className='bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                        <span className='text-xl text-red-500'>
                            <AiOutlineShoppingCart></AiOutlineShoppingCart>
                        </span>
                    </div>

                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h1 className='text-3xl font-bold'>{cancelledOrder}</h1>
                        <span>Cancelled Orders</span>

                    </div>
                </div>
            </div>

            <div className='bg-[#F8F5FF] p-4 mt-5 rounded-md '>
                <h2 className='text-lg font-semibold text-slate-600'>Recent Orders</h2>
                <div className='pt-4'>
                    <div className='relative overflow-x-auto '>
                        <table className='w-full text-sm text-left text-gray-500'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                                <tr>
                                    <th className='px-6 py-3' scope='col'>Order Id</th>
                                    <th className='px-6 py-3' scope='col'>Price</th>
                                    <th className='px-6 py-3' scope='col'>Payment Status</th>
                                    <th className='px-6 py-3' scope='col'>Order Status</th>
                                    <th className='px-6 py-3' scope='col'>Action</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                   recentOrders.map((o, i) => <tr key={i} className='bg-white border-b'>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o._id}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.price} Tk</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.payment_status}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.delivery_status}</td>
                                        <td scope='row' className='px-6 py-4 '>
                                            <div className='flex flex-col md:flex-row gap-2 md:gap-0 md:space-x-2 space-x-0'>
                                                <Link to={`/dashboard/order/details/${o._id}`}>
                                                    <span className='bg-green-100 text-green-500 text-xs font-normal px-2 py-[1px]'>
                                                        View
                                                    </span>
                                                </Link>
                                                <span onClick={()=>redirect(o)} className='bg-red-50 cursor-pointer whitespace-nowrap text-red-400 text-xs font-normal px-2 py-[1px]'>Pay Now</span>
                                            </div>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Index;