import React from 'react';

import { useSelector } from 'react-redux';

import CartItem from './CartItem';
const Cart = () => {
  const { items, totalQuantity } = useSelector((state) => state.cart);
  console.log('🚀 ~ file: index.jsx:8 ~ Cart ~ items', items);

  return (
    <div>
      {items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}

      <div className="flex flex-col gap-y-2 my-2">
        <div>
          Total Items: <span className="text-red-500">{totalQuantity}</span>
        </div>
        <div>
          Total: <span className="text-red-500">$ 5000</span>
        </div>
        <button className="bg-black py-2 rounded-md text-white w-full">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
