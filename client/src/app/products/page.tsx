'use client';
import { RatingBlock } from '@/entities/Rating';
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from '@/shared/state/api';
import { Header } from '@/shared/ui/Header';
import { CreateProductModal } from '@/widgets/CreateProductModal';
import { PlusCircleIcon, SearchIcon } from 'lucide-react';
import { ChangeEvent, useCallback, useState } from 'react';

interface IProductFormData {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isError,
    refetch,
    isLoading,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: IProductFormData) => {
    await createProduct(productData);
  };

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      refetch(); // !TODO throttle
    },
    [refetch]
  );

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return <div className="text-center">Failed to fetch Products</div>;
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* search bar */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            type="text"
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products ..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* header bar */}
      <div className="flex-between mb-6">
        <Header name="Products" />

        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold rounded py-2 px-4"
          onClick={handleOpenModal}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" />
          Create product
        </button>
      </div>

      {/* body products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                img
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">{product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <RatingBlock rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* modal */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
