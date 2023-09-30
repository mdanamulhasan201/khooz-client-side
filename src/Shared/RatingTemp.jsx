
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
const RatingTemp = ({ rating }) => {
    if (rating === 5) {
        return (
            <>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
            </>
        )
    } else if (rating === 4) {
        return (
            <>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
            </>
        )
    }
    else if (rating === 3) {
        return (
            <>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
            </>
        )
    }
    else if (rating === 2) {
        return (
            <>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
            </>
        )
    }
    else if (rating === 1) {
        return (
            <>
                <span className="text-red-400"><AiFillStar></AiFillStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
            </>
        )
    }
    else {
        return (
            <>
                <span className="text-red-400"><CiStar></CiStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
                <span className="text-red-400"><CiStar></CiStar></span>
            </>
        )
    }
};

export default RatingTemp;