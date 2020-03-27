import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_3k1H9KTOKvrjp03dzDyUIhT800m5J7yDvn";

  const onToken = token => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token
      }
    })
      .then(response => {
        alert("Succesful Payment!");
      })
      .catch(error => {
        console.log("Payment Error: ", JSON.parse(error));
        alert(
          "There was an issue with your payment! Please make sure your credit card information is correct."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Bodega Store"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
