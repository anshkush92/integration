import React from 'react';

import { useDispatch } from 'react-redux';

import { increaseItem, decreaseItem } from '../../../features/cart/cartSlice';

const CartItem = ({ id, title, price, image, quantity }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-y-2">
      <div
        id={id}
        className="flex gap-x-4 items-center justify-start mt-2 px-1"
      >
        <img className="h-24 w-24" src={image} alt={title} />
        <div>{title}</div>
        <div className="flex gap-x-2 items-center">
          <button
            className="text-4xl"
            onClick={() =>
              dispatch(
                decreaseItem({
                  id: id,
                  price: price,
                  title: title,
                  image: image,
                })
              )
            }
          >
            -
          </button>
          <span className="text-2xl">{quantity}</span>
          <button
            className="text-2xl"
            onClick={() =>
              dispatch(
                increaseItem({
                  id: id,
                  price: price,
                  title: title,
                  image: image,
                })
              )
            }
          >
            +
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CartItem;
