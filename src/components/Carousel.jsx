import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import './Carousel'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Carousel = () => {

    const { categorys } = useSelector(state => state.home)


    const [swiperRef, setSwiperRef] = useState(null);

    return (
        <div className="">
            <Swiper
                onSwiper={setSwiperRef}
                slidesPerView={6}
                // centeredSlides={true}
                spaceBetween={8} // Adjust the spacing here
                navigation={true}
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 2000 }}
                className="mySwiper container md:w-[1200px] lg:container h-36 shadow-xl md:transform -translate-y-40 bg-white  rounded-lg" // Tailwind CSS classes
            >

                {
                    categorys.map((c, i) => (
                        <SwiperSlide key={i} className="text-center hover:bg-red-300 font-bold w-10 shadow-lg flex flex-col justify-center items-center">
                            <Link to={`/products?category=${c.name}`} className='grid justify-center justify-items-center mt-5'>
                                <img src={c.image} className="w-16 h-16 mb-2" alt="Electrician" />
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
