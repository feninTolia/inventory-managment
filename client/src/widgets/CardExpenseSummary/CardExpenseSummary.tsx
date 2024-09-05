'use client';
import { useGetDashboardMetricsQuery } from '@/shared/state/api';
import { TrendingUp } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
interface IExpenseSums {
  [category: string]: number;
}
const colors = ['#00C49F', '#0088FE', '#FFBB28'];

export const CardExpenseSummary = () => {
  const { data, isError, isLoading } = useGetDashboardMetricsQuery();
  const expenseByCategorySummary = data?.expenseByCategorySummary || [];

  const expenseSums = expenseByCategorySummary.reduce(
    (acc: IExpenseSums, curr) => {
      const category = curr.category + ' Expenses';
      const amount = parseInt(curr.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map((arr) => {
    return { name: arr[0], value: arr[1] };
  });

  const totalExpenses = expenseCategories.reduce((acc, curr) => {
    return acc + curr.value;
  }, 0);
  const expenseSummary = data?.expenseSummary[0];

  const formattedTotalExpenses = totalExpenses.toFixed(2);

  if (isError) {
    return <p className="m-5">Failed to fetch data</p>;
  }

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {/* header */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Expense Summary
            </h2>
            <hr />
          </div>

          {/* body */}
          <div className="xl:flex justify-between p-2">
            {/* chart */}
            <div className="relative basis-3/5">
              <ResponsiveContainer width={'100%'} height={130}>
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884d8"
                    cx="50%"
                    cy="50%"
                  >
                    {expenseCategories.map((expense, idx) => (
                      <Cell
                        key={'cell-' + expense.name}
                        fill={colors[idx % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                <span className="font-bold text-xl">
                  ${formattedTotalExpenses}
                </span>
              </div>
            </div>

            {/* labels */}

            <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
              {expenseCategories.map((category, idx) => (
                <li key={category.name} className="flex text-xs items-center">
                  <span
                    className="mr-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[idx % colors.length] }}
                  ></span>
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          {/* footer */}
          <div>
            <hr />
            {expenseSummary && (
              <div className="flex-between mt-3 px-7 mb-4">
                <div className="pt-2">
                  <p className="text-sm">
                    Average:{' '}
                    <span className="font-semibold">
                      ${expenseSummary.totalExpenses.toFixed(2)}
                    </span>
                  </p>
                </div>
                <span className="flex items-center mt-2">
                  <TrendingUp className="mr-2 text-green-500" />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
