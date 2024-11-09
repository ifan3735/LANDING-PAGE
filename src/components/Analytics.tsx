import React, { useState, useMemo } from 'react';
import { useFetchAllBookingsQuery } from '../features/API';

const AnalyticsReport: React.FC = () => {
  const { data: bookingsData, error, isLoading } = useFetchAllBookingsQuery();
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');

  const userId = localStorage.getItem('userId');

  // Filter and aggregate booking data for the logged-in user
  const monthlyData = useMemo(() => {
    const monthlyTotals = Array.from({ length: 12 }, () => ({ spent: 0, gotBack: 0 }));

    if (bookingsData) {
      bookingsData
        .filter((booking) => booking.user_id == userId)
        .forEach((booking) => {
          const bookingMonth = new Date(booking.booking_date).getMonth(); // get month as index (0-11)
          const amountSpent = parseFloat(booking.total_amount); // Convert to number
          monthlyTotals[bookingMonth].spent += amountSpent;
        });
    }
    return monthlyTotals.map((totals, index) => ({
      label: new Date(0, index).toLocaleString('default', { month: 'short' }),
      ...totals,
    }));
  }, [bookingsData, userId]);

  const data = viewMode === 'monthly' ? monthlyData : []; // Placeholder for weeklyData

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Analytics Report</h3>
        <div className="text-sm space-x-4 flex items-center">
          <span className="text-[#4F76C1]">● Spent</span>
          <span className="text-[#4CAF50]">● Got Back</span>
          <select
            className="ml-4 border rounded p-1"
            onChange={(e) => setViewMode(e.target.value as 'monthly' | 'weekly')}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 bottom-0 flex flex-col justify-between h-full py-4 text-xs text-gray-500">
          <span>10000</span><span>8000</span><span>6000</span><span>4000</span><span>2000</span><span>0</span>
        </div>
        <div className="ml-6 flex justify-between items-end h-60">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {item.spent > 0 && (
                <div
                  className="w-12 rounded-md"
                  style={{
                    height: `${item.spent * 0.01}px`, // Adjust scaling as needed
                    background: 'linear-gradient(180deg, #4F76C1 0%, #003366 100%)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                  title={`Spent: ${item.spent}`}
                >
                  <div className="h-full w-full flex items-end justify-center text-white text-xs font-semibold">{item.spent}</div>
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
