import { useEffect, useState } from "react";
import API_URL from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        const initialQty = {};
        data.forEach(p => (initialQty[p.id] = 1));
        setQty(initialQty);
      });
  }, []);



  const orderNow = async (productId, qty) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      product_id: productId,
      quantity: qty
    })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Order placed. Order ID: " + data.orderId);
  } else {
    alert(data.message);
  }
};

  const inc = id =>
    setQty(prev => ({ ...prev, [id]: prev[id] + 1 }));

  const dec = id =>
    setQty(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));

  return (
    <div style={{
      padding: 24,
      maxWidth: 1200,
      margin: "auto",
      fontFamily: "system-ui, -apple-system"
    }}>
      <h2 style={{
        fontSize: 28,
        marginBottom: 24,
        fontWeight: 600
      }}>
        Fresh Fruits & Vegetables
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 24
      }}>
        {products.map(p => (
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
                <button
                  onClick={() => dec(p.id)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background: "#f8f8f8",
                    fontSize: 18,
                    cursor: "pointer"
                  }}
                >
                  −
                </button>

                <span style={{ fontWeight: 600 }}>
                  {qty[p.id]}
                </span>

                <button
                  onClick={() => inc(p.id)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    background: "#f8f8f8",
                    fontSize: 18,
                    cursor: "pointer"
                  }}
                >
                  +
                </button>
              </div>

              <button style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "none",
                background: "#16a34a",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer"
              }} onClick={() => orderNow(p.id, qty[p.id])}>
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

