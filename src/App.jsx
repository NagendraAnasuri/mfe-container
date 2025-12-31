import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider, useAuth } from "./auth/AuthContext";

// Remote components (loaded via Module Federation)
const ProductsApp = React.lazy(() =>
  import("products/ProductsApp").then((module) => ({
    default: module.default || module,
  }))
);

const CartApp = React.lazy(() =>
  import("cart/CartApp").then((module) => ({
    default: module.default || module,
  }))
);

const AccountApp = React.lazy(() =>
  import("account/AccountApp").then((module) => ({
    default: module.default || module,
  }))
);


function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && (
        <nav className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex h-14 items-center justify-between">
              <div className="text-lg font-semibold">MFE Container</div>

              <div className="flex space-x-6">
                <Link to="/" className="hover:text-gray-300 transition">Home</Link>
                <Link to="/products" className="hover:text-gray-300 transition">Products</Link>
                <Link to="/cart" className="hover:text-gray-300 transition">Cart</Link>
                <Link to="/account" className="hover:text-gray-300 transition">Account</Link>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className="max-w-7xl mx-auto p-4">
        <Suspense fallback={<div>Loading microfrontend...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><ProductsApp /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><CartApp /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><AccountApp /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
