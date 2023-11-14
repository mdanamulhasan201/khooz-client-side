import { BiRightArrowAlt } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import Rating from "../Shared/Rating";
import { useDispatch, useSelector } from "react-redux";
import { get_provider_request, get_provider_details } from "../store/reducers/providerReducer";
import { useEffect, useState } from "react";
import './topProduct.css'
const FavouriteProvider = () => {



    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')

    const { sellerId } = useParams()
    const { sellers } = useSelector(state => state.provider)


    useEffect(() => {
        dispatch(get_provider_request({
            searchValue,
        }))

    }, [searchValue])

    useEffect(() => {
        dispatch(get_provider_details(sellerId))

    }, [sellerId])

    const fiveStarSellers = sellers
        .filter(p => p.status === 'active' && p.rating === 5)
        .slice(0, 8);
    return (
        <div className=' mt-0 md:-mt-5 lg:-mt-16'>

            <div className="grid justify-center">
                <span className=' text-center font-bold  text-2xl mb-8 underLine'>Top Provider</span>

            </div>

            <div className='w-full grid md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {fiveStarSellers
                    .filter((p) => p.status === 'active')
                    .map((p, i) => (
                        <div key={i} className="card mx-auto w-64 bg-base-100 border transition-all duration-500 hover:shadow-md hover:-mt-3">
                            {/* <div className='flex justify-center items-center absolute badge bg-red-500 text-white  font-semibold text-xs right-2 top-2'>Top</div> */}
                            <img className="h-[240px] w-64 rounded-t-xl " src={p.image} alt="images" />
                            <div className="card-body">
                                <h2 className="card-title">
                                    {p.name}
                                    {/* <div className="">Top</div> */}
                                </h2>
                                <div className="flex justify-between">
                                    <div>
                                        <p>{p.shopInfo.category}</p>
                                    </div>
                                    <div>
                                        <p>District: {p.shopInfo.district}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center gap-3'>
                                    <div className='flex'>
                                        <Rating ratings={p.rating} />
                                    </div>
                                    <div>
                                        <Link to={`/provider/details/${p._id}`}><span className='text-md badge badge-outline'>Details</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }


            </div>

            <div className='flex items-center justify-end mt-5 '>
                <Link to='/allProviders' className='font-semibold mr-6  text-black hover:text-red-500 flex items-center'>

                    <h1 className='text-lg'> All Provider</h1>
                    <div>
                        <BiRightArrowAlt className=' text-2xl'></BiRightArrowAlt>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default FavouriteProvider;