import { useState } from "react";
import API_URL, { authHeaders } from "../api";

export default function PlaceOrder() {
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");

  const placeOrder = async () => {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ product_id: productId, quantity: qty })
    });

    const data = await res.json();
    setMsg(data.message || "Done");
  };

  return (
    <div className="card">
      <h2>Place Order</h2>

      <input placeholder="Product ID"
             value={productId}
             onChange={e => setProductId(e.target.value)} />

      <input type="number"
             value={qty}
             onChange={e => setQty(e.target.value)} />

      <button onClick={placeOrder}>Place</button>

      {msg && <p>{msg}</p>}
    </div>
  );
}
