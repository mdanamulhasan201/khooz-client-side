
import { useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { get_cart_products, delete_cart_product, messageClear, quantity_increment, quantity_decrement } from "../store/reducers/cartReducer";
import toast from "react-hot-toast";
import { FiMinus, FiPlus } from "react-icons/fi";


const Carts = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { cart_products, price, outofstock_products, buy_product_item, delivery_cost, successMessage, errorMessage, } = useSelector(state => state.cart)


    const redirect = () => {
        navigate('/shipping', {
            state: {
                products: cart_products,
                price: price,
                delivery_cost: delivery_cost,
                items: buy_product_item
            }
        })
    }

    useEffect(() => {
        dispatch(get_cart_products(userInfo.id))
    }, [])

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            dispatch(get_cart_products(userInfo.id))
        }
    }, [successMessage])

    // 

    const increment = (quantity, stock, cartId) => {
        const temp = quantity + 1;
        if (temp <= stock) {
            dispatch(quantity_increment(cartId))
        }
    }
    const decrement = (quantity, cartId) => {
        const temp = quantity - 1;
        if (temp !== 0) {
            dispatch(quantity_decrement(cartId))
        }
    }

    return (
        <div className='py-20'>
            <div className='max-w-screen-xl mx-auto'>
                <section className='flex items-center justify-center text-2xl  h-full w-full gap-2'>
                    <Link to='/' className='hover:text-red-500'>Home</Link>
                    <span className='pt-2'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                    <span>Cart</span>
                </section>

                <section className='mt-5'>
                    <div className=''>
                        {
                            cart_products.length > 0 || outofstock_products.length > 0 ? <div className='flex flex-wrap '>
                                <div className='w-full sm:w-full md:w-[67%] lg:w-[67%] xl:w-[67%] mb-5'>
                                    <div className='pr-3 '>
                                        <div className='flex flex-col gap-3'>
                                            <div className='bg-gray-100 p-4'>
                                                <h2 className='text-md text-green-500 font-semibold'> Stocks Products {cart_products.length}</h2>
                                            </div>
                                            {
                                                cart_products.map((p, i) => <div key={i} className='flex bg-gray-100 p-4 flex-col gap-2'>
                                                    <div className=' flex justify-start items-center'>
                                                        {/* <h2 className='text-md text-slate-600'>{p.shopName}</h2> */}
                                                    </div>
                                                    {
                                                        p.products.map((product, i) => <div key={i} className='w-full justify-center items-center flex md:flex-row flex-col'>
                                                            <div className='flex md:justify-start justify-center  gap-2 w-7/12'>
                                                                <div className='flex gap-2 justify-start items-center md:border-none border'>

                                                                    <img className='w-[80px] h-[80px]' src={product.productInfo.images[1]} alt="Product" />

                                                                    <div className='pr-4 text-slate-600'>
                                                                        <h1 className='text-md'>{product.productInfo.name}</h1>
                                                                        <span className='text-xs'>Brand : {product.productInfo.brand}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='flex md:flex-row flex-col justify-between w-5/12 '>
                                                                <div className='pl-4 '>
                                                                    <h2 className='text-lg '>{product.productInfo.price - Math.floor((product.productInfo.price * product.productInfo.discount) / 100)} Tk</h2>
                                                                    <p className='line-through text-red-400'>{product.productInfo.price} Tk</p>
                                                                    <p>-{product.productInfo.discount}%</p>

                                                                </div>
                                                                <div className='flex gap-2 flex-col'>
                                                                    <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl '>
                                                                        <div onClick={() => decrement(product.quantity, product._id)} className='px-3 cursor-pointer '>
                                                                            <FiMinus className="text-red-400"></FiMinus>
                                                                        </div>
                                                                        <div className='px-3'>{product.quantity}</div>

                                                                        <div onClick={() => increment(product.quantity, product.productInfo.stock, product._id)} className='px-3 cursor-pointer'>
                                                                            <FiPlus className="text-green-500"></FiPlus>
                                                                        </div>
                                                                    </div>

                                                                    <button onClick={() => dispatch(delete_cart_product(product._id))} className='px-5 py-[3px] bg-red-400 text-white'>Delete</button>
                                                                </div>
                                                            </div>

                                                        </div>)
                                                    }
                                                </div>)

                                            }

                                            {
                                                outofstock_products.length > 0 && <div className='flex flex-col gap-3'>
                                                    <div className='bg-gray-100 p-4'>
                                                        <h2 className='text-md text-red-400 font-semibold'> Out Of Stock {outofstock_products.length}</h2>
                                                    </div>
                                                    <div className='bg-gray-100 p-4'>
                                                        {
                                                            outofstock_products.map((p, i) => <div key={i} className='w-full justify-center items-center flex md:flex-row flex-col'>
                                                                <div className='flex  gap-2 w-7/12'>
                                                                    <div className='flex gap-2 justify-start items-center md:border-none border'>

                                                                        <img
                                                                            className='w-[80px] h-[80px]'
                                                                            src={p.products[0].images[1]}
                                                                            alt="Product"
                                                                        />

                                                                        <div className='pr-4 text-slate-600'>
                                                                            <h1 className='text-md'>{p.products[0].name}</h1>
                                                                            <span className='text-xs'>Brand : {p.products[0].brand}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className='flex md:flex-row flex-col justify-between w-5/12 '>
                                                                    <div className='pl-4 '>
                                                                        <h2 className='text-lg '>
                                                                            {p.products[0].price - Math.floor((p.products[0].price * p.products[0].discount) / 100)}


                                                                            Tk</h2>
                                                                        <p className='line-through text-red-400'>{p.products[0].price} Tk</p>
                                                                        <p>-{p.products[0].discount}%</p>

                                                                    </div>
                                                                    <div className='flex gap-2 flex-col'>
                                                                        <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl '>
                                                                            <div onClick={() => decrement(p.quantity, p._id)} className='px-3 cursor-pointer '>
                                                                                <FiMinus className="text-red-400"></FiMinus>
                                                                            </div>
                                                                            <div className='px-3'>{p.quantity}</div>
                                                                            <div onClick={() => increment(p.quantity, p.products[0].stock, p._id)} className='px-3 cursor-pointer'>+</div>
                                                                        </div>
                                                                        <button onClick={() => dispatch(delete_cart_product(p._id))} className='px-5 py-[3px] bg-red-400 text-white'>Delete</button>
                                                                    </div>
                                                                </div>

                                                            </div>)
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </div>



                                    </div>
                                </div>


                                {/* order summery */}
                                <div className='w-full sm:w-full md:w-[33%] lg:w-[33%] xl:w-[33%]'>
                                    <div className='pl-0'>
                                        {
                                            cart_products.length > 0 && <div className='bg-gray-100 p-3 text-slate-600 flex flex-col gap-3'>
                                                <h2 className='text-xl font-bold'>Order Summery</h2>
                                                <div className='flex justify-between items-center '>
                                                    <span>{buy_product_item} Item</span>
                                                    <span>{price} Tk</span>
                                                </div>
                                                <div className='flex justify-between items-center '>
                                                    <span>Delivery cost</span>
                                                    <span>{delivery_cost} Tk</span>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <input className='w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm' type="text" placeholder='Input Vauchar Coupon' />
                                                    <button className='px-5 py-[1px] bg-green-500 text-white rounded-sm uppercase'>Apply</button>
                                                </div>
                                                <div className='flex justify-between items-center '>
                                                    <span>Total</span>
                                                    <span className='text-lg font-semibold'> {price + delivery_cost} Tk</span>
                                                </div>
                                                <div>
                                                    <button onClick={redirect} className='px-5 py-[6px] w-full rounded-sm hover:shadow-blue-400/20 hover:shadow-lg bg-green-500 text-white uppercase'>Process to Checkout {buy_product_item}</button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>

                            </div> : <div className="flex justify-center items-center">
                                <Link className='px-4 py-1 bg-red-400 text-white' to='/allProducts'>Shop Now</Link>
                            </div>
                        }
                    </div>

                </section>

            </div>
        </div>
    );
};

export default Carts;