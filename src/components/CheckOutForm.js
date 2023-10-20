import React, { useState } from 'react';
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CheckOutForm = ({ orderId }) => {
    localStorage.setItem('orderId', orderId)
    const stripe = useStripe()
    const elements = useElements()
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const PaymentElementOptions = {
        layout: 'tabs'
    }

    const submit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/order/confirm'
            }
        })
        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message)
        } else {
            setMessage('An unexpected error occurred')
        }
        setIsLoading(false)
    }
    return (
        <form id='payment-form' onSubmit={submit}>
            <LinkAuthenticationElement id='link-authentication-elements'  />
            <PaymentElement id='payment-element' options={PaymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id='submit' className='px-5 mt-5 py-2 border rounded-sm bg-green-500 text-white'>
                <span id='button-text'>
                    {
                        isLoading ? <div>Loading...</div> : 'Pay now'
                    }
                </span>
            </button>
            {
                message && <div>{message}</div>
            }
        </form>
    );
};

export default CheckOutForm;