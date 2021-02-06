import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HpBtmBYN47iADi26QjZbnomg8bP0El8A4YOPQI4tBtofPqc0NJrv6HBzbkQ8eS4qPBDwj74r0OiGJ3YN7Jp2m4U00GdhvsJ6t'

    const onToken = token => {
       axios({
           url: 'payment',
           method: 'post',
           data: {
               amount: priceForStripe,
               token
           }
       })
       .then(response => {
           alert('Payment Successful')
       })
       .catch(error => {
           console.log('Payment Error: ', JSON.parse(error));
           alert(
               'There was an issue with your payment. Please make sure you use the provided credit cart.'
           )
       })
    }

    return (
        <StripeCheckout
        label='Pay Now'
        name='CRWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;