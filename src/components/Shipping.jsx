import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../Shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/reducers/orderReducer";


const Shipping = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { state: { products, price, delivery_cost, items } } = useLocation()
    // console.log(products)
    const dispatch = useDispatch()
    const [res, setRes] = useState(false)
    const [info, setInfo] = useState({
        name: '',
        address: '',
        phone: '',
        post: '',
        region: '',
        city: '',
        area: ''
    })

    // console.log(info)
    const inputHandle = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const save = (e) => {
        e.preventDefault()
        const { name, address, phone, post, region, city, area } = info;
        if (name && address && phone && post && region && city && area) {
            setRes(true)
        }
    }
    const placeOrder = () => {
        dispatch(place_order({
            price,
            products,
            delivery_cost,
            shippingInfo: info,
            userId: userInfo.id,
            navigate,
            items

        }))
    }
    return (
        <>
            <Navbar></Navbar>
            <div className="py-20">
                <div className="container mx-auto">
                    <section className='flex items-center justify-center text-2xl  h-full w-full gap-2'>
                        <Link to='/' className='hover:text-red-500'>Home</Link>
                        <span className='pt-2'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                        <span>Place Order</span>
                    </section>
                    <section className=" mt-10">
                        <div className="py-16">
                            <div className="w-full flex flex-wrap">
                                <div className="w-full sm:w-full md:w-full lg:w-[67%] xl:w-[67%] 2xl:w-[67%]">
                                    <div className="flex flex-col gap-3 ">
                                        <div className="bg-gray-100 p-6 shadow-sm rounded-md" >
                                            {
                                                !res && <>
                                                    <h2 className="text-slate-600 font-bold pb-3">Shipping Information</h2>
                                                    <form onSubmit={save}>
                                                        <div className="flex flex-col sm:flex-row gap-5 w-full text-slate-600">
                                                            <div className="flex flex-col gap-1 mb-2 w-full sm:w-1/2">
                                                                <label htmlFor="name">Name</label>
                                                                <input onChange={inputHandle} value={info.name} type="text" name="name" placeholder="Full Name" id="name" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-400 rounded-md" />
                                                            </div>
                                                            <div className="flex flex-col gap-1 mb-2 w-full sm:w-1/2">
                                                                <label htmlFor="address">Address</label>
                                                                <input onChange={inputHandle} value={info.address} type="text" name="address" placeholder="House no / building / street / area" id="address" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-400 rounded-md" />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row gap-5 w-full text-slate-600">
                                                            <div className="flex flex-col gap-1 mb-2 w-full sm:w-1/2">
                                                                <label htmlFor="phone">Phone</label>
                                                                <input onChange={inputHandle} value={info.phone} type="number" name="phone" placeholder="Phone Number" id="phone" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-400 rounded-md" />
                                                            </div>
                                                            <div className="flex flex-col gap-1 mb-2 w-full sm:w-1/2">
                                                                <label htmlFor="post">Post</label>
                                                                <input onChange={inputHandle} value={info.post} type="number" name="post" placeholder="Post Code" id="post" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-400 rounded-md" />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row gap-5 w-full text-slate-600">
                                                            <div className="flex flex-col gap-1 mb-2 w-full sm:w-1/2">
                                                                <label htmlFor="region">Region</label>
                                                                <input onChange={inputHandle} value={info.region} type="text" name="region" placeholder="Your Region" id="region" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-400 rounded-md" />
                                                            </div>
                                                            <div className="flex flex-col gap-1 mb-2 w-full sm:w-1/2">
                                                                <label htmlFor="city">City</label>
                                                                <input onChange={inputHandle} value={info.city} type="text" name="city" placeholder="Your City" id="city" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-400 rounded-md" />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row gap-5 w-full text-slate-600">
                                                            <div className="flex flex-col gap-1 mb-2 w-full sm:w-1/2">
                                                                <label htmlFor="area">Area</label>
                                                                <input onChange={inputHandle} value={info.area} type="text" name="area" placeholder="Your Area" id="area" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-400 rounded-md" />
                                                            </div>
                                                            <div className="flex flex-col gap-1 mt-8 w-full sm:w-1/2">
                                                                <button className="px-3 py-[6px] rounded-sm text-white shadow-lg bg-red-400 hover:shadow-red-400/40">Save</button>
                                                            </div>
                                                        </div>

                                                    </form>

                                                </>
                                            }
                                            {
                                                res && <div className="flex flex-col gap-1">
                                                    <h1 className="text-slate-600 font-semibold pb-2">Deliver to {info.name}</h1>
                                                    <p>
                                                        <span className="bg-blue-200 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Home</span>
                                                        <span className="text-slate-600 text-sm">{info.address} {info.region} {info.city} {info.area} ({info.post}) </span>
                                                        <span onClick={() => setRes(false)} className="text-indigo-500 cursor-pointer ms-2">Change </span>
                                                    </p>
                                                    <p className="text-slate-600 text-sm">Email to {userInfo.email}</p>

                                                </div>
                                            }
                                        </div>
                                        {
                                            res ? products.map((p, i) => <div key={i} className='flex bg-gray-100 p-4 flex-col gap-2'>
                                                <div className=' flex justify-start items-center'>
                                                    <h2 className='text-md text-slate-600'>{p.shopName}</h2>
                                                </div>
                                                {
                                                    p.products.map((product, j) => <div key={i} className='w-full flex '>
                                                        <div className='flex  gap-2 w-7/12'>
                                                            <div className='flex gap-2 justify-start items-center'>

                                                                <img
                                                                    className='w-[80px] h-[80px]'
                                                                    src={product.productInfo.images[1]}
                                                                    alt="Product"
                                                                />

                                                                <div className='pr-4 text-slate-600'>
                                                                    <h1 className='text-md'>{product.productInfo.name}</h1>
                                                                    <span className='text-xs'>Brand : {product.productInfo.brand}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='flex justify-end w-5/12 '>
                                                            <div className='pl-4 '>
                                                                <h2 className='text-lg '> {product.productInfo.price - Math.floor((product.productInfo.price * product.productInfo.discount) / 100)} Tk</h2>
                                                                <p className='line-through text-red-400'>{product.productInfo.price} Tk</p>
                                                                <p>-{product.productInfo.discount}%</p>

                                                            </div>

                                                        </div>

                                                    </div>)
                                                }
                                            </div>) : ''

                                        }
                                    </div>
                                </div>
                                <div className="w-full sm:w-full md:w-full lg:w-[33%] xl:w-[33%] 2xl:w-[33%]">
                                    <div className="pl-3 ">
                                        <div className="bg-gray-100 font-medium p-5 text-slate-600 flex flex-col gap-3">
                                            <h2 className="text-xl font-semibold">Order Summary</h2>
                                            <div className='flex justify-between items-center '>
                                                <span>Items Total ({items})</span>
                                                <span >{price} Tk</span>
                                            </div>
                                            <div className='flex justify-between items-center '>
                                                <span>Delivery cost</span>
                                                <span>{delivery_cost} Tk</span>
                                            </div>
                                            <div className='flex justify-between items-center '>
                                                <span>Total Payment</span>
                                                <span>{price + delivery_cost} Tk</span>
                                            </div>
                                            <div className='flex justify-between items-center '>
                                                <span>Total</span>
                                                <span>{price + delivery_cost} Tk</span>
                                            </div>
                                            <div>
                                                <button onClick={placeOrder} disabled={res ? false : true} className={`px-5 py-[6px] w-full rounded-sm hover:shadow-blue-400/20 hover:shadow-lg ${res ? 'bg-green-500 text-white' : 'bg-green-300 text-black'}  uppercase`}>Place Order</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </section>

                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Shipping;