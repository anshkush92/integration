import React from 'react';

import { useSelector } from 'react-redux';

import Card from '../../components/Card';

const HomePage = () => {
  const { products } = useSelector((state) => state.product);

  return (
    <div>
      <div className="mt-8 mx-auto grid gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
