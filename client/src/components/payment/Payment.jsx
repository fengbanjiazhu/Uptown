import { useParams } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

function Payment() {
  const { clientSecret } = useParams();

  const stripePromise = loadStripe(
    "pk_test_51OHLboKSmJhQj8AK5D7kLdDuuHXRfCqivZu8AZzqSZ2ycpFVhK9DT9dAKGpg6NMkepLyoQkx4vj3XYXsjfyJHOn200kYe1j2IO"
  );

  return (
    <div className="user-view__form-container">
      <h1 className="heading-secondary">Stripe Payment System</h1>

      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
