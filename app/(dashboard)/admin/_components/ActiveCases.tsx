import { useEffect, useState } from "react";

interface Order {
  id: number;
  patientName: string;
  gender: string;
  study: string;
  modality: string;
  assignedTo: string;
  date: string;
  priority: string;
  message: string;
  files: string[];
  image: string;
}

export default function ActiveCases() {
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    fetch("/api/orders")
  .then(async (res) => {
    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return res.json();
    } else {
      throw new Error("Received non-JSON response");
    }
  })
  .then((data) => setOrders(data))
  .catch((error) => console.error("Error fetching orders:", error));

  }, []);
  

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            {[
              "Order Id",
              "Patient Name",
              "Gender",
              "Study",
              "Modality",
              "Assigned To",
              "Date",
              "Priority",
              "Message",
              "Files",
              "Image",
              "Action",
            ].map((col) => (
              <th key={col} className="border border-gray-300 px-4 py-2 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.patientName}</td>
                <td className="border border-gray-300 px-4 py-2">{order.gender}</td>
                <td className="border border-gray-300 px-4 py-2">{order.study}</td>
                <td className="border border-gray-300 px-4 py-2">{order.modality}</td>
                <td className="border border-gray-300 px-4 py-2">{order.assignedTo}</td>
                <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                <td className="border border-gray-300 px-4 py-2">{order.priority}</td>
                <td className="border border-gray-300 px-4 py-2">{order.message}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.files.length} files
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img src={order.image} alt="Scan" className="w-10 h-10 object-cover" />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12} className="text-center py-4">No Orders Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
