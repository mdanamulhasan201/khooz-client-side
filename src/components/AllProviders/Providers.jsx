
import { Link } from "react-router-dom";
import Rating from "../../Shared/Rating";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Providers = ({sellers}) => {

   
    return (
        <div className='container mx-auto  '>


            <div className='w-full grid md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>

                {sellers
                    .filter((p) => p.status === 'active')
                    .map((p, i) => (
                        <div key={i} className="card mx-auto  w-72 bg-base-100 border transition-all duration-500 hover:shadow-md hover:-mt-3">
                            {/* <div className='flex justify-center items-center absolute badge bg-red-500 text-white  font-semibold text-xs right-2 top-2'>Top</div> */}
                            <img className="h-[240px] w-72 rounded-t-xl " src={p.image} alt="images" />
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
                                        <Link to={`/provider/details/${p._id}`}>
                                            <p className='text-md flex items-center justify-center border border-gray-600 outline-none hover:border-white rounded-full  hover:bg-red-400 hover:text-white px-2 ' style={{
                                                transition: 'background-color 0.3s ease, color 0.3s ease' // Set the easing time here (0.3s in this example)
                                            }}>
                                                <span>Details</span>
                                                <MdOutlineKeyboardArrowRight className="text-lg" />
                                            </p>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default Providers;