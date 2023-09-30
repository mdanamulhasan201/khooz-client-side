import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../Shared/Footer";
import { useSelector, useDispatch } from "react-redux";
import { customer_login, messageClear } from "../store/reducers/authReducer";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";


const Login = () => {
    const navigate = useNavigate()
    const { loader, userInfo, successMessage, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const login = (e) => {
        e.preventDefault()
        dispatch(customer_login(state))
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
            navigate('/')
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
                <div className="container mx-auto">
                    <div className=" mt-4 ">
                        <div className="w-full flex justify-center items-center p-10">
                            <div className=" w-[30%] mx-auto shadow-lg rounded-md" >
                                <div className="p-8 items-center">
                                    <h2 className="text-center w-full text-xl text-slate-600 font-bold ">Login</h2>
                                    <div className="">
                                        <form onSubmit={login}>
                                            <div className="flex flex-col gap-1 mb-2 ">
                                                <label htmlFor="email">Email</label>
                                                <input onChange={inputHandle} value={state.email} type="email" id="email" name="email" placeholder="email" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-red-400 rounded-md " />
                                            </div>
                                            <div className="flex flex-col gap-1 mb-5 ">
                                                <label htmlFor="password">Password</label>
                                                <input onChange={inputHandle} value={state.password} type="password" id="password" name="password" placeholder="******" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-red-400 rounded-md " />
                                            </div>
                                            <button className="px-8 w-full py-2 bg-red-400 text-white shadow-lg hover:shadow-red-400/40">Login</button>
                                            <Link to='/' className="flex gap-1 items-center justify-end">
                                                <p className="text-md  my-2 text-green-500 font-semibold ">Guest</p>
                                                <AiOutlineArrowRight className="text-green-500"></AiOutlineArrowRight>
                                            </Link>
                                        </form>

                                        <div className='flex justify-center items-center py-2'>
                                            <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                            <span className='px-3 text-slate-600'>or</span>
                                            <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                        </div>

                                        <button className='px-8 w-full py-2 bg-blue-500 shadow-lg hover:shadow-indigo-400/40 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                            <span><FaFacebookF /></span>
                                            <span>Login with Facebook</span>
                                        </button>
                                        <button className='px-8 w-full py-2 bg-orange-400 shadow-lg hover:shadow-orange-400/40 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                            <span><AiOutlineGoogle /></span>
                                            <span>Login with Facebook</span>
                                        </button>

                                    </div>
                                    <div className='text-center text-slate-600 pt-1'>
                                        <p>You have no account ? <Link className='text-blue-500' to='/Register'>Register</Link></p>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Login;