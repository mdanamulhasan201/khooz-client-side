import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Range } from 'react-range'
import { useDispatch, useSelector } from 'react-redux';
import { price_range_product, query_products } from '../store/reducers/homeReducer';
import Pagination from '../components/Pagination';
import Products from '../components/AllProducts/Products';

const SearchProducts = () => {

    let [searchParams, setSearchParams] = useSearchParams()

    const category = searchParams.get('category')
    const searchValue = searchParams.get('value')
    const { latest_product, products, priceRange, totalProduct, parPage } = useSelector(state => state.home)
    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(1)
    const [sortPrice, setSortPrice] = useState('')
    const [state, setState] = useState({ values: [priceRange.low,priceRange.high] })

    useEffect(() => {
        dispatch(price_range_product())
    }, [])

    // price show
    useEffect(() => {
        setState({
            values: [priceRange.low, priceRange.high]
        })
    }, [priceRange])



    useEffect(() => {
        dispatch(
            query_products({
                low: state.values[0] || '',
                high: state.values[1] || '',
                category,
                sortPrice,
                pageNumber,
                searchValue

            })
        )
    }, [state.values[0], state.values[1], category, sortPrice, pageNumber, searchValue])

    return (
        <div className='py-20'>
            <div className='container mx-auto'>
                <section className='flex items-center justify-center text-2xl  h-full w-full gap-2'>
                    <Link to='/' className='hover:text-red-500'>Home</Link>
                    <span className='pt-2'><MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight></span>
                    <span>Products</span>
                </section>

                <section className='py-16'>

                    <div className='w-full flex flex-wrap'>
                        <div className='md:w-2/12 w-full ps-2'>
                            <div className='py-2 px-2 md:px-0 justify-center flex flex-col gap-5'>
                                <h2 className='text-3xl font-bold mb-3 text-slate-600'>Price</h2>
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

                            <div className='my-10'>
                                <p className='text-xl font-bold text-gray-600 mb-5'>Discount Products</p>
                                <div className='px-2 md:px-0'>

                                    {
                                        latest_product.map((p, i) => (
                                            p.discount ? (
                                                <Link key={i} to={`/product/details/${p.slug}`} className='flex md:flex-col xl:flex-row justify-between border'>
                                                <img className='w-[110px] h-auto' src={p.images[1]} alt="images" />
                                                <div className='px-3 flex justify-center items-center gap-1 flex-col text-slate-600'>
                                                    <h2 className='text-gray-500 font-semibold text-center'>{p.name}</h2>
                                                    <p className='text-green-500 text-center'>{p.discount}% Off</p>
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
                            <div className='pl-8 '>
                                <div className='py-3 bg-white mb-10 px-3 rounded-md flex justify-between items-center border'>
                                <h2 className='text-lg font-semibold  text-slate-600 '>{totalProduct} Products</h2>
                                        <div>
                                            <Link className='bg-red-400 text-white px-3 py-2' to='/allProducts'>All Product</Link>
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

export default SearchProducts;