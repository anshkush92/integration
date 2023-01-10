import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from './components/Navbar';
import Card from './components/Card';

import useGetProducts from './hooks/products';

function App() {
  useGetProducts();
  const { products } = useSelector((state) => state.product);

  return (
    <div className="px-4">
      <Navbar />
      <div className="mt-8 mx-auto grid gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default App;
