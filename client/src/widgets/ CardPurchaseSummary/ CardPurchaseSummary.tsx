'use client';
import { useGetDashboardMetricsQuery } from '@/shared/state/api';
import { TrendingDown, TrendingUp } from 'lucide-react';
import numeral from 'numeral';
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const CardPurchaseSummary = () => {
  const { data, isError, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;
  const lastPercentage = lastDataPoint?.changePercentage!;

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

          {/* body */}
          <div>
            {/* body header */}
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400">Purchased</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format('$0.00a')
                    : '0'}
                </p>
                {lastDataPoint && (
                  <p
                    className={`text-sm flex ml-3 ${
                      lastPercentage >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {lastPercentage >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {lastPercentage}%
                  </p>
                )}
              </div>
            </div>

            {/* chart */}
            <ResponsiveContainer width={'100%'} height={225} className={'px-7'}>
              <AreaChart
                data={purchaseData}
                margin={{ left: -50, right: 0, bottom: 0, top: 0 }}
              >
                <CartesianGrid
                  strokeDasharray=""
                  vertical={false}
                  horizontal={false}
                />
                <XAxis dataKey={'date'} tick={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tick={false} />
                <Tooltip
                  formatter={(value: number) => {
                    return [`$${value.toLocaleString('uk')}`];
                  }}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString('uk');
                  }}
                />
                <Area
                  type="monotone"
                  dot={true}
                  dataKey="totalPurchased"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};
