// // import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { Form, ErrorMessage, Field, Formik } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { verifypayment, addOrder } from "../features/orderSlice";

// function PaymentDetail() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { cart } = useSelector((state) => state.cart);
//   // const [couponCode, setCouponCode] = useState("");
//   // const [discount, setDiscount] = useState(0);

//   const initialValues = {
//     name: "",
//     address: "",
//     paymentMethod: "",
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required"),
//     address: Yup.string().required("Address is required"),
//     paymentMethod: Yup.string().required("Please select a payment method"),
//   });

//   const totalPrice = cart.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
//   // const finalPrice = totalPrice - discount;

//   // const applyCoupon = () => {
//   //   if (couponCode === "DISCOUNT10") {
//   //     setDiscount(totalPrice * 0.1);
//   //     toast.success("Coupon applied! 10% discount added.");
//   //   } else {
//   //     toast.error("Invalid coupon code");
//   //   }
//   // };

//  const openRazorpayPayment = (razorpayOrderId, amount, name,dispatch, navigate) => {
//   const options = {
//     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//     amount: amount,
//     currency: "INR",
//     name: "Ellor@S",
//     description: "Product Payment",
//     order_id: razorpayOrderId,
//     handler: (response) => {
//       const paymentData = {
//         paymentId: response.razorpay_payment_id,
//         orderId: razorpayOrderId,
//       };
//       console.log(paymentData);
//       dispatch(verifypayment(paymentData))
//         .unwrap()
//         .then(() => navigate("/"))
//         .catch((error) => {
//           console.error("Payment verification failed:", error); 
//           toast.error("Payment verification failed. Try again.");
//         });
//     },
//     prefill: {
//       name: name,
//     },
//     theme: {
//       color: "#F37254",
//     },
//   };

//   if (!window.Razorpay) {
//   toast.error("Razorpay SDK failed to load. Please check your internet connection.");
//   return;
// }

//   const razorpay = new window.Razorpay(options);
//   razorpay.open();
// };

//   const onSubmit = async (values) => {
//     console.log("Payment Details:", values);
//     try {
//       const orderData = {
//         ...values,
//         items: cart,
//         total: totalPrice,
//       };
//       const response = await dispatch(addOrder(orderData)).unwrap();
//       console.log("Order Response:", response);

//     // Check if Razorpay is selected
//     // if (values.paymentMethod === "Razorpay") {
//     //  console.log("Selected Payment Method:", values.paymentMethod);

//       // openRazorpayPayment(response.razorpayOrderId, response.amount, values.name, dispatch, navigate);

//       // if (response && response.razorpayOrderId) {
//       //   openRazorpayPayment(response.razorpayOrderId, response.amount, values.name, dispatch, navigate);
//       // } else {
//       //   console.error("Razorpay Order ID is undefined:", response);
//       //   toast.error("Failed to initiate Razorpay payment. Try again.");
//       // }

//       console.log("Order API Response:", response);
// if (response?.razorpayOrderId) {
//     openRazorpayPayment(response.razorpayOrderId, response.amount, values.name, dispatch, navigate);
// } else {
//     console.error("Razorpay Order ID is missing. Full response:", response);
//     toast.error("Payment initialization failed. Please try again.");
// }


//     // } else {
//     //   toast.success("Order placed successfully with " + values.paymentMethod);
//     //   navigate("/");
//     // }
//   } catch (error) {
//     toast.error(error || "Failed to place order");
//   }
// };

//   return (
//     <div className="p-6 sm:p-10 md:w-3/4 lg:w-2/3 mx-auto bg-white shadow-lg rounded-lg">
//       <h1 className="text-center text-2xl font-semibold mb-6">Order Summary & Payment</h1>
      
//     {/* Order Summary */}
// <div className="bg-gray-100 p-4 rounded-lg mb-6">
//   <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//   <ul>
//     {cart.map((item) => (
//       <li key={item.id} className="flex justify-between items-center mb-3">
//         <div className="flex items-center gap-3">
//           <img src={item.url} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />

//           <div>
//             <p className="text-sm font-medium">{item.name}</p>
//             <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//           </div>
//         </div>
//         <p className="text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
//       </li>
//     ))}
//   </ul>
//   <hr className="my-3" />
  
//   {/* Total Price & Final Price on Right Side */}
//   <div className="flex flex-col items-end text-right">
//     <p className="text-sm font-medium">Total Price: <span className="font-semibold">₹{totalPrice.toFixed(2)}</span></p>
//     {/* {discount > 0 && (
//       <p className="text-sm text-green-600">Discount: -₹{discount.toFixed(2)}</p>
//     )}
//     <p className="text-lg font-bold mt-1">Final Amount: ₹{finalPrice.toFixed(2)}</p> */}
//   </div>
// </div>


//       {/* Payment Form */}
     
//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
//         <Form className="space-y-4">
//           {/* Name */}
//           <div>
//             <Field name="name" placeholder="Full Name" className="w-full p-2 border rounded-lg" />
//             <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
//           </div>

//           {/* Address */}
//           <div>
//             <Field name="address" as="textarea" placeholder="Shipping Address" className="w-full p-2 border rounded-lg" />
//             <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
//           </div>

//           {/* Payment Method */}
//           <div>
//             <Field as="select" name="paymentMethod" className="w-full p-2 border rounded">
              
//               <option value="Credit Card">Credit Card</option>
//               <option value="Razorpay">Razorpay</option>
//               <option value="Cash On Delivery">Cash On Delivery</option>
//             </Field>
//             <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm" />
//           </div>

//           {/* Coupon Code */}
//           {/* <div className="flex items-center gap-2"> */}
//             {/* <Field
//               name="coupon"
//               placeholder="Enter Coupon Code"
//               className="w-full p-2 border rounded-lg"
//               onChange={(e) => setCouponCode(e.target.value)}
//             /> */}
//             {/* <button type="button" onClick={applyCoupon} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
//               Apply
//             </button> */}
//           {/* </div> */}

//           {/* Final Payment Button */}
//           <button type="submit" className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg">
//             Proceed to Payment
//           </button>
//         </Form>
//       </Formik>

//       <ToastContainer />
//     </div>
//   );
// }

// export default PaymentDetail;




// import { shoecontext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Form, ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { verifypayment, addOrder } from "../features/orderSlice";

function PaymentDetail() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    address: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
  });
  //total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  // Razorpay Payment Handler
  const openRazorpayPayment = (razorpayOrderId, amount, name) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount,
      currency: "INR",
      name: "Ellor@S",
      description: "Product Payment",
      order_id: razorpayOrderId,
      handler: (response) => {
        const paymentData = {
          paymentId: response.razorpay_payment_id,
          orderId: razorpayOrderId,
        };
        console.log(paymentData);
        dispatch(verifypayment(paymentData))
          .unwrap()
          .then(() => navigate("/"))
          .catch((error) => {
            console.error("Payment verification failed:", error); 
            toast.error("Payment verification failed. Try again.");
          });
      },
      prefill: {
        name: name,
      },
      theme: {
        color: "#F37254",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const onSubmit = async (values) => {
    try {
      const orderData = {
        ...values,
        items: cart,
        total: totalPrice,
        paymentMethod: "razorpay",
      };
      const response = await dispatch(addOrder(orderData)).unwrap();
      console.log(response);
      const { razorpayOrderId, amount } = response;
      openRazorpayPayment(razorpayOrderId, amount, values.name);
    } catch (error) {
      toast.error(error || "Failed to place order");
    }
  };

  return (
    <div className="p-4 sm:p-8 md:w-3/4 lg:w-2/3 mx-auto">
      <h1 className="text-center text-2xl font-semibold mb-6">PAYMENT DETAILS</h1>
      <br />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className=" w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 mt-1 text-sm"
            ></ErrorMessage>
          </div>

          {/* Address Input */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Address
            </label>
            <Field
              as="textarea"
              id="address"
              name="address"
              rows="4"
              className="flex justify-center w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            ></ErrorMessage>
          </div>
          <div>
            <h1 className="text-lg font-semibold mt-6 mb-2">Order Summary</h1>
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex justify-between py-2 border-b text-sm md:text-base"
              >
                <img src={product.url} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                <p>{product.name}  <strong>X</strong>  <strong>{product.quantity}</strong></p>

                <p> ₹ {Number(product.price) * Number(product.quantity)}</p>
              </div>
            ))}
            <p className="text-right font-semibold mt-2">
             <strong>Total </strong> : ₹ {totalPrice}
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Proceed to Payment
            </button>
          </div>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
}
export default PaymentDetail;