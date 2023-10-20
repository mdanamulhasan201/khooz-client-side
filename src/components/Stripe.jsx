import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import axios from 'axios';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe('pk_test_51O2od3Hytm0jO8z5rgFP35Si8LVqwhUgQd8mD4bA6fI8kq1qVtPxYYiJwYDM5LX6odX8qe3Ijr7eoVMGHslpCKWV00PxTUMKnJ')

const Stripe = ({price, orderId}) => {
    const [clientSecret, setClientSecret ] = useState('')
    const  apperance = {
        theme: 'stripe'
    }
    const options = {
        apperance,
        clientSecret
    }
    const create_payment = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/order/create-payment', { price }, { withCredentials: true })
            setClientSecret(data.clientSecret)
        } catch (error) {
            console.log(error.response.data)
        }
    }
    return (
        // <div>
        //     {
        //         clientSecret ? (
        //             <Elements options={options} stripe={stripePromise}>
        //                 <CheckOutForm orderId={orderId}></CheckOutForm>
        //             </Elements>
        //         ) : <button onClick={create_payment} className='px-5 mt-5 py-2 border rounded-sm bg-green-500 text-white'>Start Payment</button>
        //     }
        // </div >
        <div className='mt-4'>
        {
            clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <CheckOutForm orderId={orderId} />
                </Elements>
            ) : <button onClick={create_payment} className='px-5 mt-2 py-2 border rounded-sm bg-green-500 text-white'>Start Payment</button>
        }
    </div>
    );
};

export default Stripe;