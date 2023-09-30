
import { Link } from "react-router-dom";
import Rating from "../../Shared/Rating";

const Providers = () => {
    return (
        <div className='container mx-auto  '>

      
        <div className='w-full grid md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>

            {
                [1, 2, 3, 4].map((p, i) => <div key='' className="card mx-auto w-72 bg-base-100 border transition-all duration-500 hover:shadow-md hover:-mt-3">
                    
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
    
    </div>
    );
};

export default Providers;