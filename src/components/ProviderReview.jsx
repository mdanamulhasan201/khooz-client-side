import React, { useEffect, useState } from 'react';
import RatingReact from 'react-rating'
import { AiFillStar } from 'react-icons/ai';
import { CiStar } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { messageClear, provider_review, get_provider_reviews } from '../store/reducers/homeReducer';
import toast from 'react-hot-toast';
import RatingTemp from '../Shared/RatingTemp';

const ProviderReview = ({ seller }) => {

    const dispatch = useDispatch()

    const [rat, setRat] = useState('')
    const [rev, setRev] = useState('')
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, reviewss, totalReviews, rating_reviews } = useSelector(state => state.home)

    console.log(rating_reviews)

    const reviewsPerPage = 5; // Number of reviews to display per page
    const [currentPage, setCurrentPage] = useState(1);

    const review_submit = (e) => {
        e.preventDefault()
        const obj = {
            name: userInfo.name,
            review: rev,
            rating: rat,
            sellerId: seller._id
        }
        dispatch(provider_review(obj))
    }


    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(get_provider_reviews({
                sellerId: seller._id,
                // pageNumber
            }))
            setRat('')
            setRev('')
            dispatch(messageClear())


        }
    }, [successMessage])



    // get seller review
    useEffect(() => {
        if (seller._id) {
            dispatch(get_provider_reviews({
                sellerId: seller._id,
                // pageNumber
            }))
        }
    }, [seller])



    // Calculate the total number of pages
    const totalPages = Math.ceil(reviewss.length / reviewsPerPage);

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;

    // Slice the reviews array to display only the current page's reviews
    const currentReviews = reviewss.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='mt-14   mx-2 md:mx-0'>

            <div className='flex flex-col-reverse md:flex-row gap-10 md:mx-0 mx-2 '>
                <div className='flex flex-col lg:w-6/12 md:w-full w-full justify-center '>
                    <h2 className="text-slate-600 text-xl font-bold py-5">Total Reviews {totalReviews}</h2>
                    <div className="flex flex-col gap-8 pb-10 pt-4">
                        {currentReviews.map((review, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 text-md ">{review.name}</span>

                                    <span className="text-slate-600">{review.date}</span>
                                </div>
                                <div className="flex gap-1 text-xl">
                                    <RatingTemp rating={review.rating}></RatingTemp>
                                </div>
                                <p className="text-slate-600 text-sm ">{review.review}</p>
                            </div>
                        ))}
                    </div>



                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        <ul className="flex space-x-2">
                            {Array.from({ length: totalPages }).map((_, page) => (
                                <li
                                    key={page}
                                    onClick={() => handlePageChange(page + 1)}
                                    className={`cursor-pointer px-2 py-1 rounded-full ${currentPage === page + 1 ? 'bg-red-500 text-white' : 'bg-gray-200'
                                        }`}
                                >
                                    {page + 1}
                                </li>
                            ))}
                        </ul>
                    </div>




                    <div className='my-5'>
                        <h2 className=" my-5 text-slate-600 text-lg font-semibold">Your Feedback</h2>




                        {
                            userInfo ? <div className="flex flex-col gap-3">
                                <div className="flex gap-1">
                                    <RatingReact
                                        onChange={(e) => setRat(e)}
                                        initialRating={rat}
                                        emptySymbol={<span className="text-slate-600 text-4xl"><CiStar></CiStar></span>}
                                        fullSymbol={<span className="text-red-400 text-4xl"><AiFillStar></AiFillStar></span>}
                                    ></RatingReact>

                                </div>
                                <form onSubmit={review_submit} action="">
                                    <textarea value={rev} required onChange={(e) => setRev(e.target.value)} className="border outline-0 p-3 w-full" name="" id="" cols="30" rows="5"></textarea>
                                    <div className="mt-2">
                                        <button className="py-1 px-5 bg-green-500 text-white rounded-sm">Submit</button>
                                    </div>
                                </form>
                            </div> : <div>
                                <Link className="py-1 px-5 bg-green-500 text-white rounded-sm" to='/login'>Login</Link>
                            </div>
                        }



                    </div>


                </div>

                <div className='md:w-[1px] w-0  h-0 md:h-[550px] bg-gray-400'></div>

                <div className='lg:w-6/12 md:w-full w-full'>

                    <div className=' h-full'>
                        <h2 className='mt-2 ms-5 flex flex-col font-semibold text-xl'> About </h2>
                        <span className='text-[18px] ms-5'>{seller?.shopInfo?.about} </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProviderReview;