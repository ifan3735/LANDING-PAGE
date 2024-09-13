import React from 'react';

interface Car {
  name: string;
  breakdown: string;
  value: number;
}

interface CarBreakdownProps {
  data: Car[];
  searchQuery: string;
}

const CarBreakdown: React.FC<CarBreakdownProps> = ({ data, searchQuery }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">Number of Breakdown</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b pb-2 text-gray-500">Car Name</th>
            <th className="border-b pb-2 text-gray-500">Breakdown</th>
            <th className="border-b pb-2 text-gray-500">Broken Cars</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((car) =>
              car.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((car, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{car.name}</td>
                <td className='text-gray-500'>{car.breakdown}</td>
                <td>{car.value} Cars</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarBreakdown;
