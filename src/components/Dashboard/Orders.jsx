import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { get_orders } from '../../store/reducers/orderReducer';


const Orders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [state, setState] = useState('all')
    const { userInfo } = useSelector(state => state.auth)
    const { myOrders, order } = useSelector(state => state.order)
    // console.log(order)


    useEffect(() => {
        dispatch(get_orders({
            status: state, customerId: userInfo.id
        }))
    }, [state])



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
        <div>

            <div className='bg-[#F8F5FF] p-4  rounded-md '>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-semibold text-slate-600'>My Orders</h2>
                    <select className='outline-none px-3 py-1 border rounded-md text-slate-600' value={state} onChange={(e) => setState(e.target.value)}>
                        <option value="all" >Order status</option>
                        <option value="placed">Placed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="warehouse">Warehouse</option>
                    </select>
                </div>
                <div className='pt-4 '>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-gray-500 '>
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
                                    myOrders.map((o, i) => <tr key={i} className='bg-white border-b'>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o._id}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.price} Tk</td>
                                        <td scope='row' className={`px-6 py-4 font-medium whitespace-nowrap ${o.payment_status === 'paid' ? 'text-green-400' : 'text-red-400'}`}>
                                            {o.payment_status}
                                        </td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.delivery_status}</td>
                                        <td scope='row' className='px-6 py-4 '>
                                            <div className='flex flex-col md:flex-row gap-2 md:gap-0 md:space-x-2 space-x-0'>
                                                <Link to={`/dashboard/order/details/${o._id}`}>
                                                    <span className='bg-green-100 text-green-500 text-xs  px-2 py-[1px] font-semibold'>
                                                        View
                                                    </span>
                                                </Link>
                                                {o.payment_status === 'paid' ? (
                                                    <span className='bg-green-100 text-green-500 cursor-not-allowed whitespace-nowrap  text-xs  px-2 py-[1px] font-semibold' disabled>
                                                        Paid
                                                    </span>
                                                ) : (
                                                    <span onClick={() => redirect(o)} className='bg-red-50 cursor-pointer whitespace-nowrap text-red-400 text-xs  px-2 py-[1px] font-semibold'>
                                                        Pay Now
                                                    </span>
                                                )}
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

export default Orders;