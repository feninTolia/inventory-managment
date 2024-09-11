'use client';

import { useGetExpensesByCategoryQuery } from '@/shared/state/api';
import { Header } from '@/shared/ui/Header';
import { useMemo, useState } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface IAggregatedDataItem {
  name: string;
  color?: string;
  amount: number;
}

interface IAggregatedData {
  [category: string]: IAggregatedDataItem;
}

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const {
    data: expensesData,
    isError,
    isLoading,
  } = useGetExpensesByCategoryQuery();

  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const aggregatedData: IAggregatedDataItem[] = useMemo(() => {
    const filtered = expenses
      .filter((data) => {
        const matchesCategory =
          selectedCategory === 'All' || selectedCategory === data.category;

        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);

        return matchesCategory && matchesDate;
      })
      .reduce((acc: IAggregatedData, data) => {
        const amount = parseInt(data.amount);
        if (!acc[data.category]) {
          acc[data.category] = { name: data.category, amount: 0 };
          acc[data.category].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          acc[data.category].amount += amount;
        }
        return acc;
      }, {});
    return Object.values(filtered);
  }, [endDate, expenses, selectedCategory, startDate]);

  const classnames = {
    label: 'flex flex-col gap-1 text-sm font-medium text-gray-700',
    selectInput:
      'bg-gray-200 mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md',
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !expensesData) {
    return <div className="text-center">Failed to fetch Products</div>;
  }

  return (
    <div>
      {/* header */}
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* filters */}
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 ">
            Filter by Category and Date
          </h3>
          <div className="space-y-4">
            {/* category */}
            <label className={classnames.label}>
              Category{' '}
              <select
                name="category"
                defaultValue={'All'}
                className={classnames.selectInput}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Office">Office</option>
                <option value="Professional">Professional</option>
                <option value="Salaries">Salaries</option>
              </select>
            </label>

            {/* start date */}
            <label className={classnames.label}>
              Start Date{' '}
              <input
                className={classnames.selectInput}
                name="start-date"
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>

            {/* end date */}
            <label className={classnames.label}>
              End Date{' '}
              <input
                className={classnames.selectInput}
                name="end-date"
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>
        </div>

        {/* pie chart */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey={'amount'}
                onMouseEnter={(_, idx) => setActiveIndex(idx)}
              >
                {aggregatedData.map((item, idx) => (
                  <Cell
                    key={item.name}
                    fill={
                      idx === activeIndex ? 'rgba(29, 78, 216)' : item.color
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
