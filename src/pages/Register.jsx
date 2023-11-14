import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../Shared/Footer";
import { customer_register, messageClear } from "../store/reducers/authReducer";
import { useSelector, useDispatch } from "react-redux";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";

const Register = () => {
    const navigate = useNavigate()
    const { loader, userInfo, successMessage, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault()
        dispatch(customer_register(state))
        console.log(state)
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (userInfo) {
            navigate('/login')
        }
    }, [successMessage, errorMessage])
    return (
        <>

            <Navbar></Navbar>
            {
                loader && <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
                    <FadeLoader></FadeLoader>
                </div>
            }

            <div className="py-16">
                <div className="max-w-screen-xl mx-auto">

                    <div className="w-full flex justify-center items-center p-10">
                        <div className="md:w-[50%] sm:w-[50%] lg:w-[30%] w-full mx-auto shadow-lg rounded-md" >
                            <div className="p-8 items-center">
                                <h2 className="text-center w-full text-xl text-slate-600 font-bold ">Register</h2>
                                <div className="">
                                    <form onSubmit={register} className="mb-5">
                                        <div className="flex flex-col gap-1 mb-5 ">
                                            <label htmlFor="name">Name</label>
                                            <input onChange={inputHandle} value={state.name} type="text" id="name" name="name" placeholder="name" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-red-400 rounded-md " required />
                                        </div>
                                        <div className="flex flex-col gap-1 mb-5 ">
                                            <label htmlFor="email">Email</label>
                                            <input onChange={inputHandle} value={state.email} type="email" id="email" name="email" placeholder="email" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-red-400 rounded-md " required />
                                        </div>
                                        <div className="flex flex-col gap-1 mb-5 ">
                                            <label htmlFor="password">Password</label>
                                            <input onChange={inputHandle} value={state.password} type="password" id="password" name="password" placeholder="******" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-red-400 rounded-md " required />
                                        </div>
                                        <button className="px-8 w-full py-2 rounded-md bg-green-400 text-white shadow-lg hover:shadow-red-400/40">Register</button>



                                    </form>

                                    <div className='flex justify-center items-center  py-5'>
                                        <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                        <span className='px-3 text-slate-600'>or</span>
                                        <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                    </div>

                                    <div className="flex gap-5 justify-center items-center mb-5">
                                        <div>
                                            <button className="transform hover:scale-125 transition-transform duration-500  border-blue-400 border flex justify-center items-center rounded-full w-10 h-10 text-2xl">
                                                <FaFacebookF className="text-blue-500" />
                                            </button>
                                        </div>
                                        <div>
                                            <button className="transform hover:scale-125 transition-transform duration-500 border-red-400 border flex justify-center items-center rounded-full w-10 h-10 text-2xl">
                                                <AiOutlineGoogle className="text-red-400" />
                                            </button>
                                        </div>
                                        <div>
                                            <button className="transform hover:scale-125 transition-transform duration-500 border-blue-400 border flex justify-center items-center rounded-full w-10 h-10 text-2xl">
                                                <FaLinkedinIn className="text-blue-500" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className='text-center text-slate-600 pt-1'>
                                    <p>You have an account ? <Link className='text-blue-500' to='/login'>Login</Link></p>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>


                </div>
            </div>
            <Footer></Footer>

        </>
    );
};

export default Register;