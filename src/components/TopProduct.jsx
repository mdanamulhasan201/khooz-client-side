import { BiRightArrowAlt } from "react-icons/bi";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../Shared/Rating";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart, messageClear, add_to_wishlist } from "../store/reducers/cartReducer";
import { useEffect } from "react";
import toast from "react-hot-toast";
import './topProduct.css'


const TopProduct = ({ products }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, errorMessage } = useSelector(state => state.cart)


    const add_cart = (id) => {
        if (userInfo) {
            dispatch(add_to_cart({
                userId: userInfo.id,
                quantity: 1,
                productId: id
            }))
        } else {
            navigate('/login')
        }
    }


    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage])

    // wishlist

    const add_wishlist = (prod) => {
        dispatch(add_to_wishlist({
            userId: userInfo.id,
            productId: prod._id,
            name: prod.name,
            price: prod.price,
            image: prod.images[1],
            discount: prod.discount,
            rating: prod.rating,
            slug: prod.slug
        }))
    }


    return (
        <div className='max-w-screen-xl mx-auto  mb-20'>

            <div className="grid justify-center">
                <span className=' text-center font-bold  text-2xl mb-8 underLine'>Top Products</span>

            </div>

            <div className='w-full  grid md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center items-center'>

                {
                    products.filter(p => p.rating === 5).slice(0, 8).map((p, i) => <div key={i} className='border rounded-lg w-64 transition-all duration-500 hover:shadow-md hover:-mt-3'>
                        <div className='relative overflow-hidden'>

                            {
                                p.discount ? <div className='flex justify-center items-center absolute badge bg-green-500 text-white  font-semibold text-xs right-2 top-2'>{p.discount}%</div> : ''
                            }

                            <img className='h-[240px] w-64 rounded-t-lg' src={p.images[1]} alt="Refrigerator Compressor Spare Part" />

                            <ul className='flex justify-center items-center text-xl text-black gap-2  w-full '>

                                <li onClick={() => add_wishlist(p)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>

                                <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all' ><FaEye /></Link>

                                <li onClick={() => add_cart(p._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>
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
            <div className='flex items-center justify-end mt-5 '>
                <Link to='/allProducts' className='font-semibold mr-6  text-black hover:text-red-500 flex items-center'>

                    <h1 className='text-lg'>All Products</h1>
                    <div>
                        <BiRightArrowAlt className=' text-2xl'></BiRightArrowAlt>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default TopProduct;