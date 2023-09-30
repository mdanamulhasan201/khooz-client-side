
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Rating from '../../Shared/Rating';

const Products = ({ products }) => {
 
    return (
        <div>
            {/* Product grid */}
            <div className='w-full grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5'>
                {products.map((product, i) => (
                    <div key={i} className='border w-72 group transition-all duration-500 hover:shadow-md hover:-mt-3'>
                        <div className='relative overflow-hidden'>
                            {
                                product.discount ? <div className='flex justify-center items-center absolute badge bg-green-500 text-white  font-semibold text-xs right-2 top-2'>{product.discount}%</div> : ''
                            }

                            <img className='h-[240px]' src={product.images[1]} alt={product.name} />
                            <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>

                                <Link to='/product/details/dfgh' className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all' ><FaEye /></Link>

                                <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-400 hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>
                            </ul>
                        </div>
                        <div className='py-3 text-slate-600 px-2'>
                            <h2>{product.name}</h2>
                            <div className='flex justify-between items-center gap-3'>
                                <div className='flex'>
                                    <Rating ratings={product.rating} />
                                </div>
                                <span className='text-lg  font-bold'>{product.price} Tk</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
