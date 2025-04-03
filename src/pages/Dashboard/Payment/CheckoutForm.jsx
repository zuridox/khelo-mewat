import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import "./CheckoutForm.css";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ totalPrice, cart,refetch }) => {
  console.log(totalPrice);
  const { user } = useContext(AuthContext);
  console.log(user);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { totalprice: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [totalPrice, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error: ", error);
      toast.error(error.message);
      setCardError(error.message);
      setProcessing(false);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
    } else {
      //setProcessing(false);

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        /* save data to db */
        const payment = {
          userInfo: {
            email: user?.email,
            name: user?.displayName,
            userImage: user?.photoURL,
          },
          transactionId: paymentIntent.id,
          totalPrice,
          date: new Date(),
          itemsQuantity: cart.length,
          cartItemID: cart.map((item) => item._id),
          /* courseItemsID: cart.map((item) => item.courseId),
          itemsName: cart.map((item) => item.courseName), */
          items: cart.map((item) => ({
            courseItemID: item.courseId, // Corrected property name
            itemsName: item.courseName,
            itemsImage: item.image,
            Instructor: item.instructorName,
            InstructorEmail: item.instructorEmail,
          })),
        };
        axiosSecure.post("/payment",payment)
        .then(res=>{
              if (res.data.deleteCart.deletedCount > 0) {
                toast.success("Payment Successful! 🎉");
                refetch();
                navigate("/dashboard/enrolledclasses");
                setProcessing(false)
              }
        }).catch(error=>{
            setCardError(error.message);
            setProcessing(false);
        })
      }
    }
  };
  return (
    <>
      <form className="payment shadow-lg" onSubmit={handleSubmit}>
        <p className="text-gray-700 dark:text-white font-semibold py-4">
          Provide Card Information:
        </p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe || !clientSecret || processing}>
          {processing ? (
            <ImSpinner9 className="m-auto animate-spin" size={24} />
          ) : (
            "Pay"
          )}
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-green-600 text-center">
          Transaction ID: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
