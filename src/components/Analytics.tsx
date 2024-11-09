import React, { useState, useMemo } from 'react';
import { useFetchAllBookingsQuery } from '../features/API';

const AnalyticsReport: React.FC = () => {
  const { data: bookingsData, error, isLoading } = useFetchAllBookingsQuery();
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');
  const userId = localStorage.getItem('userId');

  // Calculate Monthly Spending
  const monthlyData = useMemo(() => {
    const monthlyTotals = Array(12).fill({ spent: 0, gotBack: 0 });
    
    if (bookingsData) {
      bookingsData
        .filter((booking) => booking.user_id == userId)
        .forEach((booking) => {
          const bookingMonth = new Date(booking.booking_date).getMonth();
          const amountSpent = parseFloat(booking.total_amount) || 0;
          monthlyTotals[bookingMonth] = {
            spent: monthlyTotals[bookingMonth].spent + amountSpent,
            gotBack: 0,
          };
        });
    }
    console.log("Monthly Data:", monthlyTotals);
    return monthlyTotals.map((totals, index) => ({
      label: new Date(0, index).toLocaleString('default', { month: 'short' }),
      ...totals,
    }));
  }, [bookingsData, userId]);

  // Calculate Weekly Spending
  const weeklyData = useMemo(() => {
    const weeklyTotals = Array(7).fill({ spent: 0, gotBack: 0 });

    if (bookingsData) {
      bookingsData
        .filter((booking) => booking.user_id == userId)
        .forEach((booking) => {
          const bookingDay = new Date(booking.booking_date).getDay();
          const amountSpent = parseFloat(booking.total_amount) || 0;
          weeklyTotals[bookingDay] = {
            spent: weeklyTotals[bookingDay].spent + amountSpent,
            gotBack: 0,
          };
        });
    }
    console.log("Weekly Data:", weeklyTotals);
    return weeklyTotals.map((totals, index) => ({
      label: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index],
      ...totals,
    }));
  }, [bookingsData, userId]);

  // Determine graph scale based on max spending
  const data = viewMode === 'monthly' ? monthlyData : weeklyData;
  const maxSpent = Math.max(...data.map(item => item.spent));
  const scale = maxSpent > 0 ? Math.ceil(maxSpent / 10) * 10 : 50;

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Analytics Report</h3>
        <div className="text-sm space-x-4 flex items-center">
          <span className="text-[#4F76C1]">● Spent</span>
          <span className="text-[#4CAF50]">● Got Back</span>
          <select className="ml-4 border rounded p-1" onChange={(e) => setViewMode(e.target.value as 'monthly' | 'weekly')}>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      {/* Graph Container */}
      <div className="relative">
        <div className="absolute left-0 bottom-0 flex flex-col justify-between h-full py-4 text-xs text-gray-500">
          {[...Array(6)].map((_, i) => (
            <span key={i}>{(scale / 5) * (5 - i)}</span>
          ))}
        </div>
        <div className="ml-6 flex justify-between items-end h-60">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {item.spent > 0 && (
                <div
                  className="w-12 rounded-md"
                  style={{
                    height: `${(item.spent / scale) * 100}%`,
                    background: 'linear-gradient(180deg, #4F76C1 0%, #003366 100%)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                  title={`Spent: ${item.spent}`}
                >
                  <div className="h-full w-full flex items-end justify-center text-white text-xs font-semibold">
                    {item.spent}
                  </div>
                </div>
              )}
              <span className="text-sm mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReport;
