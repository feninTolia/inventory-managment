'use client';
import { useGetDashboardMetricsQuery } from '@/shared/state/api';

export const CardPurchaseSummary = () => {
  const { data, isError, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];

  if (isError) {
    return <p className="m-5">Failed to fetch data</p>;
  }
  return (
    <div className="row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      {isLoading ? (
        <div className="m-5">
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {/* header */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Purchase Summary
            </h2>
          </div>
        </>
      )}
    </div>
  );
};
