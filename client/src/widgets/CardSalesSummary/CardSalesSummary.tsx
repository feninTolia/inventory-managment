'use client';
import { useGetDashboardMetricsQuery } from '@/shared/state/api';
import { TrendingUp } from 'lucide-react';
// import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const CardSalesSummary = () => {
  //   const [timeFrame, setTimeFrame] = useState('weekly');
  const { data, isError, isLoading } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];

  const totalValueSum = salesData.reduce(
    (acc, curr) => acc + curr.totalValue,
    0
  );

  const averagePercentage = salesData.reduce((acc, curr, _, array) => {
    return acc + curr.changePercentage! / array.length;
  }, 0);

  const highestValueData = salesData.reduce((acc, curr) => {
    return acc.totalValue > curr.totalValue ? acc : curr;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString('uk', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit',
      })
    : 'N/A';

  if (isError) {
    return <p className="m-5">Failed to fetch data</p>;
  }

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {/* header */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Sales Summary
            </h2>
          </div>
          {/* body */}
          <div>
            {/* body header */}
            <div className="flex-between mb-6 px-7">
              <div>
                <div className="text-lg font-medium">
                  <p className="text-xs text-gray-400">Value</p>
                </div>
                <span className="text-2xl font-extrabold">
                  $
                  {(totalValueSum / 1000000).toLocaleString('uk', {
                    maximumFractionDigits: 2,
                  })}
                  m
                </span>
                <span className="text-green-500 text-sm ml-2">
                  <TrendingUp className="inline w-4 h4  mr-1" />
                  {averagePercentage.toFixed(2)}%
                </span>
              </div>
              <select className="shadow-sm border border-gray-300 bg-white p-2 rounded">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Chart */}
            <ResponsiveContainer width={'100%'} height={350} className={'px-7'}>
              <BarChart
                data={salesData}
                margin={{ left: -25, right: 0, bottom: 0, top: 0 }}
              >
                <CartesianGrid strokeDasharray="" vertical={false} />
                <XAxis
                  dataKey={'date'}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                  }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    return `$${(value / 1000000).toFixed(0)}m`;
                  }}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => {
                    return [`$${value.toLocaleString('uk')}`];
                  }}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString('uk');
                  }}
                />
                <Bar
                  dataKey="totalValue"
                  fill="#3182ce"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

            {/* footer */}
            <div>
              <hr />
              <div className="flex-between mt-6 text-sm px-7 mb-4">
                <p>{salesData.length || 0} days</p>
                <p className="text-sm">
                  Highest Sales Date:{' '}
                  <span className="font-bold">{highestValueDate}</span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
