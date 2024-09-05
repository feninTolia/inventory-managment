import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IProduct {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}
interface ISalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}
interface IPurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}
interface IExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}
interface IExpenseByCategorySummary {
  expenseByCategoryId: string;
  category: string;
  amount: string;
  date: string;
}

interface IDashboardMetrics {
  popularProducts: IProduct[];
  salesSummary: ISalesSummary[];
  purchaseSummary: IPurchaseSummary[];
  expenseSummary: IExpenseSummary[];
  expenseByCategorySummary: IExpenseByCategorySummary[];
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    //   prepareHeaders:()=>{}
  }),
  tagTypes: ['DashboardMetrics'],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<IDashboardMetrics, void>({
      query: () => '/dashboard',
      providesTags: ['DashboardMetrics'],
    }),
  }),
});

export const { useGetDashboardMetricsQuery } = api;
