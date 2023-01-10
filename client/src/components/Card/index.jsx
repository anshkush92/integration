import React from 'react';

import { useDispatch } from 'react-redux';

import { increaseItem } from '../../features/cart/cartSlice';

const Card = (props) => {
  const { id, title, image, price } = props;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(increaseItem({ id, title, price }));
    console.log(`Added to cart ${title}`);
  };

  return (
    <div className="flex flex-col rounded-md gap-y-4 items-start justify-center w-80 p-4 bg-black text-white">
      <img src={image} alt={title} className="w-1/2 m-auto" />
      <div>ID - {id}</div>
      <div>Name - {title}</div>
      <div>Price - $ {price}</div>
      <button
        className="w-full rounded-sm text-black bg-white"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
