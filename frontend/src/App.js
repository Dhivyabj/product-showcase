import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import AdminEnquiries from './components/AdminEnquiries';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-dark text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight hover:text-gray-200 transition">ShopApp</Link>
            <Link to="/admin" className="text-sm text-gray-400 hover:text-white transition">Admin</Link>
          </div>
        </header>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/admin" element={<AdminEnquiries />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
            <p>&copy; 2025 Product Showcase. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
