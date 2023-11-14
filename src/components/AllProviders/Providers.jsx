
import { Link } from "react-router-dom";
import Rating from "../../Shared/Rating";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Providers = ({ sellers }) => {


    return (
        <>


            <h2 className='text-center text-lg mb-7  text-slate-600 font-semibold'>
                {sellers.length === 0
                    ? 'No results found'
                    : `Results found: ${sellers.length}`}
            </h2>

            <div className='w-full grid md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>

                {sellers
                    .filter((p) => p.status === 'active')
                    .map((p, i) => (
                        <div key={i} className="card mx-auto  w-64 bg-base-100 border transition-all duration-500 hover:shadow-md hover:-mt-3">
                            {/* <div className='flex justify-center items-center absolute badge bg-red-500 text-white  font-semibold text-xs right-2 top-2'>Top</div> */}
                            <img className="h-[220px]  w-64  rounded-t-xl " src={p.image} alt="images" />
                            <div className="card-body">
                                <h2 className="text-lg font-semibold">
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
                                       
                                        <Link to={`/provider/details/${p._id}`}>
                                            <button className='flex justify-center items-center text-md badge transform duration-500 hover:bg-red-400 hover:text-white hover:border-red-400 badge-outline'>
                                               <span> Details</span> <MdOutlineKeyboardArrowRight className="text-lg" />
                                            </button>
                                            
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

        </>
    );
};

export default Providers;