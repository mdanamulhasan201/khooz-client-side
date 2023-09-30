import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Rating from "../Shared/Rating";
// import Rating from "../../Shared/Rating";
const FavouriteProvider = () => {
    return (
        <div className='container mx-auto -mt-20 '>

        <div>
            <h1 className='md:ms-6 font-bold text-left text-2xl mb-5'>Top Providers</h1>
        </div>

        <div className='w-full grid md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>

            {
                [1, 2, 3, 4].map((p, i) => <div key='' className="card mx-auto w-80 bg-base-100 border transition-all duration-500 hover:shadow-md hover:-mt-3">
                    <div className='flex justify-center items-center absolute badge bg-red-500 text-white  font-semibold text-xs right-2 top-2'>Top</div>
                    <img src="https://paylesspowerpoles.com.au/wp-content/uploads/2021/05/Level-2-Electrician-Near-Me-1.jpg" alt="Shoes" />
                    <div className="card-body">
                        <h2 className="card-title">
                            Md. Anamul Hasan
                            {/* <div className="">Top</div> */}
                        </h2>
                        <p>Electrician</p>
                        <p>Location:Tangail</p>
                        <div className='flex justify-between items-center gap-3'>
                            <div className='flex'>
                                <Rating ratings={4.5} />
                            </div>
                            <Link to=''><span className='text-md badge badge-outline'>Details</span></Link>
                        </div>
                    </div>
                </div>)
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