import React from 'react';
import DashboardHeader from '../../../components/DashboardHeader/DashboardHeader';
import FadeInAnimation from '../../../components/FadeInAnimation/FadeInAnimation';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import useCart from '../../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const [cart,refetch]= useCart();
    const totalPrice = parseFloat(
    cart.reduce((sum, item) => item.price + sum, 0)
    ).toFixed(2); 
        return (
          <div className="container mx-auto px-4 sm:px-8 py-8">
            <DashboardHeader title={"Make Payment"} />
            <div className='mt-10'>
              <FadeInAnimation>
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    refetch={refetch}
                    cart={cart}
                    totalPrice={totalPrice}
                  />
                </Elements>
              </FadeInAnimation>
            </div>
          </div>
        );
};

export default Payment;