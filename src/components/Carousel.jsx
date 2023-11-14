import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import './Carousel'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Carousel = () => {
    const [swiper, setSwiper] = useState(null);
    const { categorys } = useSelector(state => state.home)

    useEffect(() => {
        if (swiper) {
            const updateSwiperParams = () => {
                if (window.innerWidth >= 1024) {
                    swiper.params.slidesPerView = 6; // Large screens
                } else if (window.innerWidth >= 640) {
                    swiper.params.slidesPerView = 3; // Medium screens
                } else {
                    swiper.params.slidesPerView = 2; // Small screens
                }
                swiper.update();
            };

            // Initialize swiper with your initial settings
            swiper.init();

            // Update slidesPerView on window resize
            window.addEventListener('resize', updateSwiperParams);

            // Initial update
            updateSwiperParams();

            // Remove event listener when component unmounts
            return () => {
                window.removeEventListener('resize', updateSwiperParams);
            };
        }
    }, [swiper]);





    return (
        <div className="">
            <Swiper
                onSwiper={setSwiper}
                spaceBetween={8}
                navigation={true}
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 2000 }}
                className="mySwiper max-w-screen-xl h-28 shadow-xl sm:-translate-y-14 -translate-y-10 md:-translate-y-14  md:transform lg:-translate-y-40 bg-white  rounded-lg" // Tailwind CSS classes
            >

                {
                    categorys.map((c, i) => (
                        <SwiperSlide key={i} className="text-center hover:bg-red-300 font-bold  shadow-lg flex flex-col justify-center items-center">
                            <Link to={`/products?category=${c.name}`} className='grid justify-center justify-items-center mt-5'>
                                <img src={c.image} className="w-10 h-10 mb-2" alt="Electrician" />
                                <h2>{c.name}</h2>
                            </Link>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    );
};

export default Carousel;
