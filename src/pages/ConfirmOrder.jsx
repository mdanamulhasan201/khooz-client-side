import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';
import FadeLoader from 'react-spinners/FadeLoader'
import error from '../../src/assets/error.png'
import success from '../../src/assets/success.png'

const load = async () => {
    return await loadStripe('pk_test_51O2od3Hytm0jO8z5rgFP35Si8LVqwhUgQd8mD4bA6fI8kq1qVtPxYYiJwYDM5LX6odX8qe3Ijr7eoVMGHslpCKWV00PxTUMKnJ')
}


const ConfirmOrder = () => {
    const [loader, setLoader] = useState(true)
    const [stripe, setStripe] = useState('')
    const [message, setMessage] = useState(null)


    useEffect(() => {
        if (!stripe) {
            return
        }
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
        if (!clientSecret) {
            return
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage('succeeded')
                    break
                case "processing":
                    setMessage('processing')
                    break
                case "requires_payment_method":
                    setMessage('failed')
                    break
                default:
                    setMessage('failed')
            }
        })
    }, [stripe])

    const get_load = async () => {
        const tempStripe = await load()
        setStripe(tempStripe)
    }
    useEffect(() => {
        get_load()
    }, [])

    const update_payment = async () => {
        const orderId = localStorage.getItem('orderId')
        if (orderId) {
            try {
                await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`)
                localStorage.removeItem('orderId')
                setLoader(false)
            } catch (error) {
                console.log(error.response.data)
            }
        }
    }

    useEffect(() => {
        if (message === 'succeeded') {
            update_payment()
        }
    }, [message])

    return (
        // <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
        //     {
        //         (message === 'failed' || message === 'processing') ? <>
        //             <img src={error} alt="error logo" />
        //             <Link className='px-5 py-2 bg-green-500 mt-5 rounded text-white' to='/dashboard/myOrders'>Back to Dashboard</Link>
        //         </> : message === 'succeeded' ? loader ? <FadeLoader /> : <>
        //             <img src={success} alt="error logo" />
        //             <Link className='px-5 py-2 bg-green-500 mt-5 rounded text-white' to='/dashboard/myOrders'>Back to Dashboard</Link>
        //         </> : <FadeLoader />
        //     }

        // </div>


        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
        {
            (message === 'failed' || message === 'processing') ? <>
                <img src={error} alt="error logo" />
                <Link className='px-5 py-2 bg-green-500 mt-5 rounded text-white' to='/dashboard/myOrders'>Back to Dashboard</Link>
            </> : message === 'succeeded' ? loader ? <FadeLoader /> : <>
                <img src={success} alt="error logo" />
                <Link className='px-5 py-2 bg-green-500 mt-5 rounded text-white' to='/dashboard/myOrders'>Back to Dashboard</Link>
            </> : <FadeLoader />
        }
    </div>
    );
};

export default ConfirmOrder;