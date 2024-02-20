import React from "react";
import { useParams } from "react-router-dom";

function Orderitems() {
  const { id } = useParams();
  const items = [];
  const data = [
    {
      address_Id: "",
      price: "",
      tax: "",
      shippingPrice: "",
      total_Price: "",
      orderStatus: "",
      payment_Id: "",
      user_Id: "",
      items,
    },
  ];
  const [orderData, setOrderData] = useState(data);
  useEffect(() => {
    const url = `https://localhost:7027/api/Order/Order/GetById/${id}`;
    axios
      .get(url)
      .then((result) => {
        console.log(result.data);
        setOrderData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full h-screen bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-4xl text-blue-700 font-medium">
        All Orderitems
      </strong>
      <div className="w-full border border-gray-300 rounded-lg mt-3">
        <table className="table-auto w-full shadow-lg mt-5 rounded bg-white border-separate border-spacing-y-3">
          <thead className="text-gray-500">
            <tr>
              <td className="p-4">orderitem Id</td>
              <td>name</td>
              <td>Price</td>
              <td>Size</td>
              <td>Quantity</td>
              <td>Productimage</td>
              <td>Order_Id</td>
            </tr>
          </thead>
          <tbody className="mb-4">
            {orderData.items.map((x) => {
              <tr key={x.id} className="bg-card rounded text-gray-700">
                <td className="py-4 px-4">{x.id}</td>
                <td className="py-4">{x.name}</td>
                <td className="py-4">{x.price}</td>
                <td className="py-4">{x.size}</td>
                <td className="py-4">{x.quantity}</td>
                <td className="py-4">{x.productimage}</td>
                <td className="py-4">{x.order_Id}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orderitems;
