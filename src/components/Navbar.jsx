import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillHeart, AiFillShopping } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

function Navbar() {


    const { pathname } = useLocation()
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const { userInfo } = useSelector(state => state.auth)
    const { cart_product_count, add_to_wishlist } = useSelector(state => state.cart)
    const navigate = useNavigate()

    // const userInfo = 

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                // When the page is scrolled down by 100 pixels, make the navbar sticky.
                setIsSticky(true);
            } else {
                // Otherwise, remove the sticky behavior.
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener when the component unmounts.
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const redirect_cart_page = () => {
        if (userInfo) {
            navigate(`/cart`)
        } else {
            navigate(`/login`)
        }
    }
    const wishlist = 4
    return (
        <div >
            <nav className={`fixed w-full px-3 z-10 xs:bg-black bg-[#F8F5FF] ${isSticky ? 'bg-[#F8F5FF] shadow-md' : ''}`}
            >
                <div className="container mx-auto">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link className="" to='/'><h1 className="text-black text-2xl font-bold">Khooz</h1></Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        to="/"

                                        className={`py-2 px-3 ${pathname === '/' ? 'text-red-400 text-md font-medium hover:text-black' : 'text-black hover:text-red-400 text-md font-medium'}`}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to='/allProviders'
                                        className={`py-2 px-3 ${pathname === '/allProviders' ? 'text-red-400 text-md font-medium hover:text-black' : 'text-black hover:text-red-400 text-md font-medium'}`}
                                    >
                                        All Provider
                                    </Link>

                                    <Link
                                        to='/allProducts'
                                        className={`py-2 px-3 ${pathname === '/allProducts' ? 'text-red-400 text-md font-medium hover:text-black' : 'text-black hover:text-red-400 text-md font-medium'}`}
                                    >

                                        All Products
                                    </Link>

                                    <Link
                                        to='contact'
                                        className={`py-2 px-3 ${pathname === '/contact' ? 'text-red-400 text-md font-medium hover:text-black' : 'text-black hover:text-red-400 text-md font-medium'}`}
                                    >
                                        Contact
                                    </Link>

                                </div>
                            </div>
                        </div>
                        {/* Right-side button */}

                        <div className="flex items-center justify-center  gap-5">
                            <div className='flex justify-center gap-5'>
                                <div className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                    <span className='text-xl text-red-400'><AiFillHeart /></span>
                                    {
                                        add_to_wishlist !== 0 &&  <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                        {add_to_wishlist}
                                    </div>
                                    }
                                   
                                </div>

                                <div onClick={redirect_cart_page} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                    <span className='text-xl text-red-400'><AiFillShopping /></span>
                                    {
                                        cart_product_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] text-sm'>
                                            {
                                                cart_product_count
                                            }
                                        </div>
                                    }
                                </div>

                            </div>

                            {
                                userInfo ? <Link className='flex  py-2 px-2 text-gray-700 hover:bg-red-400 hover:text-white cursor-pointer justify-center items-center gap-2 text-sm' to='/dashboard'>
                                    <span className="text-2xl"><FaUser /></span>
                                    <span className="">{userInfo.name}</span>
                                </Link> : <Link to='/login' className='flex cursor-pointer justify-center items-center gap-2 text-sm'>
                                    {/* <span><FaLock /></span> */}
                                    <span className="text-md bg-red-400 px-2 py-2 text-white font-semibold rounded">Login</span>
                                </Link>
                            }
                        </div>


                        {/* Mobile menu button */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div ref={ref} className="px-2 flex flex-col pt-2 pb-3 space-y-1 sm:px-3">
                                <Link
                                    to="/"

                                    className={`py-2 px-3 ${pathname === '/' ? 'text-red-400 text-md font-medium hover:text-black' : 'text-black hover:text-red-400 text-md font-medium'}`}
                                >
                                    Home
                                </Link>
                                <Link
                                    to='/allProvider'
                                    className={`py-2 px-3 ${pathname === '/allProvider' ? 'text-red-400 text-md font-medium hover:text-black' : 'text-black hover:text-red-400 text-md font-medium'}`}
                                >
                                    All Provider
                                </Link>

                                <Link
                                    to='/allProducts'
                                    className={`py-2 px-3 ${pathname === '/allProducts' ? 'text-red-400 text-md font-medium hover:text-black' : 'text-black hover:text-red-400 text-md font-medium'}`}
                                >

                                    All Products
                                </Link>

                                <Link
                                    to='contact'
                                    className={`py-2 px-3 ${pathname === '/contact' ? 'text-red-400 text-md font-medium hover:text-black' : 'text-black hover:text-red-400 text-md font-medium'}`}
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    )}
                </Transition>
            </nav>
        </div>
    );
}

export default Navbar;





