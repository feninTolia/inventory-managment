import { Header } from '@/shared/ui/Header';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { v4 } from 'uuid';

interface IFormData {
  productId: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
}

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: IFormData) => void;
}

const initialForm = {
  name: '',
  price: 0,
  stockQuantity: 0,
  rating: 0,
};

export const CreateProductModal = ({ isOpen, onClose, onCreate }: IProps) => {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData({
        ...formData,
        [name]:
          name === 'price' || name === 'stockQuantity' || name === 'rating'
            ? parseFloat(value)
            : value,
      });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onCreate({ ...formData, productId: v4() });
      setFormData(initialForm);
      onClose();
    },
    [formData, onClose, onCreate]
  );

  const handleClose = useCallback(() => {
    setFormData(initialForm);
    onClose();
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const labelCssStyles = 'block text-sm font-medium text-gray-700';
  const inputCssStyles =
    'block w-full mb-2 p-2 border-gray-500 border-2 rounded-md';

  return (
    <div className="fixed  inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          <label className={labelCssStyles}>
            Product Name
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
              className={inputCssStyles}
              required
            />
          </label>
          <label className={labelCssStyles}>
            Product Price
            <input
              type="number"
              min={0}
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={formData.price}
              className={inputCssStyles}
              required
            />
          </label>
          <label className={labelCssStyles}>
            Product Stock Quantity
            <input
              type="number"
              min={0}
              name="stockQuantity"
              placeholder="Stock Quantity"
              onChange={handleChange}
              value={formData.stockQuantity}
              className={inputCssStyles}
              required
            />
          </label>
          <label className={labelCssStyles}>
            Product Rating
            <input
              type="number"
              min={0}
              max={5}
              name="rating"
              placeholder="Rating"
              onChange={handleChange}
              value={formData.rating}
              className={inputCssStyles}
              required
            />
          </label>
          {/* create actions */}
          <div className="flex gap-4 justify-end mt-10">
            <button
              className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold rounded py-2 px-4"
              type="submit"
            >
              Create
            </button>
            <button
              className="flex items-center bg-gray-500 hover:bg-gray-700 text-gray-200 font-bold rounded py-2 px-4"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
