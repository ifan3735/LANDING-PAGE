import React, { useState, useMemo } from 'react';
import { useFetchAllBookingsQuery } from '../features/API';
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area, 
  Tooltip, Legend, XAxis, YAxis, ResponsiveContainer, Cell 
} from 'recharts';

const AnalyticsReport: React.FC = () => {
  const { data: bookingsData, error, isLoading } = useFetchAllBookingsQuery();
  const userId = localStorage.getItem('userId');
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line' | 'area'>('bar');

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

  const data = monthlyData;

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Analytics Report (Monthly)</h3>
        <div className="flex items-center space-x-4">
          <span className="text-[#4F76C1]">● Spent</span>
          <span className="text-[#4CAF50]">● Got Back</span>
        </div>
        {/* Dropdown for chart selection */}
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as 'bar' | 'pie' | 'line' | 'area')}
          className="border rounded p-1 text-sm"
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="line">Line Chart</option>
          <option value="area">Area Chart</option>
        </select>
      </div>

      {/* Conditional Rendering of Chart Types */}
      {chartType === 'bar' && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="spent" fill="#4F76C1" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {chartType === 'pie' && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="spent"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#4F76C1"
              label={(entry) => entry.label}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`hsl(${index * 30}, 70%, 60%)`} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}

      {chartType === 'line' && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="spent" stroke="#4F76C1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}

      {chartType === 'area' && (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="spent" stroke="#4F76C1" fill="#4F76C1" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AnalyticsReport;
