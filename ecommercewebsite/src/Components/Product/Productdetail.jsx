import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import {toast} from "react-hot-toast"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';
import axios from 'axios';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Productdetail() {
  const navigate=useNavigate();
  const sizes= [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ];
  const [selectedSize,setSelectedSize]=useState("");
  

  const {id}=useParams();
  const [product,setProduct]=useState([]);
  
  useEffect(()=>{
    const url=`https://localhost:7027/api/Product/Product/GetById/${id}`;
    console.log(id)
    axios
    .get(url)
    .then((result)=>{
      console.log(result)
      setProduct(result.data);
    })
    .catch((error)=>{
      console.log(id)
      console.log(error)
    })
  },[])

  const handleCart = (e) => {
    e.preventDefault();
    if(localStorage.getItem('cart')){
      let curr = [...JSON.parse(localStorage.getItem('cart'))];
      if(curr.find(p => p.id === product.id && p.size===product.size)){
        toast.error("Item Already in the cart");
      //     let prod = curr.find(p => p.id === product.id);
      //     curr = curr.filter(p => p.id !== product.id)
      //     prod.quantity = prod.quantity + 1;
      //     prod.totalprice=prod.totalprice+product.price;
      //     curr.push(prod);
      // localStorage.setItem('cart',JSON.stringify(curr));
      
      }
      else if(selectedSize=="")
      {
        toast.error('Select a Size First');
      }
      else{
      let newProduct = product;
      newProduct.quantity = 1;
      newProduct.totalprice=newProduct.price;
      newProduct.size=selectedSize;
      curr.push(newProduct);
      localStorage.setItem('cart',JSON.stringify(curr));
      toast.success('Item Added to Cart');
      navigate('/cart');
    }
    }else{
      let newProduct = product;
      newProduct.quantity = 1;
      newProduct.size=selectedSize;
      newProduct.totalprice=newProduct.price;
      localStorage.setItem('cart',JSON.stringify([newProduct]));
      toast.success('Item Added to Cart');
      navigate('/cart');
    }
    
  }

  return (
    <div className="bg-white">
      {/* {status === 'loading' ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null} */}
      
        <div className="pt-6">
          {/* <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav> */}

          {/* Image gallery */}
          <div className="h-1/2 mx-auto mt-6 max-w-sm sm:px-6 lg:max-w-1/3 lg:px-8">
            <div className="h-1/2 aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product.productimage}
                alt="Hello"
                className="h-full w-full object-center object-fill"
              />
            </div>
            {/* <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.productimage}
                  alt="Hello"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.productimage}
                  alt="Hello"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.productimage}
                alt="Hello"
                className="h-full w-full object-cover object-center"
              />
            </div> */}
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.description}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-xl tracking-tight text-gray-900">
                ₹{product.price}
              </p>
              {/* <p className="text-3xl tracking-tight text-gray-900">
                ₹{200}
              </p> */}

              {/* Reviews */}
              {/* <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? 'text-gray-900'
                            : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div> */}

              <form className="mt-10">
                {/* Colors */}

                {/* Sizes */}
                {(
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        {sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size}
                            disabled={!size.inStock}
                            className={({ active }) =>
                              classNames(
                                size.inStock
                                  ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                  : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                active ? 'ring-2 ring-indigo-500' : '',
                                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {size.name}
                                </RadioGroup.Label>
                                {size.inStock ? (
                                  <span
                                    className={classNames(
                                      active ? 'border' : 'border-2',
                                      checked
                                        ? 'border-indigo-500'
                                        : 'border-transparent',
                                      'pointer-events-none absolute -inset-px rounded-md'
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}
                <button
                  onClick={handleCart}
                  // type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className='mt-4'>
                <h3>Stock</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {(product.stock>=1)?(product.stock):(<span className='text-red-500 font-bold'>Out of Stock</span>)}
                  </p>
                </div>
              </div>

              {/* {product.highlights && (
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )} */}

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
}