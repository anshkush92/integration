import React from 'react';

import { useSelector } from 'react-redux';

import CartItem from './CartItem';

const REQUEST_URL = process.env.REACT_APP_REQUEST_URL;

const Cart = () => {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  console.log('🚀 ~ file: index.jsx:8 ~ Cart ~ items', items);

  return (
    <form action={`${REQUEST_URL}/create-checkout-session`}>
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
