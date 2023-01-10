import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { increaseItem, decreaseItem } from '../../../features/cart/cartSlice';

const CartItem = () => {
  const { products } = useSelector((state) => state.product);
  const { items, totalQuantity } = useSelector((state) => state.cart);
  console.log(
    '🚀 ~ file: index.jsx:10 ~ CartItem ~ totalQuantity',
    totalQuantity
  );
  console.log('🚀 ~ file: index.jsx:10 ~ CartItem ~ items', items);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-y-2">
      <div
        id={products[11]?.id}
        className="flex gap-x-4 items-center justify-start mt-2 px-1"
      >
        <img
          className="h-24 w-24"
          src={products[11]?.image}
          alt={products[11]?.title}
        />
        <div>{products[11]?.title}</div>
        <div className="flex gap-x-2 items-center">
          <button
            className="text-4xl"
            onClick={() =>
              dispatch(
                decreaseItem({
                  id: products[11]?.id,
                  price: products[11]?.price,
                  title: products[11]?.title,
                })
              )
            }
          >
            -
          </button>
          <span className="text-2xl">2</span>
          <button
            className="text-2xl"
            onClick={() =>
              dispatch(
                increaseItem({
                  id: products[11]?.id,
                  price: products[11]?.price,
                  title: products[11]?.title,
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
