import React, { useState, useMemo } from 'react';
import { useFetchAllBookingsQuery } from '../features/API';

const AnalyticsReport: React.FC = () => {
  const { data: bookingsData, error, isLoading } = useFetchAllBookingsQuery();
  const userId = localStorage.getItem('userId');

  // Monthly Data Calculation
  const monthlyData = useMemo(() => {
    const monthlyTotals = Array.from({ length: 12 }, () => ({ spent: 0 }));

    if (bookingsData) {
      bookingsData
        .filter((booking) => booking.user_id == userId)
        .forEach((booking) => {
          const bookingMonth = new Date(booking.booking_date).getMonth();
          const amountSpent = parseFloat(booking.total_amount);
          monthlyTotals[bookingMonth].spent += amountSpent;
        });
    }
    return monthlyTotals.map((totals, index) => ({
      label: new Date(0, index).toLocaleString('default', { month: 'short' }),
      ...totals,
    }));
  }, [bookingsData, userId]);

  // Choose the data (monthly only, no dropdown)
  const data = monthlyData;

  // Determine the maximum amount spent for scaling
  const maxSpent = Math.max(...data.map(item => item.spent), 0);
  const scaleFactor = maxSpent > 0 ? 200 / maxSpent : 1; // Adjust 200px max bar height dynamically

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Analytics Report (Monthly)</h3> {/* Explicitly indicating Monthly */}
        <div className="text-sm space-x-4 flex items-center">
          <span className="text-[#4F76C1]">● Spent</span>
          <span className="text-[#4CAF50]">● Got Back</span>
        </div>
      </div>

      <div className="relative">
        {/* Scale Labels, dynamically calculated */}
        <div className="absolute left-0 bottom-0 flex flex-col justify-between h-full py-4 text-xs text-gray-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{Math.round((maxSpent * (5 - i) / 5) / 100) * 100}</span>
          ))}
        </div>

        <div className="ml-6 flex justify-between items-end h-60">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {item.spent > 0 && (
                <div
                  className="w-12 rounded-md"
                  style={{
                    height: `${item.spent * scaleFactor}px`, // Adjusts dynamically based on max spent
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
              <span className="text-sm mt-2">{item.label}</span> {/* Labels: Jan, Feb, Mar, ... */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReport;
