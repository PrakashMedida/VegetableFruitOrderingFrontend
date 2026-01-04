import { useEffect, useState } from "react";
import API_URL, { authHeaders } from "../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/admin/orders`, {
      headers: authHeaders()
    })
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div>
      <h2>Admin Orders</h2>
      <ul>
        {orders.map(o => (
          <li key={o.id}>
            #{o.id} – User {o.user_id} – {o.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
