import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IProduct {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}
interface INewProduct {
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

export interface IUser {
  userId: string;
  name: string;
  email: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: ['DashboardMetrics', 'Products', 'Users', 'Expenses'],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<IDashboardMetrics, void>({
      query: () => '/dashboard',
      providesTags: ['DashboardMetrics'],
    }),
    getProducts: build.query<IProduct[], string | void>({
      query: (search) => ({
        url: '/products',
        params: search ? { search } : {},
      }),
      providesTags: ['Products'],
    }),
    createProduct: build.mutation<IProduct, INewProduct>({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Products'],
    }),
    getUsers: build.query<IUser[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    getExpensesByCategory: build.query<IExpenseByCategorySummary[], void>({
      query: () => '/expenses',
      providesTags: ['Expenses'],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = api;
