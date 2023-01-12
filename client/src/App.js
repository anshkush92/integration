import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useGetProducts from './hooks/products';

import Layout from './layouts/';
import HomePage from './pages/Home';
import NewsletterPage from './pages/Newsletter';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import SuccessPage from './pages/Checkout/Success';
import CancelPage from './pages/Checkout/Cancel';

function App() {
  useGetProducts();

  return (
    <div className="px-4">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        draggable
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="newsletter" element={<NewsletterPage />} />
          <Route path="success" element={<SuccessPage />} />
          <Route path="cancel" element={<CancelPage />} />
        </Route>

        <Route path="/auth" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
