import React, { useEffect, useState } from 'react';

const images = [
    'https://i.ibb.co/t3Z6b5b/Blue-and-Red-Geometric-Computer-Repair-Service-Banner.png',
    'https://i.ibb.co/XtLGdBw/Red-Creative-Sale-Promo-Banner.png',
    'https://i.ibb.co/PGNHsGK/banner-two.jpg',
    'https://i.ibb.co/PGNHsGK/banner-two.jpg',
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
        <div className='my-32 mx-auto h-64 max-w-screen-xl bg-slate-300 relative'>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`carousel-item w-full absolute transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                   <img src={image} className='w-full h-64 mx-auto' alt={`Product ${index + 1}`} />

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
