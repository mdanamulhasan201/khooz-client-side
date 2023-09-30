import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

import {  AiOutlineShoppingCart } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import Rating from "../../Shared/Rating";
import Reviews from "./Review";
import Footer from "../../Shared/Footer";
import Navbar from "../Navbar";
import './solved.css'




const ProductDetails = () => {
    const [image, setImage] = useState('')
    const [state, setState] = useState('reviews')


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

    const images = [1, 2, 3, 4, 5, 6]
    const discount = 10
    const stock = 5

    const products = [
        {
            id: 1,
            name: 'Product 1',
            image: 'https://5.imimg.com/data5/JT/BF/YL/SELLER-45760580/refrigerator-spare-parts.jpg',
            price: 19.99,
            rating: 4.5,
        },
        {
            id: 2,
            name: 'Product 2',
            image: 'https://5.imimg.com/data5/JT/BF/YL/SELLER-45760580/refrigerator-spare-parts.jpg',
            price: 29.99,
            rating: 4.0,
        },
        {
            id: 3,
            name: 'Product 2',
            image: 'https://5.imimg.com/data5/JT/BF/YL/SELLER-45760580/refrigerator-spare-parts.jpg',
            price: 29.99,
            rating: 4.0,
        }
      
      
     
     



        // Add more product objects as needed
    ];
    return (
       <>
       <Navbar></Navbar>
       <div className='py-20'>
            <div className="container mx-auto ">
                <section className='flex items-center justify-center text-2xl  h-full w-full gap-2'>
                    <Link to='/' className='hover:text-red-400'>Home</Link>
                    <span className='pt-2'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                    <span>Product Details</span>
                </section>

                <section className="bg-gray-100 py-5 mb-5 mt-5 px-5">
                    <div className="flex justify-start items-center text-md text-slate-600 w-full">
                        <Link to='/' className='hover:text-red-400'>Home</Link>
                        <span className='pt-1'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                        <Link to='/' className='hover:text-red-400'>Freeze</Link>
                        <span className='pt-1'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                        <span>Compresser</span>
                    </div>

                </section>

                <section className="">
                    <div className="pb-16">
                        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            <div>
                                <div className="p-5 border ">
                                    <img className="w-full h-[350px] " src={image ? `http://localhost:3000/images/products/${image}.jpg` : `http://localhost:3000/images/products/${images[1]}.jpg`} alt="" />

                                </div>
                                <div className="py-3 ">
                                    {
                                        images && <Carousel
                                            autoPlay={true}
                                            infinite={true}
                                            transitionDuration={500}
                                            responsive={responsive}

                                        >
                                            {
                                                images.map((img, i) => {
                                                    return (
                                                        <div key={i} className="pr-2 border cursor-pointer" onClick={() => setImage(img)}>
                                                            <img className="w-full h-[80px] hover:shadow-2xl hover:border-gray-950 hover:border" src={`http://localhost:3000/images/products/${img}.jpg`} alt="" />
                                                        </div>
                                                    )
                                                })
                                            }

                                        </Carousel>
                                    }

                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="text-3xl text-slate-600 font-bold">
                                    <h2>Compressor</h2>
                                </div>
                                <div className="flex justify-start items-center gap-4">
                                    <div className="flex text-xl">
                                        <Rating ratings={4.5} />
                                    </div>
                                    <span className="text-green-500">(22 reviews)</span>

                                </div>
                                <div className="  flex gap-3">
                                    {
                                        discount ? <>
                                            <h2 className="line-through text-red-400 text-xl font-bold">500 Tk</h2>
                                            <h1 className="text-2xl font-bold">{500 - Math.floor((500 * discount) / 100)} Tk <span className="text-lg font-medium  text-green-500">(-{discount}%)</span></h1>
                                        </> : <h2 className="text-2xl font-bold">Price: 500 Tk</h2>
                                    }
                                </div>

                                <div className="text-slate-600">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque quasi dolorem velit similique ad placeat voluptatum explicabo sed eos sit.</p>
                                </div>
                                <div className="flex gap-3 pb-3 border-b">
                                    {
                                        stock ? <>
                                            <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl ">
                                                <div className="px-6 cursor-pointer ">-</div>
                                                <div className="px-6 ">5</div>
                                                <div className="px-6 cursor-pointer ">+</div>
                                            </div>
                                            <div>
                                                <button className="px-10 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-blue-500/40 bg-blue-500 text-white"> Cart</button>
                                            </div>
                                        </> : ''
                                    }

                                    <div>
                                        <div className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-red-400/40 bg-red-400 text-white">
                                            <span className="text-lg">
                                                <AiFillHeart></AiFillHeart>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div className='flex py-5 gap-5'>
                                    <div className='w-[150px] text-black font-bold text-xl flex flex-col gap-5'>
                                        <span>Availability</span>

                                    </div>
                                    <div className='flex flex-col gap-5'>
                                        <span className={`text-${stock ? 'green' : 'red'}-500`}>
                                            {stock ? `In Stock(${stock})` : 'Out of Stock'}
                                        </span>

                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    {
                                        stock ? <button className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-400/40 bg-red-400 text-white'>Buy Now</button> : ""
                                    }
                                    <Link to='' className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-lime-500/40 bg-lime-500 text-white block'>Chat Seller</Link>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>

                <section>
                    <div className="pb-16">
                        <div className="flex flex-wrap gap-3">
                            <div className="w-full sm:w-full md:w-[72%] lg:w-[72%] xl:w-[72%] 2xl:w-[72%]">
                                <div className="pr-4 sm:pr-0">
                                    <div className="grid grid-cols-2">
                                        <button onClick={() => setState('reviews')} className={`py-1 px-5 hover:text-white mb-2 hover:bg-gray-500 ${state === 'reviews' ? 'bg-gray-500 text-white' : 'bg-slate-200 text-slate-700'}`}>Reviews</button>
                                        <button onClick={() => setState('description')} className={`py-1 px-5 mb-2 hover:text-white hover:bg-gray-500 ${state === 'description' ? 'bg-gray-500 text-white' : 'bg-slate-200 text-slate-700'}`}>Description</button>
                                    </div>
                                    <div className="">
                                        {
                                            state === 'reviews' ? <Reviews></Reviews> : <p className="py-5 text-slate-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque quasi dolorem velit similique ad placeat voluptatum explicabo sed eos sit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque quasi dolorem velit similique ad placeat voluptatum explicabo sed eos sit.</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-full md:w-[27%] lg:w-[27%] xl:w-[27%]">
                                <div className='pl-4 sm:pl-0'>
                                    <div className='px-3 py-1 text-slate-600 bg-slate-200'>
                                        <h2> From Anamul Store</h2>
                                    </div>
                                    <div className='flex flex-col items-center gap-5 mt-3 border p-3'>
                                        {
                                            products.map((p, i) => {
                                                return (
                                                    <Link className='block' key={i}>
                                                        <div key={products.id} className='border w-72 group transition-all duration-500 hover:shadow-md hover:-mt-3'>
                                                            <div className='relative overflow-hidden'>
                                                                <div className='flex justify-center items-center absolute badge bg-red-500 text-white  font-semibold text-xs right-2 top-2'>5%</div>
                                                                <img className='h-[240px]' src={`http://localhost:3000/images/products/1.jpg`} alt={products.name} />
                                                                <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                                                    <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>

                                                                    <Link to='/product/details/dfgh' className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all' ><FaEye /></Link>

                                                                    <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>
                                                                </ul>
                                                            </div>
                                                            <div className='py-3 text-slate-600 px-2'>
                                                                <h2>{products.name}</h2>
                                                                <div className='flex justify-between items-center gap-3'>
                                                                    <div className='flex'>
                                                                        <Rating ratings={4.5} />
                                                                    </div>
                                                                    <span className='text-lg  font-bold'>{products.price} Tk</span>
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