import { useEffect, useState } from "react";
import API_URL, { authHeaders } from "../api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/orders/my`, {
      headers: authHeaders()
    })
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      <ul>
        {orders.map(p => (
          <div key={p.id} style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          }}>
            <div className="product-image">
            🍎
          </div>

            <div style={{ padding: 16 }}>
              <h3 style={{
                margin: "0 0 8px",
                fontSize: 18
              }}>
                {p.name}
              </h3>

              <p style={{
                fontWeight: 600,
                marginBottom: 12
              }}>
                ₹{p.price}
              </p>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12
              }}>
              </div>

              
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

