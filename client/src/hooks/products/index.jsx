import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { setProducts } from '../../features/product/productSlice';

/**
 * @function useGetProducts - Fetches products from the API and sets them in the store
 * @param void
 * @return {void}
 */
const useGetProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => dispatch(setProducts(json)));
  }, [dispatch]);

  return;
};

export default useGetProducts;
