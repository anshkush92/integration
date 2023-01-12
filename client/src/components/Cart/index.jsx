import React from 'react';

import { useSelector } from 'react-redux';

import CartItem from './CartItem';

const REQUEST_URL = process.env.REACT_APP_REQUEST_URL;

const Cart = () => {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  console.log('🚀 ~ file: index.jsx:8 ~ Cart ~ items', items);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${REQUEST_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems: items }),
    });

    // Getting the response from the server
    const data = await response.json();
    console.log('🚀 ~ file: index.jsx:24 ~ handleSubmit ~ data', data);

    const { url } = data;

    if (url) {
      window.location.href = url;
    } else {
      alert('Something went wrong, please try again later');
    }
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      {items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}

      <div className="flex flex-col gap-y-2 my-2">
        <div>
          Total Items: <span className="text-red-500">{totalQuantity}</span>
        </div>
        <div>
          Total: <span className="text-red-500">$ {totalPrice.toFixed(2)}</span>
        </div>
        <button
          type="submit"
          className="bg-black py-2 rounded-md text-white w-full"
        >
          Checkout
        </button>
      </div>
    </form>
  );
};

export default Cart;
