'use client';
import { RatingBlock } from '@/entities/Rating';
import { useGetDashboardMetricsQuery } from '@/shared/state/api';
import { ShoppingBag } from 'lucide-react';

interface IProps {}

export const CardPopularProduct = (props: IProps) => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  console.log(dashboardMetrics);

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md pb-16 rounded-2xl">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId}
                className="flex-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                  <div>img</div>
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        ${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      <RatingBlock rating={product.rating ?? 0} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 text-xs items-center">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-full ">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stockQuantity / 10000)}k sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
