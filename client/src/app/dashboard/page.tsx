import { CardPopularProduct } from '@/widgets/CardPopularProduct';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProduct />
      <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl"></div>
      <div className="row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl"></div>
      <div className="row-span-3 bg-white shadow-md rounded-2xl"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-white shadow-md rounded-2xl"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-white shadow-md rounded-2xl"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-white shadow-md rounded-2xl"></div>
    </div>
  );
};

export default Dashboard;
