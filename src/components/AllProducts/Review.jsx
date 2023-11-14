import { useEffect, useState } from "react";
import RatingReact from 'react-rating'
import { CiStar } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Rating from "../../Shared/Rating";
import RatingTemp from "../../Shared/RatingTemp";
import { useDispatch, useSelector } from "react-redux";
import { customer_review, messageClear, get_reviews, get_product_details } from "../../store/reducers/homeReducer";
import toast from "react-hot-toast";


const Reviews = ({ product }) => {


    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, errorMessage, reviews, totalReview, rating_review } = useSelector(state => state.home)
    const [rat, setRat] = useState('')
    const [review, setReview] = useState('')

    const reviewsPerPage = 5; // Number of reviews to display per page
    const [currentPage, setCurrentPage] = useState(1);

    const review_submit = (e) => {
        e.preventDefault()
        const obj = {
            name: userInfo.name,
            review: review,
            rating: rat,
            productId: product._id
        }
        dispatch(customer_review(obj))
    }


    useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            dispatch(get_reviews({
                productId: product._id,
                // pageNumber
            }))
            dispatch(get_product_details(product.slug))
            setRat('')
            setReview('')
            dispatch(messageClear())

        }
    }, [errorMessage, successMessage])

    useEffect(() => {
        if (product._id) {
            dispatch(get_reviews({
                productId: product._id,
                // pageNumber
            }))
        }
    }, [product])



    // Calculate the total number of pages
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;

    // Slice the reviews array to display only the current page's reviews
    const currentReviews = reviews.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className="mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 ">
                <div className="flex flex-col gap-2 justify-start items-center py-4 ">
                    <div>
                        <span className="text-6xl font-semibold">{product.rating}</span>
                        <span className="text-3xl font-semibold text-slate-600">/5</span>
                    </div>
                    <div className="flex text-4xl">
                        <Rating ratings={product.rating}></Rating>
                    </div>

                </div>
                <div className="flex gap-2 flex-col py-4 ">
                    <div className="flex justify-start items-center gap-5 ">
                        <div className="text-md flex gap-1 w-[94px]">
                            <RatingTemp rating={5}></RatingTemp>
                        </div>
                        <div className="w-[200px] h-[14px] bg-slate-200 relative">
                            <div style={{ width: `${Math.floor((100 * (rating_review[0]?.sum || 0)) / totalReview)}%` }} className="h-full bg-red-400 "></div>
                        </div>
                        <p className="text-sm text-slate-600 w-[0%]">{rating_review[0]?.sum}</p>
                    </div>
                    <div className="flex justify-start items-center gap-5 ">
                        <div className="text-md flex gap-1 w-[94px]">
                            <RatingTemp rating={4}></RatingTemp>
                        </div>
                        <div className="w-[200px] h-[14px] bg-slate-200 relative">
                            <div style={{ width: `${Math.floor((100 * (rating_review[1]?.sum || 0)) / totalReview)}%` }} className="h-full bg-red-400 "></div>
                        </div>
                        <p className="text-sm text-slate-600 w-[0%]">{rating_review[1]?.sum}</p>
                    </div>
                    <div className="flex justify-start items-center gap-5 ">
                        <div className="text-md flex gap-1 w-[94px]">
                            <RatingTemp rating={3}></RatingTemp>
                        </div>
                        <div className="w-[200px] h-[14px] bg-slate-200 relative">
                            <div style={{ width: `${Math.floor((100 * (rating_review[2]?.sum || 0)) / totalReview)}%` }} className="h-full bg-red-400"></div>
                        </div>
                        <p className="text-sm text-slate-600 w-[0%]">{rating_review[2]?.sum}</p>
                    </div>
                    <div className="flex justify-start items-center gap-5 ">
                        <div className="text-md flex gap-1 w-[94px]">
                            <RatingTemp rating={2}></RatingTemp>
                        </div>
                        <div className="w-[200px] h-[14px] bg-slate-200 relative">
                            <div style={{ width: `${Math.floor((100 * (rating_review[3]?.sum || 0)) / totalReview)}%` }} className="h-full bg-red-400"></div>
                        </div>
                        <p className="text-sm text-slate-600 w-[0%]">{rating_review[3]?.sum}</p>
                    </div>
                    <div className="flex justify-start items-center gap-5 ">
                        <div className="text-md flex gap-1 w-[94px]">
                            <RatingTemp rating={1}></RatingTemp>
                        </div>
                        <div className="w-[200px] h-[14px] bg-slate-200 relative">
                            <div style={{ width: `${Math.floor((100 * (rating_review[4]?.sum || 0)) / totalReview)}%` }} className="h-full bg-red-400 "></div>
                        </div>
                        <p className="text-sm text-slate-600 w-[0%]">{rating_review[4]?.sum}</p>
                    </div>
                    <div className="flex justify-start items-center gap-5 ">
                        <div className="text-md flex gap-1 w-[94px]">
                            <RatingTemp rating={0}></RatingTemp>
                        </div>
                        <div className="w-[200px] h-[14px] bg-slate-200 relative">
                            <div className="h-full bg-red-400 "></div>
                        </div>
                        <p className="text-sm text-slate-600 w-[0%]">0</p>
                    </div>


                </div>
            </div>

            <h2 className="text-slate-600 text-xl font-bold py-5">Products Reviews {totalReview}</h2>
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
                        <textarea value={review} required onChange={(e) => setReview(e.target.value)} className="border outline-0 p-3 w-full" name="" id="" cols="30" rows="5"></textarea>
                        <div className="mt-2">
                            <button className="py-1 px-5 bg-blue-500 text-white rounded-sm">Submit</button>
                        </div>
                    </form>
                </div> : <div>
                    <Link className="py-1 px-5 bg-blue-500 text-white rounded-sm" to='/login'>Login</Link>
                </div>
            }
        </div>


    );
};

export default Reviews;