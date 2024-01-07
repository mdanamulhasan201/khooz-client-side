import { useEffect, useState } from "react";
import './Banner.css'
import SearchBar from "./SearchBar";


const Banner = () => {
    const images = [
        'https://renovation.thememove.com/wp-content/uploads/2021/02/n_hreno_congnhan.png',
    ];

    const textContent = [
        "Hire Experts & Get Your Job Done!",
        "Find Reliable Professionals for Your Projects!",

    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const backgroundImage = {
        backgroundImage: `url('https://demo.casethemes.net/hardman/wp-content/uploads/2022/12/bgr-slide2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(10px)',
    };

    return (
        <div className='relative bg-[#F8F5FF]' style={backgroundImage} >
            <svg
                className="absolute left-0 bottom-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                <path
                    d="M600,65.77C268.63,65.77,0,30.52,0,30.23V120H1200V30.23C1200,30.52,931.37,65.77,600,65.77Z"
                    className="shape-fill"
                    fill="#fff"
                />
            </svg>

            <div className="hero h-[800px] pt-[70px]  md:pt-38 lg:pt-0 px-3 md:px-3 lg:px-0 justify-between flex  flex-col lg:flex-row max-w-screen-xl mx-auto">

                <div className="flex-1 lg:order-1 flex flex-col justify-center px-4 lg:px-8 ">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4">{textContent[currentImageIndex]}</h1>
                    <p className="py-2 text-gray-500">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                        a id nisi.
                    </p>
                    <div className=" my-4 md:my-7">
                        <a href="http://localhost:3001/login" target="_blank" rel="noreferrer" className="border transform hover:scale-105 transition-transform duration-300 font-semibold py-2 px-2 rounded-md bg-green-500 text-white">Become a provider or seller</a>
                    </div>

                    <SearchBar></SearchBar>

                </div>
                <div className="flex-1 lg:order-2 flex justify-center items-center">
                    <div className="rounded-lg w-80 sm:w-96 md:w-[550px] lg:w-[550px]  xl:w-[550px] image-container">

                        <img
                            className="w-80 sm:w-96  md:w-[400px] lg:w-[550px]  xl:w-[550px]"
                            src={images[currentImageIndex]}
                            alt={`View of product ${currentImageIndex + 1}`}
                        />

                    </div>
                </div>


            </div>
        </div>
    );
};

export default Banner;
