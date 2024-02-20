import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import plus from "./plus.png";
import minus from "./minus.png";
import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";



// const products = [
//   {
//     id: 1,
//     name: "Throwback Hip Bag",
//     href: "#",
//     color: "Salmon",
//     price: "$90.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
//     imageAlt:
//       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
//   },
//   {
//     id: 2,
//     name: "Medium Stuff Satchel",
//     href: "#",
//     color: "Blue",
//     price: "$32.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
//     imageAlt:
//       "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
//   },
//   // More products...
// ];

export default function Cart() {
  const stripePromise = loadStripe(
    "pk_test_51KktbBSHIlA9k8TX9lY7AggWO2jxeTm8OtFgLE1h1R6pwSJVV4fBAbOwX8VapDVZv63JaF1mRxHj6peUejvTFyQs00UXqOSwcw"
    //"pk_test_51OaDjKSCAl7kXLDrURGBiqMzPehW6P7HZl9kk36qVAwQJQ2Ik4IaB1BKkvlYXMfpCtuxgVfxO17z9F637NeGoYTQ00Ywhlt8Ad"
);

  const [products, SetProducts] = useState([]);
  const url="https://localhost:7027/api/Payment/payment";
  var [price,setprice] = useState(0);
    
  const handleCheckOut = async() => {
    const data={
      orderprice:price*100,
    };
    try {
      const stripe = await stripePromise;
      const res = await axios.post(url,data)
      console.log(res);
      await stripe.redirectToCheckout({
          sessionId: res.data,
      });
  } catch (err) {
      console.log(err);
  }
  }
  // const [quantity,SetQuantity] =useState();
  const handlequantity1 = (product) => {
    let newProd = JSON.parse(localStorage.getItem("cart"));
    newProd.map((p) => {
      if (p.id === product.id) {
        p.totalprice += p.price;
        p.quantity++;
      }
    });
    console.log(newProd);
    localStorage.setItem("cart", JSON.stringify(newProd));
    SetProducts(newProd);
  };
  function handlequantity2(product) {
    let newProd = JSON.parse(localStorage.getItem("cart"));
    newProd.map((p) => {
      if (p.id === product.id && p.quantity > 1) {
        p.totalprice -= p.price;
        p.quantity--;
      }
    });
    console.log(newProd);
    localStorage.setItem("cart", JSON.stringify(newProd));
    SetProducts(newProd);
  }

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("cart")));
    if (localStorage.getItem("cart")) {
      SetProducts(JSON.parse(localStorage.getItem("cart")));
    }
    var totalexpense = 0;
    products.map((product) => {
      totalexpense += product.totalprice;
    });
  }, [localStorage.getItem("cart")]);

  const [open, setOpen] = useState(true);
  const handleDelete = (product) => {
    let newProd = JSON.parse(localStorage.getItem("cart"));

    newProd = newProd.filter((p) => p.id !== product.id);

    localStorage.setItem("cart", JSON.stringify(newProd));
    SetProducts(newProd);
  };
  return (
    <>
    {(!localStorage.getItem("cart"))?(<EmptyCart/>):
      (<div className="mx-auto max-w-7xl bg-white px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product, index) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.productimage}
                      alt="Hello"
                      className="h-full w-full object-fill object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.productimage}>{product.name}</a>
                        </h3>
                        <p className="ml-4">₹{product.totalprice}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {product.quantity}</p>
                      <div className="flex flex-col">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500 mb-2"
                          onClick={() => handleDelete(product)}
                        >
                          Remove
                        </button>
                        <div className="flex flex-row justify-between">
                          <button onClick={() => handlequantity1(product)}>
                            <img
                              src={plus}
                              alt=""
                              className="mx-auto w-6 h-6 rounded-full"
                            />
                          </button>

                          <button
                            onClick={
                              product.quantity == 1
                                ? () => handleDelete(product)
                                : () => handlequantity2(product)
                            }
                          >
                            <img
                              src={minus}
                              alt=""
                              className="mx-auto w-6 h-6 rounded-full"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            {products.map((product) => {
              price += product.totalprice;
              //setpayment(price^100);
            })}
            <p>₹{price}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
               to="/addaddress"
              //onClick={handleCheckOut}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <h1> </h1>
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500 mt-2"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>)}
    </>
  );
}
