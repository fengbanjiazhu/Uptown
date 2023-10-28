import { useParams } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

function Payment() {
  const { clientSecret } = useParams();

  const stripePromise = loadStripe(
    "pk_test_51N1PBAIq5PvrzIVYO5l0JOUPBovheTfXjrwNCMtBfOVsHd0tKrTWZcvSwZzBldttQuTXrzEIUddZRyQSa1EXiD8s00iQ8im3UH"
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
