import React from 'react';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { increaseItem, decreaseItem } from '../../../features/cart/cartSlice';

const CartItem = ({ id, title, price, image, quantity }) => {
  const dispatch = useDispatch();

  const increase = () => {
    dispatch(increaseItem({ id, title, price, image }));
    toast.success(`${title} Increased`);
  };

  const decrease = () => {
    dispatch(decreaseItem({ id }));
    toast.error(`${title} Decreased`);
  };
  return (
    <div className="flex flex-col gap-y-2">
      <div
        id={id}
        className="flex w-full items-center justify-between mt-2 px-1"
      >
        <img className="h-auto w-20" src={image} alt={title} />
        <div className="flex flex-col px-2 items-center">
          <div className="text-xs">{title}</div>
          <div className="flex gap-x-2 items-center">
            <button className="text-xl" onClick={decrease}>
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button className="text-xl" onClick={increase}>
              +
            </button>
          </div>
        </div>
        <div className="text-base">${price}</div>
      </div>
      <hr />
    </div>
  );
};

export default CartItem;
