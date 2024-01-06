import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Range } from 'react-range'
import Products from './Products';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { price_range_product, query_products } from '../../store/reducers/homeReducer';


const Product = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    // console.log(products)
    const { categorys, latest_product, products, priceRange, totalProduct, parPage } = useSelector(state => state.home)

    useEffect(() => {
        dispatch(price_range_product())
    }, [])

    const [pageNumber, setPageNumber] = useState(1)
    const [category, setCategory] = useState('')
    const [sortPrice, setSortPrice] = useState('')
    const [state, setState] = useState({ values: [priceRange.low, priceRange.high] })
    const [searchValue, setSearchValue] = useState('')


    // price show
    useEffect(() => {
        setState({
            values: [priceRange.low, priceRange.high]
        })
    }, [priceRange])


    // category change

    const queryCategory = (e, value) => {
        if (e.target.checked) {
            setCategory(value)
        } else {
            setCategory('')
        }
    }

    useEffect(() => {
        dispatch(
            query_products({
                low: state.values[0],
                high: state.values[1],
                category,
                sortPrice,
                pageNumber
            })
        );
    }, [state.values[0], state.values[1], category, sortPrice, pageNumber]);
    

    const search = () => {
        navigate(`/products/search?category=${category}&&value=${searchValue}`)
    }
    return (
        <div className='py-20 '>
            <div className='max-w-screen-xl mx-auto'>
                <section className='flex items-center justify-center text-2xl  h-full w-full gap-2'>
                    <Link to='/' className='hover:text-red-500'>Home</Link>
                    <span className='pt-2'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                    <span className='text-green-500'>Products</span>
                </section>

                <section className='py-8'>

                    <div className='w-full flex flex-wrap'>
                        <div className='md:w-2/12 w-full ps-2'>
                            <h2 className='text-2xl font-bold mb-3 text-slate-600 '>Category</h2>
                            <div className='py-2'>
                                {
                                    categorys.map((c, i) => (
                                        <div className='flex justify-start items-center gap-2 py-1' key={i}>
                                            <input checked={category === c.name ? true : false} onChange={(e) => queryCategory(e, c.name)} type="checkbox" id={c.name} />
                                            <label className='text-slate-600 block cursor-pointer' htmlFor={c.name}>
                                                {c.name}
                                            </label>
                                        </div>
                                    ))
                                }

                            </div>
                            <div className='py-2 md:px-0 px-2 flex flex-col gap-5'>
                                <h2 className='text-2xl font-bold mb-3 text-slate-600'>Price</h2>
                                <Range
                                    step={5}
                                    min={priceRange.low}
                                    max={priceRange.high}
                                    values={state.values}
                                    onChange={(values) => setState({ values })}
                                    renderTrack={({ props, children }) => (
                                        <div {...props} className='w-full h-[6px] bg-slate-200 rounded-full cursor-pointer'>
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div className='w-[15px] h-[15px] bg-red-400 rounded-full'  {...props} />


                                    )}
                                />
                                <div>
                                    <span className='text-red-400 font-bold text-lg'> <span ></span> {Math.floor(state.values[0])} Tk - <span ></span> {Math.floor(state.values[1])} Tk </span>
                                </div>
                            </div>

                            <div className='my-10 px-2 md:px-0'>
                                <p className='text-xl font-bold text-gray-600 mb-5'>discount Products</p>
                                <div className='flex flex-col justify-start gap-2 '>

                                    {
                                        latest_product.map((p, i) => (
                                            p.discount ? (
                                                <Link key={i} to={`/product/details/${p.slug}`} className='flex md:flex-col xl:flex-row justify-between border'>
                                                    <img className='w-[110px] h-[110px]' src={p.images[1]} alt="images" />
                                                    <div className='px-3 flex justify-center items-center gap-1 flex-col text-slate-600'>
                                                        <h2 className='text-gray-500 font-semibold'>{p.name}</h2>
                                                        <p className='text-green-500 text-end'>{p.discount}% Off</p>
                                                        <span className='text-lg font-bold'>{p.price} Tk</span>
                                                    </div>
                                                </Link>
                                            ) : null
                                        ))
                                    }



                                </div>
                            </div>
                        </div>


                        <div className='w-10/12'>
                            <div className='pl-10 '>
                                <div className='py-2 bg-white mb-5 px-2 rounded-md flex flex-col md:flex-row gap-6 justify-between items-center border'>





                                    <div className='flex'>
                                        <input onChange={(e) => setSearchValue(e.target.value)} className='w-full rounded-s-md border py-2  relative bg-transparent text-stone-500 outline-0 px-3 h-full ' type="text" name="" id="" placeholder="Find your Product" required />
                                        <button onClick={search} className='outline-none rounded-r-md bg-green-500 text-white hover:bg-green-400  px-3  font-semibold '>Search</button>
                                    </div>


                                    <select onChange={(e) => setSortPrice(e.target.value)} className='p-1 border outline-0 text-slate-600 font-semibold' name='' id=''>
                                        <option value="">Sort By</option>
                                        <option value="low-high">Low to High</option>
                                        <option value="high-low">High to Low </option>
                                    </select>


                                </div>
                                <div className='pb-8 '>

                                    <Products products={products} />

                                </div>

                                <div>
                                    {
                                        totalProduct > parPage && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalProduct} perPage={parPage} showItem={Math.floor(totalProduct / parPage) + 1} />
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>

        </div>
    );
};

export default Product;