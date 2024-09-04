import Card from './Card';
import { FaCar, FaChartLine } from 'react-icons/fa';

const StatsCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Available Cars" value={42} icon={<FaCar />} />
      <Card title="Active Rentals" value={12} icon={<FaChartLine />} />
      <Card title="Revenue" value={`$ ${15000}`} icon={<FaChartLine />} />
      <Card title="Total Listings" value={85} icon={<FaCar />} />
    </div>
  );
};

export default StatsCard;
