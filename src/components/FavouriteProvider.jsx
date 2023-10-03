import { BiRightArrowAlt } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import Rating from "../Shared/Rating";
import { useDispatch, useSelector } from "react-redux";
import { get_provider_request, get_provider_details } from "../store/reducers/providerReducer";
import { useEffect, useState } from "react";

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
    return (
        <div className='container mx-auto -mt-20 '>

            <div>
                <h1 className='md:ms-6 font-bold text-left text-2xl mb-5'>Feature Providers</h1>

                {/* <Search setSearchValue={setSearchValue} searchValue={searchValue}></Search> */}
            </div>

            <div className='w-full grid md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {sellers
                    .filter((p) => p.status === 'active')
                    .map((p, i) => (
                        <div key={i} className="card mx-auto  w-[300px] bg-base-100 border transition-all duration-500 hover:shadow-md hover:-mt-3">
                            {/* <div className='flex justify-center items-center absolute badge bg-red-500 text-white  font-semibold text-xs right-2 top-2'>Top</div> */}
                            <img className="h-[280px] w-[300px] " src={p.image} alt="images" />
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
                <button className='font-semibold mr-6  text-black hover:text-red-500 flex items-center'>

                    <h1 className='text-xl'> Show More</h1>
                    <div>
                        <BiRightArrowAlt className=' text-2xl'></BiRightArrowAlt>
                    </div>
                </button>

            </div>
        </div>
    );
};

export default FavouriteProvider;