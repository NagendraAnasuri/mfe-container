import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Remote components (loaded via Module Federation)
const ProductsApp = React.lazy(() => import("products/ProductsApp"));
const CartApp = React.lazy(() => import("cart/CartApp"));
const AccountApp = React.lazy(() => import("account/AccountApp"));

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <h1>Microfrontend Container</h1>

        <nav style={{ marginBottom: 20 }}>
          <Link to="/" style={{ marginRight: 10 }}>Home</Link>
          <Link to="/products" style={{ marginRight: 10 }}>Products</Link>
          <Link to="/cart" style={{ marginRight: 10 }}>Cart</Link>
          <Link to="/account">Account</Link>
        </nav>

        <Suspense fallback={<div>Loading microfrontend...</div>}>
          <Routes>
            <Route path="/" element={<div>Welcome to Container App</div>} />
            <Route path="/products" element={<ProductsApp />} />
            <Route path="/cart" element={<CartApp />} />
            <Route path="/account" element={<AccountApp />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
