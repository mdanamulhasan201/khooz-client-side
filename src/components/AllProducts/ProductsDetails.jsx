import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import Rating from "../../Shared/Rating";
import Reviews from "./Review";
import Footer from "../../Shared/Footer";
import Navbar from "../Navbar";
import './solved.css'
import { useDispatch, useSelector } from "react-redux";
import { get_product_details } from "../../store/reducers/homeReducer";
import { FiMinus, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import { add_to_cart, messageClear, add_to_wishlist } from "../../store/reducers/cartReducer";




const ProductDetails = () => {

    const navigate = useNavigate()
    const { slug } = useParams()
    const dispatch = useDispatch()
    const { product, moreProducts, totalReview } = useSelector(state => state.home)

    const { userInfo } = useSelector(state => state.auth)
    const { errorMessage, successMessage } = useSelector(state => state.cart)

    const [image, setImage] = useState('')
    const [state, setState] = useState('reviews')
    const [quantity, setQuantity] = useState(1)

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 3
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 2
        }
    }


    // products increment & decrement
    const increment = () => {
        if (quantity >= product.stock) {
            toast.error('Out of stock')
        } else {
            setQuantity(quantity + 1)
        }
    }
    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    // add cart

    const add_cart = () => {
        if (userInfo) {
            dispatch(add_to_cart({
                userId: userInfo.id,
                quantity,
                productId: product._id
            }))
        } else {
            navigate('/login')
        }
    }

    const add_wishlist = () => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[1],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug
            }))
        } else {
            navigate('/login')
        }

    }

    useEffect(() => {
        dispatch(get_product_details(slug))
    }, [slug])

    // message handle
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())

        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())

        }
    }, [errorMessage, successMessage])




    // buy products 

    const buy = () => {
        // Check if the user is logged in


        if (userInfo) {
            let price = 0;

            // Calculate discounted price
            if (product.discount !== 0) {
                price = product.price - Math.floor((product.price * product.discount) / 100);
            } else {
                price = product.price;
            }

            // Calculate total price with owner's 5% cut
            const totalPrice = quantity * (price - Math.floor((price * 5) / 100));

            // Create the formatted object for shipping
            const shippingObject = [
                {
                    sellerId: product.sellerId,
                    shopName: product.shopName,
                    price: totalPrice,
                    products: [
                        {
                            quantity,
                            productInfo: product
                        }
                    ]
                }
            ];

            // Navigate to the shipping page with necessary details
            navigate('/shipping', {
                state: {
                    products: shippingObject,
                    price: price * quantity,
                    delivery_cost: 100,
                    items: 1
                }
            });
        } else {
            // If the user is not logged in, redirect them to the login page
            navigate('/login');
        }
    };


    const handleZoom = (e) => {
        const zoomer = e.currentTarget;
        const offsetX = e.nativeEvent.offsetX || e.touches[0].pageX;
        const offsetY = e.nativeEvent.offsetY || e.touches[0].pageY;
        const x = (offsetX / zoomer.offsetWidth) * 100;
        const y = (offsetY / zoomer.offsetHeight) * 100;
        zoomer.style.backgroundPosition = `${x}% ${y}%`;
    };


    return (
        <>
            <Navbar></Navbar>
            <div className='py-20  md:px-0 px-5'>
                <div className="max-w-screen-xl mx-auto">
                    <section className='flex items-center justify-center text-2xl  h-full w-full gap-2'>
                        <Link to='/' className='hover:text-red-400'>Home</Link>
                        <span className='pt-2'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                        <span>Product Details</span>
                    </section>

                    <section className="bg-gray-100 py-5 mb-5 mt-5 px-5">
                        <div className="flex justify-start items-center text-md text-slate-600 w-full">
                            <Link to='/' className='hover:text-red-400'>Home</Link>
                            <span className='pt-1'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                            <Link to='/' className='hover:text-red-400'>{product.category}</Link>
                            <span className='pt-1'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                            <span className="text-green-500">{product.name}</span>
                        </div>

                    </section>

                    <section >
                        <div className="pb-16">
                            <div className="flex flex-col md:flex-row ">
                                <div className="md:w-6/12 w-full  mx-auto">
                                    <div className="p-2 border md:w-[500px]">
                                        <figure
                                            className="zoom relative w-full h-[350px] overflow-hidden cursor-zoom-in"
                                            onMouseMove={handleZoom}
                                            onTouchMove={handleZoom}
                                            style={{
                                                backgroundImage: `url(${image || product.images?.[1]})`,
                                                backgroundPosition: '50% 50%',
                                            }}
                                        >
                                            <img
                                                src={image || product.images?.[1]}
                                                alt=""
                                                className="transition-opacity duration-500 hover:opacity-0 block w-full h-full object-cover"
                                            />
                                        </figure>
                                    </div>
                                    <div className="py-3 md:w-10/12 w-full">
                                        {
                                            product.images && <Carousel
                                                autoPlay={true}
                                                infinite={true}
                                                transitionDuration={500}
                                                responsive={responsive}

                                            >
                                                {
                                                    product.images.map((img, i) => {
                                                        return (
                                                            <div key={i} className="pr-2 flex  justify-between cursor-pointer" onClick={() => setImage(img)}>
                                                                <img className=" h-[80px] hover:shadow-2xl hover:border-gray-950 hover:border" src={img} alt="" />
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </Carousel>
                                        }

                                    </div>
                                </div>



                                <div className="flex flex-col gap-5 md:w-6/12 w-full mx-auto">
                                    <div className="text-3xl text-slate-600 font-bold">
                                        <h2>{product.name}</h2>
                                    </div>
                                    <div className="flex justify-start items-center gap-4">
                                        <div className="flex text-xl">
                                            <Rating ratings={product.rating} />
                                        </div>
                                        <span className="text-green-500">({totalReview})</span>

                                    </div>
                                    <div className="  flex gap-3">



                                        {
                                            product?.discount ? <>
                                                <h2 className='line-through text-red-400 text-md font-semibold'>{product.price} Tk</h2>
                                                <h2 className="text-xl font-bold">{product.price - Math.floor((product.price * product.discount) / 100)} Tk <span className="text-green-500 text-md">(-{product.discount}%)</span></h2>
                                            </> : <h2 className="text-2xl font-bold">Price : {product.price} Tk</h2>
                                        }

                                    </div>

                                    <p>
                                        {product && product.description
                                            ? product.description.length > 200
                                                ? `${product.description.slice(0, 200)}...`
                                                : product.description
                                            : 'No description available'}
                                    </p>



                                    <div className="flex items-center text-xl rounded-md">
                                        <p className="mr-10 text-gray-500">Quantity:</p>
                                        <div onClick={decrement} className='px-2 border bg-red-50 cursor-pointer '>
                                            <FiMinus className="text-red-400 "></FiMinus>
                                        </div>
                                        <div className="px-6 ">{quantity}</div>
                                        <div onClick={increment} className='px-2 bg-green-50 border cursor-pointer'>
                                            <FiPlus className="text-green-500 "></FiPlus>
                                        </div>
                                    </div>



                                    <div className="flex items-center gap-5 pb-3 border-b">
                                        {
                                            product.stock ? <>
                                                {
                                                    product.stock ? <button onClick={buy} className='px-3 py-2 rounded-md cursor-pointer hover:shadow-lg hover:shadow-red-400/40 bg-red-400 text-white'>Buy Now</button> : ""
                                                }
                                                <div>
                                                    <button onClick={add_cart} className="px-3 rounded-md py-2 whitespace-nowrap cursor-pointer hover:shadow-lg hover:shadow-blue-500/40 bg-green-500 text-white"> Add to Cart</button>
                                                </div>
                                            </> : ''
                                        }

                                        <div>
                                            <div onClick={add_wishlist} className=" flex px-3 py-2 justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-red-400/40 bg-red-400 text-white rounded-md">
                                                <span className="text-lg">
                                                    <AiFillHeart></AiFillHeart>
                                                </span>
                                            </div>
                                        </div>

                                    </div>



                                    <div className='flex py-5 gap-5'>
                                        <div className='w-[150px] text-gray-500 font-bold text-xl flex flex-col gap-5 '>
                                            <span>Availability</span>

                                        </div>
                                        <div className='flex flex-col gap-5'>
                                            <span className={`text-${product.stock ? 'green' : 'red'}-500`}>
                                                {product.stock ? `In Stock(${product.stock})` : 'Out of Stock'}
                                            </span>
                                        </div>
                                    </div>
                                    {/* <div className='flex gap-3'>

                                        <Link to={`/dashboard/chat/${product.sellerId}`} className='px-8 rounded-md py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-green-500 text-white block'>Chat Seller</Link>
                                    </div> */}
                                </div>
                            </div>

                        </div>

                    </section>

                    <section>
                        <div className="pb-16">
                            <div className="flex flex-wrap gap-3">
                                <div className="w-full sm:w-full md:w-[72%] lg:w-[72%] xl:w-[72%] 2xl:w-[72%]">
                                    <div className="pr-4 sm:pr-0">
                                        <div className="grid grid-cols-2 gap-2">
                                            <button onClick={() => setState('reviews')} className={`py-1 rounded-full px-2 hover:text-white mb-2 hover:bg-gray-400 ${state === 'reviews' ? 'bg-gray-400 text-white ' : 'bg-slate-200 text-slate-700'}`}>Reviews</button>
                                            <button onClick={() => setState('description')} className={`py-1 px-2 mb-2 rounded-full hover:text-white hover:bg-gray-400 ${state === 'description' ? 'bg-gray-400 text-white' : 'bg-slate-200 text-slate-700'}`}>Description</button>
                                        </div>
                                        <div className="">
                                            {
                                                state === 'reviews' ? <Reviews product={product}></Reviews> : <p className="py-5 text-slate-600">{product.description}</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-full md:w-[27%] lg:w-[27%] xl:w-[27%]">
                                    <div className='pl-4 sm:pl-0'>
                                        <div className='px-3 py-1 text-slate-600 bg-slate-200 rounded'>
                                            <h2> From This Shop</h2>
                                        </div>
                                        <div className='flex flex-col items-center gap-5 mt-3 p-3'>
                                            {
                                                moreProducts.map((p, i) => {
                                                    return (
                                                        <Link className='block' key={i}>
                                                            <div key={p.id} className='border w-72 group transition-all duration-500 hover:shadow-md hover:-mt-3'>
                                                                <div className='relative overflow-hidden'>
                                                                    {
                                                                        p.discount ? <div className='flex justify-center items-center absolute badge bg-green-500 text-white  font-semibold text-xs right-2 top-2'>-{p.discount}%</div> : ''
                                                                    }
                                                                    <img className='h-[240px]' src={p.images[1]} alt={product.name} />
                                                                    <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                                                        <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>

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
                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
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

export default ProductDetails;