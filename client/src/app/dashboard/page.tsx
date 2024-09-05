import { CardPurchaseSummary } from '@/widgets/ CardPurchaseSummary';
import { CardExpenseSummary } from '@/widgets/CardExpenseSummary';
import { CardPopularProducts } from '@/widgets/CardPopularProducts';
import { CardSalesSummary } from '@/widgets/CardSalesSummary/CardSalesSummary';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <div className="md:row-span-1 xl:row-span-2 bg-white shadow-md rounded-2xl"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-white shadow-md rounded-2xl"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-white shadow-md rounded-2xl"></div>
    </div>
  );
};

export default Dashboard;
