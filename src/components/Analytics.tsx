import React, { useState, useMemo } from 'react';
import { useFetchAllBookingsQuery } from '../features/API';

const AnalyticsReport: React.FC = () => {
  const { data: bookingsData, error, isLoading } = useFetchAllBookingsQuery();
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');

  const userId = localStorage.getItem('userId');

  // Function to get the start of the current week (Sunday)
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay() || 7; // Sunday is 0, Monday is 1, so we adjust to make Sunday 0
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - day); // Move back to the previous Sunday
    return startDate;
  };

  // Weekly Data Calculation (current week, Sunday to Saturday)
  const weeklyData = useMemo(() => {
    const currentDate = new Date();
    const startOfWeek = getStartOfWeek(currentDate); // Get the start of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Get the end of the week (Saturday)

    // Initialize an array for each day of the current week (Sunday to Saturday)
    const weeklyTotals = Array.from({ length: 7 }, () => ({ spent: 0 }));

    if (bookingsData) {
      bookingsData
        .filter((booking) => booking.user_id == userId)
        .forEach((booking) => {
          const bookingDate = new Date(booking.booking_date);
          const dayOfWeek = bookingDate.getDay(); // Sunday is 0, Saturday is 6
          
          // Only include bookings within the current week (Sunday to Saturday)
          if (bookingDate >= startOfWeek && bookingDate <= endOfWeek) {
            const amountSpent = parseFloat(booking.total_amount);
            weeklyTotals[dayOfWeek].spent += amountSpent;
          }
        });
    }

    // Return the data in the format needed for charting (days of the week: Sunday to Saturday)
    return weeklyTotals.map((totals, index) => ({
      label: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index], // Labels for days of the week
      ...totals,
    }));
  }, [bookingsData, userId]);

  const data = viewMode === 'monthly' ? [] : weeklyData;

  // Determine the maximum amount spent for scaling
  const maxSpent = Math.max(...data.map(item => item.spent), 0);
  const scaleFactor = maxSpent > 0 ? 200 / maxSpent : 1; // Adjust 200px max bar height dynamically

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
              <span className="text-sm mt-2">{item.label}</span> {/* Labels: Sun, Mon, Tue, ... */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReport;
