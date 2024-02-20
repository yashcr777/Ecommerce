import React, { useEffect, useState } from "react";
import "./Invoice.css";
import { useParams } from "react-router-dom";
import { getCookie } from "../User/utils";
import axios from "axios";
function Invoice() {
  const { id } = useParams();
  var [orderData, setOrderData] = useState([]);
  var token = getCookie("token");
  var [item, setitem] = useState([]);

  useEffect(() => {
    var url = `https://localhost:7027/api/Order/Order/GetById/${id}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        setOrderData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (orderData) {
      var url = `https://localhost:7027/api/Orderitems/Orderitem/GetByOrderId/${id}`;
      axios
        .get(url)
        .then((result) => {
          console.log(result.data);
          setitem(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orderData]);
  return (
    // <div className="w-full h-screen">
    //   <>
    //     <div id="invoiceholder">
    //       <div id="headerimage" />
    //       <div id="invoice" className="effect2">
    //         <div id="invoice-top">
    //           <div className="logo" />
    //           <div className="info">
    //             <h2>Michael Truong</h2>
    //             <p>
    //               {" "}
    //               hello@michaeltruong.ca <br />
    //               289-335-6503
    //             </p>
    //           </div>
    //           {/*End Info*/}
    //           <div className="title">
    //             <h1>Invoice #1069</h1>
    //             <p>
    //               Issued: May 27, 2015
    //               <br />
    //               Payment Due: June 27, 2015
    //             </p>
    //           </div>
    //           {/*End Title*/}
    //         </div>
    //         {/*End InvoiceTop*/}
    //         <div id="invoice-mid">
    //           <div className="clientlogo" />
    //           <div className="info">
    //             <h2>Client Name</h2>
    //             <p>
    //               JohnDoe@gmail.com
    //               <br />
    //               555-555-5555
    //               <br />
    //             </p>
    //           </div>
    //           <div id="project">
    //             <h2>Project Description</h2>
    //             <p>
    //               Proin cursus, dui non tincidunt elementum, tortor ex feugiat
    //               enim, at elementum enim quam vel purus. Curabitur semper
    //               malesuada urna ut suscipit.
    //             </p>
    //           </div>
    //         </div>
    //         {/*End Invoice Mid*/}
    //         <div id="invoice-bot">
    //           <div id="table">
    //             <table>
    //               <tbody>
    //                 <tr className="tabletitle">
    //                   <td className="item">
    //                     <h2>Item Description</h2>
    //                   </td>
    //                   <td className="Hours">
    //                     <h2>Hours</h2>
    //                   </td>
    //                   <td className="Rate">
    //                     <h2>Rate</h2>
    //                   </td>
    //                   <td className="subtotal">
    //                     <h2>Sub-total</h2>
    //                   </td>
    //                 </tr>
    //                 <tr className="service">
    //                   <td className="tableitem">
    //                     <p className="itemtext">Communication</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">5</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">$75</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">$375.00</p>
    //                   </td>
    //                 </tr>
    //                 <tr className="service">
    //                   <td className="tableitem">
    //                     <p className="itemtext">Asset Gathering</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">3</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">$75</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">$225.00</p>
    //                   </td>
    //                 </tr>
    //                 <tr className="service">
    //                   <td className="tableitem">
    //                     <p className="itemtext">Design Development</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">5</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">$75</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">$375.00</p>
    //                   </td>
    //                 </tr>
    //                 <tr className="service">
    //                   <td className="tableitem">
    //                     <p className="itemtext">Animation</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">20</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">$75</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">$1,500.00</p>
    //                   </td>
    //                 </tr>
    //                 <tr className="service">
    //                   <td className="tableitem">
    //                     <p className="itemtext">Animation Revisions</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">10</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">$75</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">$750.00</p>
    //                   </td>
    //                 </tr>
    //                 <tr className="service">
    //                   <td className="tableitem">
    //                     <p className="itemtext" />
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">HST</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">13%</p>
    //                   </td>
    //                   <td className="tableitem">
    //                     <p className="itemtext">$419.25</p>
    //                   </td>
    //                 </tr>
    //                 <tr className="tabletitle">
    //                   <td />
    //                   <td />
    //                   <td className="Rate">
    //                     <h2>Total</h2>
    //                   </td>
    //                   <td className="payment">
    //                     <h2>$3,644.25</h2>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </div>
    //           {/*End Table*/}
    //           <form
    //             action="https://www.paypal.com/cgi-bin/webscr"
    //             method="post"
    //             target="_top"
    //           >
    //             <input type="hidden" name="cmd" defaultValue="_s-xclick" />
    //             <input
    //               type="hidden"
    //               name="hosted_button_id"
    //               defaultValue="QRZ7QTM9XRPJ6"
    //             />
    //             <input
    //               type="image"
    //               src="http://michaeltruong.ca/images/paypal.png"
    //               border={0}
    //               name="submit"
    //               alt="PayPal - The safer, easier way to pay online!"
    //             />
    //           </form>
    //           <div id="legalcopy">
    //             <p className="legal">
    //               <strong>Thank you for your business!</strong>&nbsp; Payment is
    //               expected within 31 days; please process this invoice within
    //               that time. There will be a 5% interest charge per month on
    //               late invoices.
    //             </p>
    //           </div>
    //         </div>
    //         {/*End InvoiceBot*/}
    //       </div>
    //       {/*End Invoice*/}
    //     </div>
    //     {/* End Invoice Holder*/}
    //   </>
    // </div>
    <section className="py-20 bg-black">
      <div className="max-w-5xl mx-auto py-16 bg-white">
        <article className="overflow-hidden">
          <div className="bg-[white] rounded-b-md">
            <div className="p-9">
              <div className="space-y-6 text-slate-700">
                <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                  Ecommerce Invoice
                </p>
              </div>
            </div>
            {/* <div className="p-9">
          <div className="flex w-full">
            <div className="grid grid-cols-4 gap-12">
              <div className="text-sm font-light text-slate-500">
                <p className="text-sm font-normal text-slate-700">
                  Invoice Detail:
                </p>
                <p>Unwrapped</p>
                <p>Fake Street 123</p>
                <p>San Javier</p>
                <p>CA 1234</p>
              </div>
              <div className="text-sm font-light text-slate-500">
                <p className="text-sm font-normal text-slate-700">Billed To</p>
                <p>The Boring Company</p>
                <p>Tesla Street 007</p>
                <p>Frisco</p>
                <p>CA 0000</p>
              </div>
              <div className="text-sm font-light text-slate-500">
                <p className="text-sm font-normal text-slate-700">
                  Invoice Number
                </p>
                <p>000000</p>
                <p className="mt-2 text-sm font-normal text-slate-700">
                  Date of Issue
                </p>
                <p>00.00.00</p>
              </div>
              <div className="text-sm font-light text-slate-500">
                <p className="text-sm font-normal text-slate-700">Terms</p>
                <p>0 Days</p>
                <p className="mt-2 text-sm font-normal text-slate-700">Due</p>
                <p>00.00.00</p>
              </div>
            </div>
          </div>
        </div> */}
            <div className="p-9">
              <div className="flex flex-col mx-0 mt-8">
                <table className="min-w-full divide-y divide-slate-500">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                      >
                        Rate
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {item.map((x)=>(
                      <tr className="border-b border-slate-200">
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                        <div className="font-medium text-slate-700">
                          {x.name}
                        </div>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                        {x.quantity}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                        ₹{x.price}
                      </td>
                      <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        ₹{x.quantity*x.price}
                      </td>
                    </tr>
                    ))}
                    {/* <tr className="border-b border-slate-200">
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                        <div className="font-medium text-slate-700">
                          Tesla Truck
                        </div>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                        48
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                        ₹0.00
                      </td>
                      <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        ₹0.00
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                        <div className="font-medium text-slate-700">
                          Tesla Charging Station
                        </div>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                        4
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                        ₹0.00
                      </td>
                      <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        ₹0.00
                      </td>
                    </tr> */}
                    {/* Here you can write more products/tasks that you want to charge for*/}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="row"
                        className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                      >
                        Subtotal
                      </th>
                      <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        ₹{orderData.total_Price-70}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Shipping Price
                      </th>
                      <th
                        scope="row"
                        className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-700 sm:hidden"
                      >
                        Shipping Price
                      </th>
                      <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-700 sm:pr-6 md:pr-0">
                        ₹50
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-700 sm:table-cell md:pl-0"
                      >
                        Tax
                      </th>
                      <th
                        scope="row"
                        className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-700 sm:hidden"
                      >
                        Tax
                      </th>
                      <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        ₹20
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                      >
                        Total
                      </th>
                      <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                        ₹{orderData.total_Price}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            {/* <div className="mt-48 p-9">
          <div className="border-t pt-9 border-slate-200">
            <div className="text-sm font-light text-slate-700">
              <p>
                Payment terms are 14 days. Please be aware that according to the
                Late Payment of Unwrapped Debts Act 0000, freelancers are
                entitled to claim a 00.00 late fee upon non-payment of debts
                after this time, at which point a new invoice will be submitted
                with the addition of this fee. If payment of the revised invoice
                is not received within a further 14 days, additional interest
                will be charged to the overdue account and a statutory rate of
                8% plus Bank of England base of 0.5%, totalling 8.5%. Parties
                cannot contract out of the Act’s provisions.
              </p>
            </div>
          </div>
        </div> */}
          </div>
        </article>
      </div>
    </section>
  );
}

export default Invoice;
