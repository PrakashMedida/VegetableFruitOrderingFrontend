import { useState } from "react";
import "./App.css";

import Products from "./pages/Products";
import PlaceOrder from "./pages/PlaceOrder";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";
import Auth from "./pages/Auth";

function App() {
  const [page, setPage] = useState("products");

  return (
    <div className="container">
      <h1>Veg & Fruit Ordering</h1>

      <div className="navbar">
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("order")}>Order</button>
        <button onClick={() => setPage("myorders")}>My Orders</button>
        <button onClick={() => setPage("admin")}>Admin</button>
        <button onClick={() => setPage("auth")}>Login / Register</button>
      </div>

      {page === "products" && <Products />}
      {page === "order" && <PlaceOrder />}
      {page === "myorders" && <MyOrders />}
      {page === "admin" && <AdminOrders />}
      {page === "auth" && <Auth />}
    </div>
  );
}

export default App;
