import React, { useEffect, useState } from 'react';

const images = [
    'https://gcp-img.slatic.net/lazada/6eda8353-9bc9-4fb1-813d-84b75f68d94d_BD-1920-350.jpg',
    'https://gcp-img.slatic.net/lazada/6eda8353-9bc9-4fb1-813d-84b75f68d94d_BD-1920-350.jpg',
    'https://i.ibb.co/PGNHsGK/banner-two.jpg',
    '/images/stock/photo-1665553365602-b2fb8e5d1707.jpg',
];

const Swipers = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='my-32 mx-auto h-48 max-w-screen-xl bg-slate-300 relative'>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`carousel-item w-full absolute transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                   <img src={image} className='w-full h-48 mx-auto' alt={`Product ${index + 1}`} />

                </div>
            ))}
            <div className='flex justify-center w-full py-2 gap-2 absolute bottom-0'>
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`btn btn-xs ${index === currentIndex ? 'bg-red-500 text-white' : 'bg-white text-red-400'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Swipers;
