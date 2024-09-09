import { useGetProductsQuery } from '@/shared/state/api';
import { Header } from '@/shared/ui/Header';
import { useState } from 'react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductsQuery(searchTerm);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return <div className="text-center">Failed to fetch Products</div>;
  }

  return (
    <div>
      <Header name="Products" />
    </div>
  );
};

export default Products;
