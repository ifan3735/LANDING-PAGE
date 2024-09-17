import React, { useState } from 'react';

const RouteDetails: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Control dropdown visibility
  const [selectedRoute, setSelectedRoute] = useState('Change Route'); // Store the selected route

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRouteSelect = (route: string) => {
    setSelectedRoute(route); // Update selected route
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      {/* Route Header */}
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-lg">Route</h4>
        <span className="text-gray-400">01:12:15 - 48 min. left</span>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-blue-100 text-blue-600 px-4 py-1 rounded-lg"
          >
            {selectedRoute}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRouteSelect('Route 1')}
                >
                  Route 1
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRouteSelect('Route 2')}
                >
                  Route 2
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRouteSelect('Route 3')}
                >
                  Route 3
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRouteSelect('Route 4')}
                >
                  Route 4
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Map Image */}
      <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <img
          src="https://i.pinimg.com/564x/0a/12/13/0a12131d595ca1ac8625fc43a5a87443.jpg"
          alt="Car Location Map"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Route Pictures */}
      <div className="flex space-x-4">
        <img
          src="https://i.pinimg.com/236x/6d/dc/68/6ddc68933246f8ab5549c4d88e51e4eb.jpg"
          alt="Route 1"
          className="w-20 h-16 object-cover rounded-lg"
        />
        <img
          src="https://i.pinimg.com/236x/e9/7b/b4/e97bb4d26c4644a894e3bd9c138d4520.jpg"
          alt="Route 2"
          className="w-20 h-16 object-cover rounded-lg"
        />
        <img
          src="https://i.pinimg.com/236x/dd/29/89/dd298962be76c5b25de3d9d61aed05d3.jpg"
          alt="Route 3"
          className="w-20 h-16 object-cover rounded-lg"
        />
        <img
          src="https://i.pinimg.com/236x/06/99/e5/0699e5bf037437f64c690d02830b9d83.jpg"
          alt="Route 4"
          className="w-20 h-16 object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default RouteDetails;
