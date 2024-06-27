'use client'

import { useCart } from '@/hooks/useCart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CheckoutForm from './CheckoutForm';
import Button from '../Components/Button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const CheckoutClient = () => {
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const router = useRouter();
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    useEffect(() => {
        const createPaymentIntent = async () => {
            if (cartProducts && cartProducts.length > 0) {
                setLoading(true);
                setError(false);

                try {
                    const res = await fetch('/api/create-payment-intent', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            items: cartProducts,
                            payment_intent_id: paymentIntent,
                        })
                    });

                    setLoading(false);

                    if (res.status === 401) {
                        return router.push('/login');
                    }

                    const data = await res.json();
                    console.log("Response data:", data); // Log the response data for debugging

                    if (data.paymentIntent) {
                        setClientSecret(data.paymentIntent.client_secret);
                        handleSetPaymentIntent(data.paymentIntent.id);
                    } else {
                        throw new Error("Payment intent not found in response");
                    }
                } catch (error) {
                    setError(true);
                    console.error("Error:", error);
                    toast.error("Something went wrong");
                }
            }
        };

        createPaymentIntent();
    }, [cartProducts, paymentIntent]);

    console.log("paymentIntent", paymentIntent);
    console.log("clientSecret", clientSecret);
    const options: StripeElementsOptions = {
        clientSecret,
        appearance : {
            theme:"stripe",
            labels: "floating",
        },
    };

    const handleSetPaymentSuccess = useCallback((value:boolean)=>{
        setPaymentSuccess(value)
    },[]);
    return (
        <div className='w-full'>
            {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
          clientSecret = {clientSecret}
          handleSetPaymentSuccess = {handleSetPaymentSuccess} />
        </Elements>
      )}
      {loading && <div className='text-center'>Loading Checkout</div>}
      {error && (
        <div className='text-center text-rose-500'>Something went wrong....</div>
      )}
      {paymentSuccess && (
        <div className='flex items-center flex-col gap-4'>
            <div className='text-teal-500 text-center'>Payment Success</div>
            
            <div className='max-w-[220px] w-full'>
                <Button label = "View Your Orders"
                onClick={() => router.push("/order")} />
            </div>
        </div>
      )}
        </div>
    )
};

export default CheckoutClient;
